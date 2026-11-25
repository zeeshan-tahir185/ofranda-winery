import type { CollectionConfig } from "payload";
import { l, lines } from "../fields";
import { refreshSite } from "../revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: l("News article", "Articol"), plural: l("News & events", "Noutăți și evenimente") },
  defaultSort: "-date",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => refreshSite()],
    afterDelete: [() => refreshSite()],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: l("Title", "Titlu") },
    {
      type: "row",
      fields: [
        { name: "slug", type: "text", required: true, unique: true, index: true, label: l("Link name", "Nume link") },
        {
          name: "category",
          type: "select",
          required: true,
          defaultValue: "winery",
          label: l("Category", "Categorie"),
          options: [
            { label: l("Winery", "Crama"), value: "winery" },
            { label: l("Certification", "Certificare"), value: "certification" },
            { label: l("Events", "Evenimente"), value: "events" },
            { label: l("Press", "Presă"), value: "press" },
          ],
        },
        { name: "date", type: "date", required: true, label: l("Date", "Data"), admin: { date: { pickerAppearance: "dayOnly" } } },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: l("Photo", "Fotografie") },
    { name: "text", type: "textarea", required: true, localized: true, label: l("Short text", "Text scurt") },
    lines("body", l("Paragraphs", "Paragrafe")),
  ],
};
