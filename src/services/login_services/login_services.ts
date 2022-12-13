import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import userQueries from "../../queries/user_query/user_queries";
import Custom_error from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";
import { validate_user } from "../../utils/validations/validations";

async function verify_login_service(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await validate_user().validate({ username, password });
  if (result.error) {
    req.logger.info("verification failed due to invalid credentials");
    throw new Custom_error(result.error.message, status_codes.BAD_REQUEST);
  }
  const get_user = await userQueries.get_user_query(username);
  if (get_user === undefined) {
    const error = new Custom_error("User not found", status_codes.NOT_FOUND);
    req.logger.info("verification failed because user is not registered");
    throw error;
  } else {
    const isPasswordValid = await bcrypt.compare(password, get_user.password);
    if (isPasswordValid === true) {
      const payload = {
        user_id: get_user.id,
        username: username,
        role: get_user.role,
      };
      const jwtToken = jwt.sign(payload, process.env.SECRET);
      req.logger.info("verification successful and returned jwtToken");
      return jwtToken;
    } else {
      const error = new Custom_error(
        "Invalid password",
        status_codes.UN_AUTHORIZED
      );
      req.logger.info("verification failed due to wrong password");
      throw error;
    }
  }
}

export default { verify_login_service };
