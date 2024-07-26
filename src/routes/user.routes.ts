import { addUser, getUser, getUsers, modifyUser, signinUser } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router()

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", addUser);
router.post("/users/signin", signinUser);
router.put("/users/:id", modifyUser);

export default router;