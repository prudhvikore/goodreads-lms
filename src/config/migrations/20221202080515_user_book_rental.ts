import templateBuilder from "@babel/template";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_book_rentals", (table) => {
    table.increments("rental_id").primary();
    table.integer("book_id").references("book_id").inTable("books").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.dateTime("rented_on").notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime("rental_expiry").notNullable();
    table.string("rental_status").defaultTo("WITH USER")
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_book_rentals");
}
