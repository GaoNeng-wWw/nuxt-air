export {};

declare global {
  interface PublicSiteInfo {
    ownerName: string;
    ownerAvatar: string;
    ownerBio?: string;
    social: {
      url: string;
      icon: string;
    }[];
  }
}
