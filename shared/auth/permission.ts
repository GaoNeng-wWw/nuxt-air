import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

export const statement = {
  ...defaultStatements,
  post: ['create', 'read', 'hidden', 'update', 'read::daft'],
  comment: ['create', 'read', 'hidden'],
  tag: ['create', 'read'],
} as const;
export const ac = createAccessControl(statement);
export const user = ac.newRole({
  post: ['read'],
  comment: ['create', 'read'],
  tag: ['read'],
  user: [],
});
export const admin = ac.newRole({
  ...adminAc.statements,
  post: ['create', 'read', 'hidden', 'update', 'read::daft'],
  comment: ['create', 'read', 'hidden'],
  tag: ['create', 'read'],
});
