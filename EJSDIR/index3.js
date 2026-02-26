const express=require("express");
const app=express();
const path=require("path");

const port=5098;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.listen(port,()=>{
    console.log(`App is running port ${port}`);
});

app.get("/:ig/:username",(req,res)=>{
    let {username}=req.params;
    res.render("instagram",{username});
});