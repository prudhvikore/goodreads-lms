import { Router } from "express";
import authenticateJwtToken from "../../middlewares/authenticateJwtToken";
import {
  get_books,
  get_books_by_filters,
  create_new_book,
  update_a_book,
  rent_book,
  get_books_by_search,
} from "../../controllers/books_controller/books_controller";

const books_route = Router();

books_route.get("/", get_books);
books_route.get("/filter", get_books_by_filters);
books_route.get("/search", get_books_by_search);
books_route.post("/", authenticateJwtToken, create_new_book);
books_route.put("/:id", authenticateJwtToken, update_a_book);
books_route.post("/rent/:book_id", authenticateJwtToken, rent_book);

export default books_route;
