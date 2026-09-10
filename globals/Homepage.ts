import type { GlobalConfig } from "payload";
import {
  AboutBlock,
  ContactBlock,
  GalleryBlock,
  ServicesBlock,
} from "@/blocks/sections";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sections",
      type: "blocks",
      label: "Secções (a ordem aqui define a página e o menu)",
      labels: {
        singular: "Secção",
        plural: "Secções",
      },
      blocks: [AboutBlock, ServicesBlock, GalleryBlock, ContactBlock],
      required: true,
      minRows: 1,
      admin: {
        description:
          "Arraste para reordenar. O menu do header segue esta ordem. «Sobre» aponta para a página /sobre (editável em Página Sobre).",
      },
    },
  ],
};
