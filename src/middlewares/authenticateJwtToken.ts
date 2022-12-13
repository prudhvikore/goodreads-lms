import { NextFunction, Request, Response } from "express";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticateJwtToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let jwtToken;
  const authorHeader = request.headers["authorization"];
  if (authorHeader !== undefined) {
    jwtToken = authorHeader.split(" ")[1];
  }
  if (authorHeader === undefined) {
    response.status(401).send({ message: "JWT token is missing" });
  } else {
    jwt.verify(
      jwtToken,
      process.env.SECRET,
      async (error: VerifyErrors | null, payload: JwtPayload) => {
        if (error) {
          response.status(401).send({ message: "Invalid JWT Token", error });
        } else {
          request.headers.user_id = payload.user_id;
          request.headers.username = payload.username;
          request.headers.role = payload.role;
          next();
        }
      }
    );
  }
};

export default authenticateJwtToken;
