import { authorize } from "../middlewares/authorization";
import { addPost, getPost, getPosts, searchPosts, putPost, removePost, getPostsAdmin } from "../controllers/post.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/search", searchPosts);

router.get("/posts/admin", authorize, getPostsAdmin);
router.get("/posts/:id", getPost);

router.post("/posts", authorize, addPost);
router.put("/posts/:id", authorize, putPost);
router.delete("/posts/:id", authorize, removePost);

export default router;
