import NotFound from "../errors/NotFound.js";
import { books } from "../models/module.js";

class BookController {
  static listMany = async (req, res, next) => {
    try {
      const success = await books.find().populate("author").exec();

      res.status(200).json(success);
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const id = req.params.id;

      const success = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      if (success !== null)
        res.status(200).send(success);
      else
        next(new NotFound("Id do livro não localizado."))
    } catch (error) {
        next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      let book = new books(req.body);

      const success = await book.save();

      res.status(201).send(success.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const id = req.params.id;

      const success = await books.findByIdAndUpdate(id, { $set: req.body });

      if (success !== null)
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      else
        next(new NotFound("Erro ao atualizar! Id do livro não localizado."))
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const id = req.params.id;

      const success = await books.findByIdAndDelete(id);

      if (success !== null)
        res.status(200).send({ message: "Livro removido com sucesso" });
      else
        next(new NotFound("Erro ao deletar! Id do livro não localizado."))
    } catch (error) {
      next(error);
    }
  };

  static listByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;

      const success = await books.find({ publisher: publisher });

      res.status(200).send(success);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
