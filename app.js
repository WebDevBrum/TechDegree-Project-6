const express = require("express");

const { projects } = require("./data.json");

const app = express();

app.set("view engine", "pug");
//app.set("views", "./views");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.locals = projects;
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  const { id } = req.params;
  res.locals = projects[id];
  res.render("project");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
