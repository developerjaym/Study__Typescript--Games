import { MenuTag } from "./MenuTag.js";

export interface MenuOption {
  name: string;
  description: string;
  route: string;
  image?: string;
  tags: MenuTag[];
  visible: boolean;
}
