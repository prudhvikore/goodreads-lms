import { Router } from "express";
import authenticateJwtToken from "../../middlewares/authenticateJwtToken"

import {get_book_shelf,return_book} from "../../controllers/book_shelf_controller/book_shelf_controller";


const book_shelf_route = Router();

book_shelf_route.get("/",authenticateJwtToken,get_book_shelf)
book_shelf_route.put('/return/:rental_id',authenticateJwtToken,return_book)


export default book_shelf_route;