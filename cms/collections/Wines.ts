import type { CollectionConfig } from "payload";
import { hidden, l, lines, pairs } from "../fields";
import { refreshSite } from "../revalidate";

export const Wines: CollectionConfig = {
  slug: "wines",
  labels: { singular: l("Wine", "Vin"), plural: l("Wines", "Vinuri") },
  defaultSort: "order",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "vintage", "pageLive", "order"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => refreshSite()],
    afterDelete: [() => refreshSite()],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: l("Wine", "Vin"),
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, label: l("Name", "Denumire"), admin: { width: "40%" } },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  index: true,
                  label: l("Link name (used in the QR code)", "Nume link (folosit în codul QR)"),
                  admin: { width: "35%" },
                },
                { name: "vintage", type: "text", required: true, label: l("Vintage", "Anul recoltei"), admin: { width: "25%" } },
              ],
            },
            { name: "grapes", type: "text", required: true, label: l("Grape varieties", "Soiuri de struguri") },
            {
              type: "row",
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true, label: l("Bottle photo (transparent PNG)", "Fotografia sticlei (PNG transparent)"), admin: { width: "50%" } },
                { name: "tint", type: "text", defaultValue: "#2a1719", label: l("Background colour", "Culoarea fundalului"), admin: { width: "25%" } },
                { name: "order", type: "number", defaultValue: 1, label: l("Order", "Ordine"), admin: { width: "25%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "organic", type: "checkbox", label: l("Organic (green leaf)", "Ecologic (frunza verde)") },
                { name: "biodynamic", type: "checkbox", label: l("Biodynamic (BIODYVIN logo)", "Biodinamic (logo BIODYVIN)") },
                { name: "limited", type: "checkbox", label: l("First bottling · Limited edition", "Prima îmbuteliere · Colecție limitată") },
                { name: "pageLive", type: "checkbox", label: l("Dedicated wine page is live", "Pagina dedicată este publicată") },
              ],
            },
            {
              name: "formats",
              type: "array",
              required: true,
              minRows: 1,
              label: l("Bottle formats", "Formate de sticlă"),
              labels: { singular: l("Format", "Format"), plural: l("Formats", "Formate") },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "litres", type: "number", required: true, label: l("Litres", "Litri") },
                    { name: "alcohol", type: "number", required: true, label: l("Alcohol % vol.", "Alcool % vol.") },
                    { name: "bottles", type: "number", required: true, label: l("Bottles produced", "Sticle produse") },
                    { name: "lot", type: "text", required: true, label: l("Lot", "Lot") },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: l("Main page banner", "Banner pagina principală"),
          fields: [
            { name: "summary", type: "textarea", localized: true, label: l("Text", "Text") },
            lines("notes", l("Vinification points", "Puncte vinificație")),
          ],
        },
        {
          label: l("Wine page", "Pagina vinului"),
          fields: [
            { name: "pageSummary", type: "textarea", localized: true, label: l("Intro text", "Text introductiv") },
            { name: "vintageNote", type: "textarea", localized: true, label: l("Vintage note", "Despre recoltă") },
            {
              type: "collapsible",
              label: l("Character", "Caracter"),
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "style", type: "text", localized: true, admin: { hidden: true } },
                    { name: "segment", type: "text", localized: true, label: l("Collection", "Colecție") },
                  ],
                },
                lines("profile", l("Profile words", "Profil")),
                {
                  type: "row",
                  fields: [
                    { name: "bodyLabel", type: "text", localized: true, label: l("Body", "Corpolență") },
                    {
                      name: "body",
                      type: "select",
                      label: l("Body level", "Nivel corpolență"),
                      options: [
                        { label: l("Light", "Ușor"), value: "1" },
                        { label: l("Medium", "Mediu"), value: "2" },
                        { label: l("Full", "Corpulent"), value: "3" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "collapsible",
              label: l("Ageing potential and dates", "Potențial de maturare și date"),
              admin: { description: l("Leave the years empty to hide the drinking window on the page.", "Lăsați anii goi pentru a ascunde perioada de consum de pe pagină.") },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "ageingFrom", type: "number", label: l("Drinking window from (year)", "Perioada optimă de consum de la (an)") },
                    { name: "ageingTo", type: "number", label: l("Drinking window to (year)", "Perioada optimă de consum până la (an)") },
                    { name: "bottled", type: "date", label: l("Bottling date", "Data îmbutelierii"), admin: { date: { pickerAppearance: "dayOnly" } } },
                  ],
                },
              ],
            },
            pairs("vinification", l("Vinification", "Vinificație")),
            pairs("terroir", l("Terroir", "Terroir")),
            hidden(pairs("characteristics", l("Characteristics", "Caracteristici"))),
            hidden(pairs("certification", l("Certification", "Certificare"))),
            pairs("serving", l("Serving", "Servire")),
            lines("pairing", l("Food pairing", "Asociere culinară")),
            {
              type: "collapsible",
              label: l("Ingredients & nutrition", "Ingrediente și valori nutriționale"),
              fields: [
                { name: "ingredients", type: "text", localized: true, label: l("Ingredients", "Ingrediente") },
                {
                  type: "row",
                  fields: [
                    { name: "so2Label", type: "text", localized: true, label: l("Sulphur dioxide label", "Etichetă dioxid de sulf") },
                    { name: "so2Value", type: "text", localized: true, label: l("Sulphur dioxide value", "Valoare dioxid de sulf") },
                  ],
                },
                pairs("nutrition", l("Nutritional values per 100 ml", "Valori nutriționale per 100 ml")),
              ],
            },
            pairs("analytics", l("Laboratory parameters", "Parametri de laborator")),
            hidden(lines("producer", l("Producer address", "Adresa producătorului"))),
            hidden(pairs("bottling", l("Bottling", "Îmbuteliere"))),
          ],
        },
      ],
    },
  ],
};
