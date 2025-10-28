import { JSX } from "react";

export interface Navlink {
  name: string;
  href: string;
}

export interface SocialFooterProps {
  name?: string;
  href: string;
  icon: JSX.Element;
}

export interface MidtransProps {
  name?: string;
  quantity: number;
  price: number;
}
