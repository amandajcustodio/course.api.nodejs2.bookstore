import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/module.js";

class BookController {
  static listMany = async (req, res, next) => {
    try {
      const findAll = books.find();
        // .populate("author"); // é usado assim quando não temos o plugin autopopulate ativado
        
      req.result = findAll;
      next();
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const id = req.params.id;

      const success = await books
        .findById(id);

      if (success !== null) res.status(200).send(success);
      else next(new NotFound("Id do livro não localizado."));
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
      else next(new NotFound("Erro ao atualizar! Id do livro não localizado."));
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
      else next(new NotFound("Erro ao deletar! Id do livro não localizado."));
    } catch (error) {
      next(error);
    }
  };

  static listByFilter = async (req, res, next) => {
    try {
      const search = await getSearchFilters(req.query);

      if (!search) return res.status(200).send([]);

      const filteredList = books // se atentar a sempre remover o await quando for adicionar a paginação
      .find(search);

      req.result = filteredList;

      // Buscar pelos dois (obrigatóriamente)
      // const success = await books.find({
      //   publisher: publisher,
      //   title: title,
      // });

      next();
    } catch (error) {
      next(error);
    }
  };
}

async function getSearchFilters(params) {
  const { publisher, title, minPage, maxPage, authorName } = params;

  let search = {};

  if (publisher) search.publisher = { $regex: publisher, $options: "i" };
  if (title) search.title = new RegExp(title, "i");

  if (minPage || maxPage) search.pages = {};
  if (minPage) search.pages.$gte = minPage;
  if (maxPage) search.pages.$lte = maxPage;

  if (authorName) {
    const author = await authors.findOne({ name: { $regex: authorName, $options: "i" } });

    if (!author) return search = null;
    
    search.author = author._id;
  };

  return search;
}

export default BookController;
