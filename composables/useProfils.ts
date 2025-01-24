export type Profile = {
  id: number;
  name: string;
  owner: boolean;
  avatar: string | null;
}
export const useProfile = () => useState<Profile|null>('PROFILE', ()=>null);