import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import type { Request, Response, NextFunction } from "express";

export function validarDto(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoValid = plainToInstance(dto, req.body);

    const error: ValidationError[] = await validate(dtoValid);

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
