const express = require("express");
const app = express();
const path=require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/", (req, res) => {
    let user = "Arafat";
    let age = 21;

    res.render("home2", { user: user, age: age });
});

app.listen(3000);