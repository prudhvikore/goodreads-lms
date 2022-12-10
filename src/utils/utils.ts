import bunyan from "bunyan";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const log = bunyan.createLogger({ name: "Goodreads", req_id: uuid() });

const hashedPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};




export { log, hashedPassword };
