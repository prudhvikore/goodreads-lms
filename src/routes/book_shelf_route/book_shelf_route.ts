import { Router } from "express";
import authenticateJwtToken from "../../middlewares/authenticateJwtToken"

import {get_book_shelf,return_boook} from "../../controllers/book_shelf_controller/book_shelf_controller";


const book_shelf_route = Router();

book_shelf_route.get("/",authenticateJwtToken,get_book_shelf)
book_shelf_route.post('/return/:rental_id',authenticateJwtToken,return_boook)


module.exports = book_shelf_route;