const express = require("express");
const app = express();

// Middleware
// app.use((req, res, next) => {
//     console.log("Middleware executed!");
//     next();
// });

// middleware/auth.js
// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.user) {
//         return res.send("You must be logged in!");
//     }
//     next();
// };

//Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "arafat" && password === "1234") {
        req.user = { username };
        res.send("Login successful");
    } else {
        res.send("Invalid credentials");
    }
});

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.send("Please login first");
    }
    next();
};

app.get("/create-listing", isLoggedIn, (req, res) => {
    res.send("You can create listing");
});


// Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000);