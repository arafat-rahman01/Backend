const expres=require("express");
const app=expres();

let port=8080;

app.listen(port,()=>{
    console.log(`App is running port ${port}`);
});


//Query
app.get("/search",(req,res)=>{
    console.log(req.query);
    console.log(req.query.name);

    res.send(`Hello ${req.query.name}, Age: ${req.query.age}`);
});