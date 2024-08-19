import authors from "../models/Author.js";

class AuthorController {
  static listMany = async (req, res) => {
    try {
      const success = await authors.find();

      res.status(200).json(success);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static getOne = async (req, res) => {
    try {
      const id = req.params.id;

      const success = await authors.findById(id);

      res.status(200).send(success);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - Id do Autor não localizado.` });
    }
  };

  static create = async (req, res) => {
    try {
      let author = new authors(req.body);

      const success = await author.save();

      res.status(201).send(success.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar Autor.` });
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AuthorController;
