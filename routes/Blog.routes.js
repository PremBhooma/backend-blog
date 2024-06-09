const express = require("express");
const router = express.Router();
const Controller = require("../controller/Blog.controller");
const { uploadS3BlogImage } = require("../middlewares/s3-file-upload");

router.post("/create", uploadS3BlogImage.single("image"), Controller.createBlog);
router.patch("/edit", uploadS3BlogImage.single("image"), Controller.editBlog);
router.get("/get-all-blogs", Controller.getAllBlogs);
router.get("/get/:id", Controller.getBlogById);
router.delete("/delete/:id", Controller.deleteBlog);

module.exports = router;
