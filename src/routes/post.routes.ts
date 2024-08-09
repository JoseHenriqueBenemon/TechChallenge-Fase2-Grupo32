import { authorize } from "../middlewares/authorization";
import { addPost, getPost, getPosts, searchPosts, putPost } from "../controllers/post.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/search", searchPosts);
router.get("/posts/:id", getPost);

router.post("/posts", authorize, addPost);
router.put("/posts/:id", authorize, putPost);

export default router;