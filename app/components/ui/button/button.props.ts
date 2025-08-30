export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps {
  variant?: ButtonVariant;
  icon?: boolean;
  as?: string;
  class?: string;
  full?: boolean;
}
