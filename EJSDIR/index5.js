const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3090;

/* -------- Form Page -------- */
app.get("/add", (req, res) => {
    res.render("form");
});

/* -------- POST Request -------- */
app.post("/add", (req, res) => {

    const newUser = req.body;

    //পুরানো data পড়ো
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

    //নতুন data push করো
    data.push(newUser);

    //আবার file এ লিখে দাও (Auto Save)
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.redirect("/add");
});

app.listen(PORT, () => {
    console.log("Server running...");
});