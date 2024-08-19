import books from "../models/Book.js";

class BookController {
  static listMany = async (req, res) => {
    try {
      const success = await books.find().populate("author").exec();

      res.status(200).json(success);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static getOne = async (req, res) => {
    try {
      const id = req.params.id;

      const success = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(success);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - Id do livro não localizado.` });
    }
  };

  static create = async (req, res) => {
    try {
      let book = new books(req.body);

      const success = await book.save();

      res.status(201).send(success.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar livro.` });
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listByPublisher = async (req, res) => {
    try {
      const publisher = req.query.publisher;

      const success = await books.find({ publisher: publisher });

      res.status(200).send(success);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}

export default BookController;
