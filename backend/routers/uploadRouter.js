// install moulder lib npm
import multer from "multer";
import express from "express";
import { isAdmin, isAuth } from "../utils.js";
const uploadRouter = express.Router();
// define storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const uploadMiddleware = multer({ storage });
uploadRouter.post(
  "/",
  isAuth,
  isAdmin,
  uploadMiddleware.single("image"),
  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);
export default uploadRouter;
