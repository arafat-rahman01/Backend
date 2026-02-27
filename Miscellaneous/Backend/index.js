const express=require("express");
const app=express();
const port=8070;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/register",(req,res)=>{
    let {user,password}=req.query;
    res.send(`Standing GET response ${user}.`);
});

app.post("/register",(req,res)=>{
    let {user,password}=req.body;
    res.send(`Standing POST response ${user}.`);
});

app.listen(port,()=>{
    console.log(`listen the port ${port}`);
});