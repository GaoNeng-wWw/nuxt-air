import type { EventHandler, EventHandlerRequest } from 'h3';
import status from 'http-status';
import { auth } from '~~/shared/auth';

export interface Permissions {
  readonly comment?: ('create' | 'read' | 'hidden')[] | undefined;
  readonly user?: ('create' | 'list' | 'set-role' | 'ban' | 'impersonate' | 'delete' | 'set-password' | 'update')[] | undefined;
  readonly session?: ('list' | 'delete' | 'revoke')[] | undefined;
}

export function defineProductApi<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  permissions?: Permissions,
): EventHandler<T, D> {
  return defineEventHandler<T>(async (_ctx) => {
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
          auth.api.userHasPermission({
            body: {
              permissions,
            },
          })
            .then(({ success }) => {
              if (!success) {
                throw createError({
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
}
