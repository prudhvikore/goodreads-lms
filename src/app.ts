import express, { Request, Response } from "express";
import cors from "cors";
import {hashedPassword} from "./utils/utils";
const login_route = require("../src/routes/loginroute/login_route");
const books_route = require("../src/routes/books_route/books_route");
const book_shelf_route = require("../src/routes/book_shelf_route/book_shelf_route");

require("dotenv").config();

const app = express();

//middlewares

app.use(express.json());
app.use(cors());
app.use("/login", login_route);
app.use("/books", books_route);
app.use("/bookshelf", book_shelf_route);

app.get("/", (req, res) => {
  res.send("Goodreads");
});

app.use((req, res) => {
  res.status(404).send({ message: "route not found" });
});

export default app;
