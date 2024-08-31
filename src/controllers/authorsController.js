import authors from "../models/Author.js";

class AuthorController {
  static listMany = async (req, res, next) => {
    try {
      const success = await authors.find();

      res.status(200).json(success);
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const id = req.params.id;

      const success = await authors.findById(id);

      if (success !== null)
        res.status(200).send(success);
      else
        res.status(404).send({ message: "Id do Autor não localizado." });
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      let author = new authors(req.body);

      const success = await author.save();

      res.status(201).send(success.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      next(error);
    }
  };
}

export default AuthorController;
