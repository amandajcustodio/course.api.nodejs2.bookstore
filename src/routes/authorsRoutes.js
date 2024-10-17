import express from "express";
import AuthorController from "../controllers/authorsController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorController.listMany, pagination)
  .get("/authors/search", AuthorController.listByFilter, pagination)
  .get("/authors/:id", AuthorController.getOne)
  .post("/authors", AuthorController.create)
  .put("/authors/:id", AuthorController.update)
  .delete("/authors/:id", AuthorController.delete);

export default router;
