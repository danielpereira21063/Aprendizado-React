const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const erros = validationResult(req);

    if (erros.isEmpty()) {
        return next();
    }

    extractedErros = [];

    erros.array().map((err) => extractedErros.push(err.msg));

    return res.status(422).json({
        errors: extractedErros
    });
};

module.exports = validate;