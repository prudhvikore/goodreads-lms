import { Request, Response } from "express";
import books_query from "../../queries/books_query/books_query";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";

async function get_books(req: Request, res: Response) {
  try {
    const books_data = await books_query.get_books_query();
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
}

async function get_books_by_name(req: Request, res: Response) {
  try {
    const books_data = await books_query.get_books_query_by_query(req.query);
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong", err });
  }
}

async function get_books_by_search(req: Request, res: Response) {
  const { q } = req.query;
  try {
    const books_data = await books_query.get_books_query_by_filter(String(q));
    res.status(200).send({ message: "success", data: books_data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong", err });
  }
}

async function create_new_book(req: Request, res: Response) {
  try {
    if (req.headers.role === "ADMIN") {
      if (Object.keys(req.body).length < 9) {
        return res.status(400).send({ message: "enter all details" });
      } else {
        const new_book = await books_query.create_book(req.body);
        if (!new_book) {
          return res.status(500).send({ message: "failed to create book" });
        }
        res.status(200).send({ message: "success", data: new_book });
      }
    } else {
      res.status(401).send({ message: "Not authorized to create a book" });
    }
  } catch (err: any) {
    res.status(500).send({ message: "something went wrong", err: err.detail });
  }
}

async function update_a_book(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (req.headers.role === "ADMIN") {
      const updated_book = await books_query.update_book(Number(id), req.body);
      if (!updated_book) {
        return res.status(500).send({ message: "failed to update book" });
      }
      res.status(200).send({ message: "success", data: updated_book });
    } else {
      res
        .status(401)
        .send({ message: "Not authorized to update book details" });
    }
  } catch (err: any) {
    res.status(500).send({ message: "something went wrong internally!!" });
  }
}

async function rent_book(req: Request, res: Response) {
  try {
    const { book_id } = req.params;
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const { user_id } = req.headers;
    const book_quantity = await books_query.get_book_quantity_by_id(
      Number(book_id)
    );
    if (book_quantity === undefined) {
      return res.status(400).send({ message: "Invalid Book ID" });
    }
    const { quantity } = book_quantity;
    if (quantity > 0) {
      const new_rental = await book_shelf_query.create_rental(
        Number(book_id),
        Number(user_id),
        date
      );
      if (new_rental === undefined) {
        return res.status(500).send({ message: "failed to rent book" });
      }
      const update_book = await books_query.update_book_quantity(
        Number(book_id),
        quantity - 1
      );
      if (update_book === undefined) {
        return res.status(500).send({
          message: "failed to update book, Please reach out to admin",
        });
      }
      res
        .status(200)
        .send({ message: "success", data: new_rental, update_book });
    } else {
      // error code is wrong, please refer someone and provide correct status code
      return res.status(307).send({ message: "sorry!!, book is out of stock" });
    }
  } catch (err) {
    res.status(500).send({ message: "something went wrong internally!!", err });
  }
}

export {
  get_books,
  get_books_by_name,
  create_new_book,
  update_a_book,
  rent_book,
  get_books_by_search,
};
