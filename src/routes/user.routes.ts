import { addUser, getUser, getUsers, modifyUser } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router()

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", addUser);
router.put("/users/:id", modifyUser);

export default router;