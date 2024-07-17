import { getPost, getPosts } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);    

export default router;