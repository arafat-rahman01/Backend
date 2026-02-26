const express=require("express");
const app=express();
const path=require("path");

const port=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.listen(port,()=>{
    console.log(`App is running port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Home Page");
});

//static
// app.get("/students", (req, res) => {
//     let students = ["Arafat", "Rahim", "Karim", "Sakib"];
//     res.render("students", { students });
// });

//Dynamic
// app.get("/students/:name", (req, res) => {
//     let students = ["Arafat", "Rahim", "Karim", "Sakib"];
//     let name = req.params.name;

//     res.render("students", { students, name });
// });

//object
app.get("/profile", (req, res) => {

    let user = {
        name: "Arafat",
        age: 21,
        city: "Chandpur"
    };

    res.render("students", { user }); 
});