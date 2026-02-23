const express=require("express");
const app=express();

let port=3050;

app.listen(port,()=>{
    console.log(`app is listening in port ${port}`);
});
