import type { EventHandlerRequest, H3Event } from 'h3';
import type { ZodType } from 'zod';
import { createError, readValidatedBody } from '#imports';
import status from 'http-status';

export async function useBody<T>(event: H3Event<EventHandlerRequest>, schema: ZodType<T>) {
  const { data, error } = await readValidatedBody(event, schema.safeParseAsync);
  if (error) {
    throw createError({
      status: status.BAD_REQUEST,
      message: error.issues[0].message,
    });
  }
  return data;
}
