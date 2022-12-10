import { Router } from "express";

const verify_login=require("../../controllers/login_controller/login_controller")

const login_route = Router();

login_route.post("/", verify_login);

module.exports= login_route