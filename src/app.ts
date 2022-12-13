import express, { NextFunction } from "express";
import cors from "cors";
import error_handler from "./middlewares/error_handler";
import login_route from "../src/routes/loginroute/login_route";
import books_route from "../src/routes/books_route/books_route";
import book_shelf_route from "../src/routes/book_shelf_route/book_shelf_route";
import bunyan from "bunyan";
import swaggerUi from "swagger-ui-express";
import swagger_documentation from "./docs/swagger_documentation.json";

import "dotenv/config";
import { v4 as uuid } from "uuid";

declare global {
  namespace Express {
    export interface Request {
      logger: any;
    }
  }
}

const app = express();

//middlewares

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.serve,
  swaggerUi.setup(swagger_documentation)
);

// app.use((req, res, next: NextFunction) => {
//   if (req.method !== "GET") {
//     if (req.headers["content-type"] !== "application/json") {
//       return res.status(400).send({ message: "please provide json type only" });
//     }
//   }
//   next();
// });

app.use((req, res, next) => {
  req.logger = bunyan.createLogger({ name: "goodreads", req_id: uuid() });
  next();
});

app.use(cors());
app.use("/login", login_route);
app.use("/books", books_route);
app.use("/bookshelf", book_shelf_route);

app.get("/", (req, res) => {
  res.send("Goodreads");
});

app.use(error_handler);

app.use((req, res) => {
  res.status(404).send({ message: "route not found" });
});

export default app;
