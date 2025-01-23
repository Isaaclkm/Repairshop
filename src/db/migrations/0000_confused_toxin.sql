CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_ID" integer NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"tech" varchar DEFAULT 'unassigned' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_customer_ID_customers_id_fk" FOREIGN KEY ("customer_ID") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;