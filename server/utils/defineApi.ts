import type { EventHandlerRequest, EventHandler, H3Event } from 'h3';
import { H3Error } from 'h3';
import status from 'http-status';
import {defaultFilter} from './default-filter';

type PromiseLike<T> = T | Promise<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Resp<T = Record<string, any>> = {
  statusCode: number;
  body: T;
  status(code: number): Omit<Resp<T>, 'statusCode' | 'body'>;
  json(obj: T): Omit<Resp<T>, 'statusCode' | 'body'>;
};

export type Middleware = <T extends EventHandlerRequest>(event: H3Event<T>) => void;
export type Guard = <T extends EventHandlerRequest, R>(event: H3Event<T>) => PromiseLike<boolean> | PromiseLike<R>;
export type Filter = <T extends EventHandlerRequest>(event: H3Event<T>, error: Error, resp: Resp) => void;

export type DefineApiOptions = {
  middlewares?: Middleware[];
  guards?: Guard[];
  filters?: Filter[];
};

export const awaited = async <T>(p: T): Promise<T> => p instanceof Promise ? await p : p;

const createResp = (): Resp => {
  return {
    statusCode: 200,
    body: {},
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json(obj: Record<string, any>) {
      this.body = obj;
      return this;
    },
  };
};

export class HttpException extends H3Error {
  constructor(message: string, statusCode: number) {
    super(message, {cause: {statusCode, message}});
    this.statusCode = statusCode;
  }
}

export const defineApi = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  opts: DefineApiOptions = {},
): EventHandler<T, Promise<D>> => {
  return defineEventHandler<T>(async (event) => {
    const { middlewares = [], guards = [], filters = [defaultFilter] } = opts;
    const respHandle = createResp();
    try {
      middlewares.forEach(f => f(event));
      for (const guard of guards) {
        const guardRes = guard(event);
        if (!(guardRes instanceof Promise ? await guardRes : guardRes)) {
          throw createError({
            status: status.UNAUTHORIZED,
            message: status['401'],
          });
        }
      }
      const resp = await handler(event);
      return resp;
    } catch (e) {
      const err = e as H3Error | Error;
      for (const filter of filters) {
        filter(event, err, respHandle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (status as any)[respHandle.statusCode] ?? status['500'];
      setResponseStatus(event, respHandle.statusCode, message);
      return { ...err.cause as object };
    }
  });
};
