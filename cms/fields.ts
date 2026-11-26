import type { Field } from "payload";

export const l = (en: string, ro: string) => ({ en, ro });

export const pairs = (name: string, label: { en: string; ro: string }): Field => ({
  name,
  type: "array",
  label,
  localized: true,
  labels: { singular: l("Row", "Rând"), plural: l("Rows", "Rânduri") },
  admin: { initCollapsed: false },
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true, label: l("Label", "Etichetă"), admin: { width: "45%" } },
        { name: "value", type: "text", label: l("Value", "Valoare"), admin: { width: "55%" } },
      ],
    },
  ],
});

export const lines = (name: string, label: { en: string; ro: string }): Field => ({
  name,
  type: "array",
  label,
  localized: true,
  labels: { singular: l("Line", "Linie"), plural: l("Lines", "Linii") },
  fields: [{ name: "text", type: "text", required: true, label: l("Text", "Text") }],
});

export const hidden = (field: Field): Field => ({ ...field, admin: { ...("admin" in field ? field.admin : {}), hidden: true } }) as Field;
