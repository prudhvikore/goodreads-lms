import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import userQueries from "../../queries/user_query/user_queries";
import Custom_error from "../../utils/errors/custom_errors";
import status_codes from "../../utils/errors/status_codes";
import {validate_user} from "../../utils/validations/validate_book_schema"

async function verify_login_service(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = validate_user().validate({username,password})
  if (!username || !password) {
    const error = new Custom_error(
      "enter all details",
      status_codes.BAD_REQUEST
    );
    throw error;
  }
  const get_user = await userQueries.get_user_query(username);
  if (get_user === undefined) {
    const error = new Custom_error("User not found", status_codes.NOT_FOUND);
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
      return jwtToken;
    } else {
      const error = new Custom_error(
        "Invalid password",
        status_codes.UN_AUTHORIZED
      );
      throw error;
    }
  }
}

export default { verify_login_service };
