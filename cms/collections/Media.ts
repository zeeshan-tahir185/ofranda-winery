import type { CollectionConfig } from "payload";
import { l } from "../fields";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: l("Image", "Imagine"), plural: l("Images", "Imagini") },
  access: { read: () => true },
  upload: {
    staticDir: "uploads",
    mimeTypes: ["image/*"],
  },
  fields: [{ name: "alt", type: "text", localized: true, label: l("Description", "Descriere") }],
};
