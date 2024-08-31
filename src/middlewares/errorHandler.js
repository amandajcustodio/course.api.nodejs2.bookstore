import mongoose from "mongoose";

function errorHandler(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError)
      res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
    else if (error instanceof mongoose.Error.ValidationError) {
      const messageError = Object.values(error.errors).map(erro => erro.message).join("; ");
      res.status(400).send({ message: `Os seguintes erros foram encontrados: ${messageError}` });
    } else
      res.status(500).send({ message: "Error interno de servidor." });
  };

export default errorHandler;