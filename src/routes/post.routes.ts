import { getPosts } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/posts", getPosts);    

export default router;