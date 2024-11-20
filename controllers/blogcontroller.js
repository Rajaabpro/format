const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching blogs");
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Blog not found");
    });
};
const blog_create_get = (req, res) => {
  res.render("blog/create", { title: "Create a new blog" });
};
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving blog");
    });
};
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting blog");
      });
}
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};
