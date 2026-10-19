import { Request, Response } from "express";
import { searchUsers } from "../services/user.service.js";

export const search = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  const users = await searchUsers(email);

  res.json(users);
};