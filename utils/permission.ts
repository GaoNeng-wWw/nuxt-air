export enum Permission {
  ADD_POST,
  DEL_POST,
  UPDATE_POST,
  ADD_REPLY,
  DEL_REPLY,
  UPDATE_REPLY,
}

export const hasPermission = (permission: number, targetPermission: Permission[]) => targetPermission.every(p => (p & permission) > 0);
