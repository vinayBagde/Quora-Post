const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("viws engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "max",
    content: " I Love Coding",
  },
  {
    id: uuidv4(),
    username: "ray",
    content: "hard work is important to achieve success",
  },
  {
    id: uuidv4(),
    username: "kai",
    content: " I got selected for my 1st internship",
  },
];
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ username, content, id });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let {id} = req.params;
   posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
})
app.listen(port, () => {
  console.log("listening to port ", port);
});
