import { NextFunction, Request, Response } from "express";
import login_services from "../../services/login_services/login_services";



async function verify_login(req: Request, res: Response, next: NextFunction) {
  try {
    req.logger.info("verifying user login");
    const jwtToken = await login_services.verify_login_service(req);
    res.status(200).send({ jwtToken });
  } catch (err) {
    next(err);
  }
}

export default verify_login;
