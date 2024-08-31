import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "É obrigatório enviar um título válido."] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "É obrigatório enviar um(a) autor(a) válido."],
  },
  publisher: { type: String, required: [true, "É obrigatório enviar uma editora."] },
  pages: { type: Number },
});

const books = mongoose.model("books", bookSchema);

export default books;
