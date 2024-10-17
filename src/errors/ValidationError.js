import IncorrectRequest from "./IncorretRequest.js";

class ValidationError extends IncorrectRequest {
    constructor(error) {
        const messageError = Object.values(error.errors).map(erro => erro.message).join("; ");
        super(`Os seguintes erros foram encontrados: ${messageError}`);
    }
}

export default ValidationError;