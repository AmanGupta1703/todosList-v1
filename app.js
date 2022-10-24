const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  const day = date.getDay();

  res.render("lists", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function (req, res) {  
    const item = req.body.newItem;  

    if (req.body.list === "Work List") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
    console.log(req.body);
});


app.get("/work", function (req, res) {  
  res.render("lists", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function (req, res) {  
  const item = req.body.newItem;
  workItems.push(item); 

  res.redirect("/work");
});


app.get("/about", function (req, res) {  
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
