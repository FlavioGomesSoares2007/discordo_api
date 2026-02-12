import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
      };
    }
  }
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken: string | undefined = req.headers["authorization"];
  const token: string | undefined = bearerToken?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }
  jwt.verify(token, process.env.ASSINATURA_JWT!, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Acesso negado." });
    }
    interface Payload {
      id: number;
      email: string;
    }
    req.user = user as Payload;

    next();
  });
};
