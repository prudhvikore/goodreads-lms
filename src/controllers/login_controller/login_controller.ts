import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import userQueries from "../../queries/user_query/user_queries";

require("dotenv").config();

async function verify_login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
        return res.status(400).send({message:"enter all details"})
    }
    const get_user = await userQueries.get_user_query(username);
    if (get_user === undefined) {
      res.status(404).send({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, get_user.password);
      if (isPasswordValid === true) {
        const payload = {
          user_id: get_user.id,
          username: username,
          role: get_user.role,
        };
        const jwtToken = jwt.sign(payload, process.env.SECRET,{});
        res.status(200).send({ jwtToken });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    }
  } catch (err) {
    res.status(500).send({ err, message: "Something went wrong!" });
  }
}

module.exports = verify_login;
