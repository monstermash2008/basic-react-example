CREATE TABLE "generations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"sprites" json NOT NULL,
	"species_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon_abilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"pokemon_id" integer NOT NULL,
	"ability_name" text NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon_generations" (
	"pokemon_id" integer NOT NULL,
	"generation_id" integer NOT NULL,
	CONSTRAINT "pokemon_generations_pokemon_id_generation_id_pk" PRIMARY KEY("pokemon_id","generation_id")
);
--> statement-breakpoint
CREATE TABLE "pokemon_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"pokemon_id" integer NOT NULL,
	"stat_name" text NOT NULL,
	"base_stat" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"pokemon_id" integer NOT NULL,
	"type_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pokemon_abilities" ADD CONSTRAINT "pokemon_abilities_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_generations" ADD CONSTRAINT "pokemon_generations_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_generations" ADD CONSTRAINT "pokemon_generations_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_stats" ADD CONSTRAINT "pokemon_stats_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_pokemon_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;