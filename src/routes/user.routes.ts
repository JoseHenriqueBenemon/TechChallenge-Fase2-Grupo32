import { authorize } from "../middlewares/authorization";
import { addUser, getUser, getUsers, modifyUser, signinUser } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router()

router.post("/users", addUser);
router.post("/users/signin", signinUser);

router.use(authorize);

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", modifyUser);

export default router;