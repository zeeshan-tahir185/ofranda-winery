import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "wines_recycling" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"material" varchar NOT NULL
  );
  
  ALTER TABLE "wines" ADD COLUMN "label_live" boolean;
  ALTER TABLE "wines" ADD COLUMN "ean" varchar;
  ALTER TABLE "wines_locales" ADD COLUMN "label_ingredients" varchar;
  ALTER TABLE "wines_locales" ADD COLUMN "label_allergens" varchar;
  ALTER TABLE "wines_locales" ADD COLUMN "label_extra" varchar;
  ALTER TABLE "wines_recycling" ADD CONSTRAINT "wines_recycling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "wines_recycling_order_idx" ON "wines_recycling" USING btree ("_order");
  CREATE INDEX "wines_recycling_parent_id_idx" ON "wines_recycling" USING btree ("_parent_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "wines_recycling" CASCADE;
  ALTER TABLE "wines" DROP COLUMN "label_live";
  ALTER TABLE "wines" DROP COLUMN "ean";
  ALTER TABLE "wines_locales" DROP COLUMN "label_ingredients";
  ALTER TABLE "wines_locales" DROP COLUMN "label_allergens";
  ALTER TABLE "wines_locales" DROP COLUMN "label_extra";`);
}
