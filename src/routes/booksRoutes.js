import express from "express";
import BookController from "../controllers/booksController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/books", BookController.listMany, pagination)
  .get("/books/search", BookController.listByFilter, pagination)
  .get("/books/:id", BookController.getOne)
  .post("/books", BookController.create)
  .put("/books/:id", BookController.update)
  .delete("/books/:id", BookController.delete);

export default router;   