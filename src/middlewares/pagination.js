import IncorrectRequest from "../errors/IncorretRequest.js";

async function pagination(req, res, next) {
    try {
        let { limit = 5, page = 1, orderField = "_id:1" } = req.query;

        let [field, order] = orderField.split(":");
    
        limit = parseInt(limit);
        page = parseInt(page);
        order = parseInt(order);

        const list = req.result
    
        if (limit > 0 && page > 0) {
          const success = await list
          .find()
          .sort({ [field]: order }) // 1: crescente, -1: decrescente
          .skip((page - 1) * limit) //lógica para pular a quantidade correta de livros ao listar
          .limit(limit)
          .exec();
    
        res.status(200).json(success);
        } else {
          return next(new IncorrectRequest());
        } 
    } catch (error) {
        next(error);
    }
}

export default pagination;