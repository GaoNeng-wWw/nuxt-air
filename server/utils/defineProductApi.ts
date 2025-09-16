import type { EventHandler, EventHandlerRequest } from 'h3';
import { auth } from '#imports';
import status from 'http-status';

export interface Permissions {
  readonly comment?: ('create' | 'read' | 'hidden' | 'patch')[] | undefined;
  readonly user?: ('create' | 'list' | 'set-role' | 'ban' | 'impersonate' | 'delete' | 'set-password' | 'update')[] | undefined;
  readonly session?: ('list' | 'delete' | 'revoke')[] | undefined;
}

export function defineProductApi<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  permissions?: Permissions,
  needSession: boolean = true,
): EventHandler<T, D> {
  try {
    return defineEventHandler<T>(async (_ctx) => {
      if (!needSession) {
        return handler(_ctx);
      }
      const session = auth.api.getSession({
        headers: _ctx.headers,
      });
      return session
        .then((session) => {
          if (!session || !session.user) {
            throw createError({
              statusCode: status.UNAUTHORIZED,
              message: '未登录',
            });
          }
          if (permissions) {
            return auth.api.userHasPermission({
              body: {
                permissions,
                userId: session.user.id,
              },
            })
              .then(({ success }) => {
                if (!success) {
                  return createError({
                    statusCode: status.FORBIDDEN,
                    message: '权限不足',
                  });
                }
                return handler(_ctx);
              });
          }
          return handler(_ctx);
        })
        .catch(() => {
          throw createError({
            statusCode: status.UNAUTHORIZED,
            message: '未登录',
          });
        });
    });
  } catch (e) {
    throw createError({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: '服务器错误',
    });
  }
}
