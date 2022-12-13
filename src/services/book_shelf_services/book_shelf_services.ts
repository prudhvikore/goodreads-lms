import { Request } from "express";
import books_query from "../../queries/books_query/books_query";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import Custom_error from "../../utils/errors/custom_errors";

import status_codes from "../../utils/errors/status_codes";

async function get_book_shelf_service(id: number) {
  return await book_shelf_query.get_book_shelf_query(Number(id));
}

async function return_book_services(req: Request) {
  const loggedInUser = req.headers.user_id;
  const { rental_id } = req.params;
  const validRental = await book_shelf_query.validate_rental(Number(rental_id));
  if (!validRental) {
    const error = new Custom_error(
      "rental id not found",
      status_codes.NOT_FOUND //404
    );
    req.logger.error("returning book failed due to invalid rental id");
    throw error;
  }
  const { book_id, user_id, rental_status } = validRental;
  const { quantity } = await books_query.get_book_quantity_by_id(book_id);
  if (loggedInUser === user_id) {
    if (rental_status === "WITH USER") {
      const updated_rental = await book_shelf_query.update_rental_status(
        Number(rental_id)
      );
      const updated_book_quantity = await books_query.update_book_quantity(
        book_id,
        quantity + 1
      );
      const return_data = { updated_book_quantity, updated_rental };
      return return_data;
    } else if (rental_status === "RETURNED") {
      const error = new Custom_error(
        "Not Acceptable, Book already returned",
        status_codes.NOT_ACCEPTABLE //406
      );
      req.logger.error("returning book failed coz book already returned");
      throw error;
    }
  } else {
    const error = new Custom_error(
      "Book should be returned by the user who rented",
      status_codes.UN_AUTHORIZED //401
    );
    req.logger.error("returning book failed coz book is returned by a different user who has rented it");
    throw error;
  }
}

export default { get_book_shelf_service, return_book_services };
