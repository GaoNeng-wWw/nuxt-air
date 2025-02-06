export {};

declare global {
  type PublicSiteInfo = {
    ownerName: string;
    ownerAvatar: string;
    ownerBio?: string;
    social: {
      url: string;
      icon: string;
    }[]
  }
}