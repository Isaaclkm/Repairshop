ALTER TABLE "tickets" DROP CONSTRAINT "tickets_customer_ID_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "customer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "customer_ID";