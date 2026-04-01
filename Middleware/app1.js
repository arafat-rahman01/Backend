const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log("Middleware executed!");
    next();
});

// middleware/auth.js
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.send("You must be logged in!");
    }
    next();
};

// Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000);