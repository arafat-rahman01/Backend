const express=require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"public"));

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.send("Server working");
});

app.listen(port,()=>{
    console.log("Listening the port: 8080");
});