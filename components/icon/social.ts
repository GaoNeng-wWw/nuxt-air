import Discord from './discord.vue';
import Github from './github.vue';
import Twitter from './twitter.vue';

export const socialIconNames = ['github', 'x', 'twitter', 'discord'];
export const socialIcons: Record<string, Component> = {
  github: Github,
  twitter: Twitter,
  X: Twitter,
  discord: Discord,
  Github,
  Twitter,
  x: Twitter,
  Discord,
};
