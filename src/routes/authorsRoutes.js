import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorController.listMany)
  .get("/authors/:id", AuthorController.getOne)
  .post("/authors", AuthorController.create)
  .put("/authors/:id", AuthorController.update)
  .delete("/authors/:id", AuthorController.delete);

export default router;
