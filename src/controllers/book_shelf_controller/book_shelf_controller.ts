import { NextFunction, Request, Response } from "express";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import books_query from "../../queries/books_query/books_query";
import book_shelf_services from "../../services/book_shelf_services/book_shelf_services";
import Custom_errors from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";

async function get_book_shelf(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.headers.user_id;
    const book_shelf = await book_shelf_services.get_book_shelf_service(
      Number(id)
    );
    res.status(200).send({ message: "success", book_shelf });
  } catch (err) {
    const error = new Custom_errors(
      "something went wrong",
      status_codes.INTERNAL_ERROR
    );

    next(error);
  }
}

async function return_book(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await book_shelf_services.return_book_services(req, res);
    res.status(200).send({
      message: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { get_book_shelf, return_book };
