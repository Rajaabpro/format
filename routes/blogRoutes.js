const express = require("express");
const blogController = require("../controllers/blogcontroller");
const router = express.Router();
// Route to render the form for creating a new blog
router.get("/create", blogController.blog_create_get);
// Route to display all blogs
router.get("/", blogController.blog_index);
// Route to handle creating a new blog
router.post("/", blogController.blog_create_post);
// Route to display a specific blog's details
router.get("/:id", blogController.blog_details);
// Route to delete a blog by ID
router.delete("/:id", blogController.blog_delete);

module.exports = router;
