import bcrypt from "bcrypt";

const hashedPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

export { hashedPassword };
