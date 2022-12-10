import { Request, Response } from "express";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import books_query from "../../queries/books_query/books_query";

async function get_book_shelf(req: Request, res: Response) {
  try {
    const id = req.headers.user_id;
    const book_shelf = await book_shelf_query.get_book_shelf_query(Number(id));
    res.status(200).send({ message: "success", book_shelf });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
}

async function return_boook(req: Request, res: Response) {
  try {
    const loggedInUser = req.headers.user_id;
    const { rental_id } = req.params;
    const validRental = await book_shelf_query.validate_rental(
      Number(rental_id)
    );

    const { book_id, user_id, rental_status } = validRental;
    const { quantity } = await books_query.get_book_quantity_by_id(book_id);
    if (loggedInUser === user_id) {
      if (rental_status === "WITH USER") {
        const updated_rental = await book_shelf_query.update_rental_status(
          Number(rental_id)
        );
        if (updated_rental === undefined) {
          return res.status(500).send({ message: "return not updated" });
        } else {
          const updated_book_quantity = await books_query.update_book_quantity(
            book_id,
            quantity + 1
          );
          if (updated_book_quantity === undefined) {
            return res.status(500).send({
              message: "book quantity not updated, please contact Admin",
            });
          } else {
            return res
              .status(200)
              .send({
                message: "success",
                updated_rental,
                updated_book_quantity,
              });
          }
        }
      } else {
        return res
          .status(406)
          .send({ message: "Not Acceptable, Book already returned" });
      }
    } else {
      return res
        .status(401)
        .send({ message: "Book should be returned by the user who rented" });
    }
  } catch (Err) {
    res.status(500).send({ message: "something went wrong", Err });
  }
}

export { get_book_shelf, return_boook };
