"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarDto = validarDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validarDto(dto) {
    return async (req, res, next) => {
        const dtoValid = (0, class_transformer_1.plainToInstance)(dto, req.body);
        const error = await (0, class_validator_1.validate)(dtoValid);
        if (error.length > 0) {
            const formatoError = error.map((err) => ({
                property: err.property,
                constraints: err.constraints,
            }));
            return res.status(400).json({
                messagem: "error com a validaçao",
                error: formatoError,
            });
        }
        req.body = dtoValid;
        next();
    };
}
