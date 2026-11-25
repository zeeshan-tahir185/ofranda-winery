import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ro', 'en', 'fr', 'de', 'ru');
  CREATE TYPE "public"."enum_wines_body" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('winery', 'certification', 'events', 'press');
  CREATE TABLE "wines_formats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"litres" numeric NOT NULL,
  	"alcohol" numeric NOT NULL,
  	"bottles" numeric NOT NULL,
  	"lot" varchar NOT NULL
  );
  
  CREATE TABLE "wines_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "wines_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "wines_vinification" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_terroir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_characteristics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_certification" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_serving" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_pairing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "wines_nutrition" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_analytics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines_producer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "wines_bottling" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "wines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"vintage" varchar NOT NULL,
  	"grapes" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"tint" varchar DEFAULT '#2a1719',
  	"order" numeric DEFAULT 1,
  	"organic" boolean,
  	"limited" boolean,
  	"page_live" boolean,
  	"body" "enum_wines_body",
  	"ageing_from" numeric,
  	"ageing_to" numeric,
  	"bottled" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "wines_locales" (
  	"summary" varchar,
  	"page_summary" varchar,
  	"vintage_note" varchar,
  	"style" varchar,
  	"segment" varchar,
  	"body_label" varchar,
  	"ingredients" varchar,
  	"so2_label" varchar,
  	"so2_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_posts_category" DEFAULT 'winery' NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wines_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "wines_formats" ADD CONSTRAINT "wines_formats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_notes" ADD CONSTRAINT "wines_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_profile" ADD CONSTRAINT "wines_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_vinification" ADD CONSTRAINT "wines_vinification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_terroir" ADD CONSTRAINT "wines_terroir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_characteristics" ADD CONSTRAINT "wines_characteristics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_certification" ADD CONSTRAINT "wines_certification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_serving" ADD CONSTRAINT "wines_serving_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_pairing" ADD CONSTRAINT "wines_pairing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_nutrition" ADD CONSTRAINT "wines_nutrition_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_analytics" ADD CONSTRAINT "wines_analytics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_producer" ADD CONSTRAINT "wines_producer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines_bottling" ADD CONSTRAINT "wines_bottling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wines" ADD CONSTRAINT "wines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wines_locales" ADD CONSTRAINT "wines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_body" ADD CONSTRAINT "posts_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wines_fk" FOREIGN KEY ("wines_id") REFERENCES "public"."wines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "wines_formats_order_idx" ON "wines_formats" USING btree ("_order");
  CREATE INDEX "wines_formats_parent_id_idx" ON "wines_formats" USING btree ("_parent_id");
  CREATE INDEX "wines_notes_order_idx" ON "wines_notes" USING btree ("_order");
  CREATE INDEX "wines_notes_parent_id_idx" ON "wines_notes" USING btree ("_parent_id");
  CREATE INDEX "wines_notes_locale_idx" ON "wines_notes" USING btree ("_locale");
  CREATE INDEX "wines_profile_order_idx" ON "wines_profile" USING btree ("_order");
  CREATE INDEX "wines_profile_parent_id_idx" ON "wines_profile" USING btree ("_parent_id");
  CREATE INDEX "wines_profile_locale_idx" ON "wines_profile" USING btree ("_locale");
  CREATE INDEX "wines_vinification_order_idx" ON "wines_vinification" USING btree ("_order");
  CREATE INDEX "wines_vinification_parent_id_idx" ON "wines_vinification" USING btree ("_parent_id");
  CREATE INDEX "wines_vinification_locale_idx" ON "wines_vinification" USING btree ("_locale");
  CREATE INDEX "wines_terroir_order_idx" ON "wines_terroir" USING btree ("_order");
  CREATE INDEX "wines_terroir_parent_id_idx" ON "wines_terroir" USING btree ("_parent_id");
  CREATE INDEX "wines_terroir_locale_idx" ON "wines_terroir" USING btree ("_locale");
  CREATE INDEX "wines_characteristics_order_idx" ON "wines_characteristics" USING btree ("_order");
  CREATE INDEX "wines_characteristics_parent_id_idx" ON "wines_characteristics" USING btree ("_parent_id");
  CREATE INDEX "wines_characteristics_locale_idx" ON "wines_characteristics" USING btree ("_locale");
  CREATE INDEX "wines_certification_order_idx" ON "wines_certification" USING btree ("_order");
  CREATE INDEX "wines_certification_parent_id_idx" ON "wines_certification" USING btree ("_parent_id");
  CREATE INDEX "wines_certification_locale_idx" ON "wines_certification" USING btree ("_locale");
  CREATE INDEX "wines_serving_order_idx" ON "wines_serving" USING btree ("_order");
  CREATE INDEX "wines_serving_parent_id_idx" ON "wines_serving" USING btree ("_parent_id");
  CREATE INDEX "wines_serving_locale_idx" ON "wines_serving" USING btree ("_locale");
  CREATE INDEX "wines_pairing_order_idx" ON "wines_pairing" USING btree ("_order");
  CREATE INDEX "wines_pairing_parent_id_idx" ON "wines_pairing" USING btree ("_parent_id");
  CREATE INDEX "wines_pairing_locale_idx" ON "wines_pairing" USING btree ("_locale");
  CREATE INDEX "wines_nutrition_order_idx" ON "wines_nutrition" USING btree ("_order");
  CREATE INDEX "wines_nutrition_parent_id_idx" ON "wines_nutrition" USING btree ("_parent_id");
  CREATE INDEX "wines_nutrition_locale_idx" ON "wines_nutrition" USING btree ("_locale");
  CREATE INDEX "wines_analytics_order_idx" ON "wines_analytics" USING btree ("_order");
  CREATE INDEX "wines_analytics_parent_id_idx" ON "wines_analytics" USING btree ("_parent_id");
  CREATE INDEX "wines_analytics_locale_idx" ON "wines_analytics" USING btree ("_locale");
  CREATE INDEX "wines_producer_order_idx" ON "wines_producer" USING btree ("_order");
  CREATE INDEX "wines_producer_parent_id_idx" ON "wines_producer" USING btree ("_parent_id");
  CREATE INDEX "wines_producer_locale_idx" ON "wines_producer" USING btree ("_locale");
  CREATE INDEX "wines_bottling_order_idx" ON "wines_bottling" USING btree ("_order");
  CREATE INDEX "wines_bottling_parent_id_idx" ON "wines_bottling" USING btree ("_parent_id");
  CREATE INDEX "wines_bottling_locale_idx" ON "wines_bottling" USING btree ("_locale");
  CREATE UNIQUE INDEX "wines_slug_idx" ON "wines" USING btree ("slug");
  CREATE INDEX "wines_image_idx" ON "wines" USING btree ("image_id");
  CREATE INDEX "wines_updated_at_idx" ON "wines" USING btree ("updated_at");
  CREATE INDEX "wines_created_at_idx" ON "wines" USING btree ("created_at");
  CREATE UNIQUE INDEX "wines_locales_locale_parent_id_unique" ON "wines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "wines_locales_parent_id_idx" ON "wines_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_body_order_idx" ON "posts_body" USING btree ("_order");
  CREATE INDEX "posts_body_parent_id_idx" ON "posts_body" USING btree ("_parent_id");
  CREATE INDEX "posts_body_locale_idx" ON "posts_body" USING btree ("_locale");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_wines_id_idx" ON "payload_locked_documents_rels" USING btree ("wines_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "wines_formats" CASCADE;
  DROP TABLE "wines_notes" CASCADE;
  DROP TABLE "wines_profile" CASCADE;
  DROP TABLE "wines_vinification" CASCADE;
  DROP TABLE "wines_terroir" CASCADE;
  DROP TABLE "wines_characteristics" CASCADE;
  DROP TABLE "wines_certification" CASCADE;
  DROP TABLE "wines_serving" CASCADE;
  DROP TABLE "wines_pairing" CASCADE;
  DROP TABLE "wines_nutrition" CASCADE;
  DROP TABLE "wines_analytics" CASCADE;
  DROP TABLE "wines_producer" CASCADE;
  DROP TABLE "wines_bottling" CASCADE;
  DROP TABLE "wines" CASCADE;
  DROP TABLE "wines_locales" CASCADE;
  DROP TABLE "posts_body" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_wines_body";
  DROP TYPE "public"."enum_posts_category";`)
}
