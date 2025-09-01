import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

export const statement = {
  ...defaultStatements,
  comment: ['create', 'read', 'hidden', 'patch'],
} as const;
export const ac = createAccessControl(statement);
export type AC = typeof ac['statements'];
export const user = ac.newRole({
  comment: ['create', 'read'],
});
export const admin = ac.newRole({
  ...adminAc.statements,
  comment: ['create', 'read', 'hidden', 'patch'],
});
