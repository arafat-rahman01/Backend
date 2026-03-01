const express=require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")))

let posts=[
    {
        username: "Web dev",
        content: "I love coding"
    },
    {
        username:"Arafat Rahman",
        content:"Chandpur science & tech uni"
    },
    {
        username:"Rahul Kumar",
        content:"I got selected first internship"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} =req.body;
    posts.push({username,content});
    console.log(req.body);
    res.send("Post req working");
});

app.listen(port,()=>{
    console.log("Listening the port: 8080");
});

