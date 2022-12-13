
import knex from "../../config/connection"


async function get_user_query(username: string) {
  const userdetails = await knex.where("username", username).from("users");
  return userdetails[0];
}



export default { get_user_query };
