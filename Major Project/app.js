const express=require("express");
const app=express();
const mongoose=require("mongoose");

app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});

app.listen(8080,()=>{
    console.log("Serever is listening to port 8080");
})