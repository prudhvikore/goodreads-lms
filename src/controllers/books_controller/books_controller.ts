import { NextFunction, Request, Response } from "express";

import * as books_services from "../../services/books_services/books_services";

import Custom_error from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";
import { validate_books_filters } from "../../utils/validations/validations";

async function get_books(req: Request, res: Response, next: NextFunction) {
  try {
    req.logger.info("getting books");
    const books_data = await books_services.get_books_services();
    req.logger.info("getting books successful");
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    const error = new Custom_error(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );
    req.logger.info("getting books failed coz soething went wrong");
    next(error);
  }
}

async function get_books_by_filters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.logger.info("getting books based on filters");
    const result = await validate_books_filters().validate({ ...req.query });
    if (result.error) {
      req.logger.error("verification failed due to invalid query parameters");
      const error = new Custom_error(
        result.error.message,
        status_codes.BAD_REQUEST
      );
      throw error;
    }
    const books_data = await books_services.get_books_by_filters_services(
      req.query
    );
    req.logger.info("getting books based on filters successful");
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    next(err);
  }
}

async function get_books_by_search(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { q } = req.query;
  try {
    req.logger.info("getting books based on search");
    const books_data = await books_services.get_books_by_search_services(
      String(q)
    );
    req.logger.info("getting books successful");
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    const error = new Custom_error(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );
    req.logger.error("getting books failed coz something went wrong");
    next(error);
  }
}

async function create_new_book(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.logger.info("started creating a book");
    const new_book = await books_services.create_book_services(req);
    req.logger.info("New book created successfuly");
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
    req.logger.info("updating book initated");
    const updated_book = await books_services.update_a_book_service(
      Number(id),
      String(role),
      data,
      req
    );
    req.logger.info("updating book successful");
    res.status(200).send({ message: "success", data: updated_book });
  } catch (err) {
    next(err);
  }
}

async function rent_book(req: Request, res: Response, next: NextFunction) {
  try {
    req.logger.info("initiating rent a book");
    const rented_data = await books_services.rent_book_service(req);
    req.logger.info("renting book successful, added to user bookshelf");
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
