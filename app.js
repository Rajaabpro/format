const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://rajaabpro:test123@cluster0.a8mneoq.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

//  middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method:", req.method);
  next();
});
app.use((req, res, next) => {
  console.log("in the next middleware");

  next();
});
app.get("/", (req, res) => {
  const blogs = [
    { title: "Hi im vhvv ", snippet: "Im learing" },
    { title: "Hi im Rajaab", snippet: "Im learing" },
    { title: "Hi im Rajaab", snippet: "Im learing" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog " });
});
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
