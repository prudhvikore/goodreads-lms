import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('books', (table) => {
        table.integer('book_id').primary().unique().notNullable();
        table.string('title').notNullable().unique();
        table.string('author').notNullable();
        table.text('description').notNullable();
        table.integer("published_year").notNullable();
        table.string("category").notNullable();
        table.integer("ratings").notNullable();
        table.integer("quantity").notNullable();
        table.string("book_cover").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('books');
}

