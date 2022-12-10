import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.integer("id").primary().notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string("role").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

