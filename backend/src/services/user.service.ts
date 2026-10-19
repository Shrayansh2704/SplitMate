import { db } from "../prisma/db.js";

export const searchUsers = async (email: string) => {
  const users = await db.orm.public.User.where({ email }).all();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};