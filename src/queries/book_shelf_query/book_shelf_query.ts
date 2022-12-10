const knex = require("../../config/connection");

async function get_book_shelf_query(id: number) {
  const book_shelf_data = await knex
    .select("*")
    .from("user_book_rentals")
    .where("user_id", id)
    .andWhere("rental_status", "WITH USER");

  return book_shelf_data;
}

async function create_rental(
  book_id: number,
  user_id: number,
  rental_expiry: Date
) {
  const new_rental = await knex
    .insert({ book_id, user_id, rental_expiry })
    .into("user_book_rentals")
    .returning("*");
  return new_rental;
}

async function validate_rental(rental_id: number) {
  const book_shelf_data = await knex
    .select("*")
    .from("user_book_rentals")
    .where("rental_id", rental_id);
  return book_shelf_data[0];
}

async function update_rental_status(rental_id: number) {
    const updated_rental = await knex
      .where("rental_id", rental_id)
      .update({ rental_status: "RETURNED" })
      .from("user_book_rentals")
      .returning("*");
    return updated_rental;
}

export default {
  get_book_shelf_query,
  create_rental,
  update_rental_status,
  validate_rental,
};
