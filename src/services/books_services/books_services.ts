import { Request, Response } from "express";
import books_query from "../../queries/books_query/books_query";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import { validate_create_book_data } from "../../utils/utils";
import Custom_error from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";

async function get_books_services() {
  return await books_query.get_books_query();
}

async function get_books_by_filters_services(query: string) {
  return await books_query.get_books_query_by_filters(query);
}

async function get_books_by_search_services(query: string) {
  return await books_query.get_books_query_by_search(query);
}

async function create_book_services(req: Request) {
  const data = req.body;
  validate_create_book_data(data);
  if (req.headers.role === "ADMIN") {
    if (Object.keys(req.body).length < 9) {
      const error = new Custom_error(
        "enter all details",
        status_codes.BAD_REQUEST
      );
      throw error;
    } else {
      const new_book = await books_query.create_book(req.body);
      if (!new_book) {
        const error = new Custom_error(
          "failed to create book",
          status_codes.INTERNAL_ERROR
        );
        throw error;
      }
      return new_book;
    }
  } else {
    const error = new Custom_error(
      "Not authorized to create a book",
      status_codes.UN_AUTHORIZED
    );
    throw error;
  }
}

async function update_a_book_service(id: number, role: string, data: object) {
  if (role === "ADMIN") {
    const updated_book = await books_query.update_book(Number(id), data);
    if (!updated_book) {
      const error = new Custom_error(
        "failed to update book",
        status_codes.INTERNAL_ERROR
      );
      throw error;
    }
    return updated_book;
  } else {
    const error = new Custom_error(
      "Not authorized to update book details",
      status_codes.UN_AUTHORIZED
    );
    throw error;
  }
}

async function rent_book_service(req: Request, res: Response) {
  const { book_id } = req.params;
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const { user_id } = req.headers;
  const book_quantity = await books_query.get_book_quantity_by_id(
    Number(book_id)
  );
  if (book_quantity === undefined) {
    const error = new Custom_error("Invalid Book ID", status_codes.NOT_FOUND);
    throw error;
  }
  const { quantity } = book_quantity;
  if (quantity > 0) {
    const new_rental = await book_shelf_query.create_rental(
      Number(book_id),
      Number(user_id),
      date
    );
    if (!new_rental) {
      const error = new Custom_error(
        "failed to rent book",
        status_codes.INTERNAL_ERROR
      );
      throw error;
    }
    const update_book = await books_query.update_book_quantity(
      Number(book_id),
      quantity - 1
    );
    if (!update_book) {
      const error = new Custom_error(
        "failed to update book, Please reach out to admin",
        status_codes.INTERNAL_ERROR
      );
      throw error;
    }
    const data = { new_rental, update_book };
    return data;
  } else {
    const error = new Custom_error(
      "sorry!!, book is out of stock",
      status_codes.OUT_OF_STOCK
    );
    throw error;
    return res.status(307).send({ message: "sorry!!, book is out of stock" });
  }
}

export {
  get_books_services,
  get_books_by_filters_services,
  get_books_by_search_services,
  create_book_services,
  update_a_book_service,
  rent_book_service,
};
