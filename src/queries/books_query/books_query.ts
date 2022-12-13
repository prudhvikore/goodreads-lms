
import knex from "../../config/connection"

async function get_books_query() {
  const books_data = await knex.select("*").from("books");
  return books_data;
}

async function get_book_quantity_by_id(id: number) {
  const book_data = await knex
    .select("quantity")
    .from("books")
    .where("book_id", id);
  return book_data[0];
}

async function get_books_query_by_filters(query:any) {
  const title = query.title || "";
  const category = query.category || "";
  const author = query.author || "";
  const rating = Number(query.rating) || 0;
  const books_data = await knex("books")
    .whereILike("title", `%${title}%`)
    .andWhereILike("category", `%${category}%`)
    .andWhereILike("author", `%${author}%`)
    .andWhere("ratings", ">=", rating);

  return books_data;
}

async function get_books_query_by_search(query: string) {
  const books_data = await knex("books")
    .whereILike("title", `%${query}%`)
    .orWhereILike("category", `%${query}%`)
    .orWhereILike("author", `%${query}%`);
  return books_data;
}

async function create_book(data: object) {
  const new_book = await knex
    .insert({ ...data })
    .into("books")
    .returning("*");
  return new_book;
}

async function update_book(id: number, data: object) {
  const updated_book = await knex
    .where("book_id", id)
    .update({ ...data })
    .from("books")
    .returning("*");
  return updated_book;
}

async function update_book_quantity(id: number, quantity: number) {
  const updated_quantity = await knex
    .update({ quantity })
    .where("book_id", id)
    .from("books")
    .returning("*");
  return updated_quantity;
}

export default {
  get_books_query,
  get_books_query_by_search,
  get_books_query_by_filters,
  create_book,
  update_book,
  get_book_quantity_by_id,
  update_book_quantity,
};
