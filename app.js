const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes
const app = express();

// MongoDB connection URI
const dbURI = "mongodb+srv://rajaabpro:test123@cluster0.a8mneoq.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB & listen for requests
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware & static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
