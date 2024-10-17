import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { 
      type: String, 
      required: [true, "É obrigatório enviar um nome válido."] },
    nationality: { type: String },
  },
  {
    versionKey: false,
  }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
