const express = require("express");
const app = express();
const ExpressError=require("./expressError");

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

const checkToken=(req,res,next)=>{
    let {token} = req.query;
    if(token==="givenaccess"){
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED!");
};

app.get("/api",checkToken,(req,res)=>{
    res.send("data");
});

//Login Route
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     if (username === "arafat" && password === "1234") {
//         req.user = { username };
//         res.send("Login successful");
//     } else {
//         res.send("Invalid credentials");
//     }
// });

// const isLoggedIn = (req, res, next) => {
//     if (!req.user) {
//         return res.send("Please login first");
//     }
//     next();
// };

// app.get("/create-listing", isLoggedIn, (req, res) => {
//     res.send("You can create listing");
// });


// Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((err, req, res, next) => {
    let { status, message } = err;
    res.status(status).send(message);
});

app.listen(3000);