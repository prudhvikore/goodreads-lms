import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import userQueries from "../../queries/user_query/user_queries";
import login_services from "../../services/login_services/login_services"


require("dotenv").config();

async function verify_login(req: Request, res: Response,next:NextFunction) {
  try {
    req.logger.info("verifying user login")
    const jwtToken=await login_services.verify_login_service(req,res)
    res.status(200).send({ jwtToken });
    
  
  } catch (err) {
    next(err)
  }
}





module.exports = verify_login;
