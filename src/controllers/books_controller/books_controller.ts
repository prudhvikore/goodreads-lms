import { NextFunction, Request, Response } from "express";
import books_query from "../../queries/books_query/books_query";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import * as books_services from "../../services/books_services/books_services";
import { validate_create_book_data } from "../../utils/utils";
import Custom_errors from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";
import { nextTick } from "process";

async function get_books(req: Request, res: Response, next: NextFunction) {
  try {
    const books_data = await books_services.get_books_services();
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    const error = new Custom_errors(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );
    next(error);
  }
}

async function get_books_by_filters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books_data = await books_services.get_books_by_filters_services(
      String(req.query)
    );
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    const error = new Custom_errors(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );
    next(error);
  }
}

async function get_books_by_search(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { q } = req.query;
  try {
    const books_data = await books_services.get_books_by_search_services(
      String(q)
    );
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    const error = new Custom_errors(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );
    next(error);
  }
}

async function create_new_book(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validate_create_book_data(req.body);
    const new_book = await books_services.create_book_services(req);
    res.status(200).send({ message: "success", data: new_book });
  } catch (err) {
    next(err);
  }
}

async function update_a_book(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const role = req.headers.role;
  try {
    const updated_book = await books_services.update_a_book_service(
      Number(id),
      String(role),
      data
    );
    res.status(200).send({ message: "success", data: updated_book });
  } catch (err) {
    next(err);
  }
}

async function rent_book(req: Request, res: Response, next: NextFunction) {
  try {
    const rented_data = await books_services.rent_book_service(req, res);
    res.status(200).send({ message: "success", rented_data });
  } catch (err) {
    next(err);
  }
}

export {
  get_books,
  get_books_by_filters,
  create_new_book,
  update_a_book,
  rent_book,
  get_books_by_search,
};
