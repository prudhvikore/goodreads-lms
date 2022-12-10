import { Knex } from "knex";
import { hashedPassword } from "../../utils/utils";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 101,
      username: "prudhvi",
      email: "prudhvi@gmail.com",
      password: hashedPassword("prudhvi"),
      role: "ADMIN",
    },
    {
      id: 102,
      username: "naga",
      email: "naga@gmail.com",
      password: hashedPassword("naga"),
      role: "ADMIN",
    },
    {
      id: 103,
      username: "chinnu",
      email: "chinnu@gmail.com",
      password: hashedPassword("chinnu"),
      role: "CUSTOMER",
    },
    {
      id: 104,
      username: "chrys",
      email: "chrys@gmail.com",
      password: hashedPassword("chrys"),
      role: "CUSTOMER",
    },
    {
      id: 105,
      username: "joy",
      email: "joy@gmail.com",
      password: hashedPassword("joy"),
      role: "CUSTOMER",
    },
    {
      id: 106,
      username: "taylor",
      email: "taylor@gmail.com",
      password: hashedPassword("taylor"),
      role: "CUSTOMER",
    },
  ]);
}
