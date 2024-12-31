const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("viws engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
  {
    username: "max",
    content: " I Love Coding",
  },
  {
    username: "ray",
    content: "hard work is important to achieve success",
  },
  {
    username: "kai",
    content: " I got selected for my 1st internship"
  },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})
app.listen(port, () => {
    console.log("listening to port ", port);
})