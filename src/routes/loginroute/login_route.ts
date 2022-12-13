import { Router } from "express";

import verify_login from "../../controllers/login_controller/login_controller";

const login_route = Router();

login_route.post("/", verify_login);

export default login_route