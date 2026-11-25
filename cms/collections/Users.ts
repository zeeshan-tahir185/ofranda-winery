import type { CollectionConfig } from "payload";
import { l } from "../fields";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: l("User", "Utilizator"), plural: l("Users", "Utilizatori") },
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [{ name: "name", type: "text", label: l("Name", "Nume") }],
};
