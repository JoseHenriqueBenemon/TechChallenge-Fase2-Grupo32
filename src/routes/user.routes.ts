import { authorize } from "../middlewares/authorization";
import { addUser, getUser, getUsers, modifyUser, removeUser, signinUser } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router()

router.post("/users", addUser);
router.post("/users/signin", signinUser);

router.get("/users", authorize, getUsers);
router.get("/users/:id", authorize, getUser);
router.put("/users/:id", authorize, modifyUser);
router.delete("/users/:id", authorize, removeUser);

export default router;