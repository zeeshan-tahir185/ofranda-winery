import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { ro } from "@payloadcms/translations/languages/ro";
import { fr } from "@payloadcms/translations/languages/fr";
import { de } from "@payloadcms/translations/languages/de";
import { ru } from "@payloadcms/translations/languages/ru";
import sharp from "sharp";
import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Wines } from "./cms/collections/Wines";
import { Posts } from "./cms/collections/Posts";
import { migrations } from "./cms/migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — Crama Ofranda" },
    importMap: { baseDir: dirname },
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, ro, fr, de, ru },
  },
  localization: {
    locales: [
      { code: "ro", label: "Română" },
      { code: "en", label: "English" },
      { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" },
      { code: "ru", label: "Русский" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  collections: [Wines, Posts, Media, Users],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    migrationDir: path.resolve(dirname, "cms/migrations"),
    prodMigrations: migrations,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
  typescript: { autoGenerate: false },
});
