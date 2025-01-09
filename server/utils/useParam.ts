import type { H3Event, EventHandlerRequest } from 'h3';
import status from 'http-status';
import type { ZodType } from 'zod';

export const useParam = async <T>(
  event: H3Event<EventHandlerRequest>,
  schema: ZodType<T>,
) => {
  const { data, error } = await getValidatedRouterParams(event, schema.safeParseAsync);
  if (error) {
    throw createError({
      status: status.BAD_REQUEST,
      message: error.issues[0].message,
    });
  }
  return data;
};
