import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, "É obrigatório enviar um título válido."],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "É obrigatório enviar um(a) autor(a) válido."],
  },
  publisher: {
    type: String,
    required: [true, "É obrigatório enviar uma editora."],
    enum: {
      values: ["ROCCO", "ALURA"],
      message: "A editora {VALUE} não está no nosso Banco.",
    },
  },
  pages: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message:
        "O número de páginas deve estar entre 10 (dez) e 5000 (cinco mil).",
    },
    // min: [10, "O número de páginas deve estar entre 10 (dez) e 5000 (cinco mil)."],
    // max: [5000, "O número de páginas deve estar entre 10 (dez) e 5000 (cinco mil)."],
  },
});

const books = mongoose.model("books", bookSchema);

export default books;
