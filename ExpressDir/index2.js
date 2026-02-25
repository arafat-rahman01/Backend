const expres=require("express");
const app=expres();

let port=8080;

app.listen(port,()=>{
    console.log(`App is running port ${port}`);
});


//Query
//http://localhost:8080/search?name=Arafat&age=23

app.get("/search",(req,res)=>{
    console.log(req.query);
    console.log(req.query.name);

    res.send(`Hello ${req.query.name}, Age: ${req.query.age}`);
});

//Parameters
//http://localhost:8080/search/Arafat

app.get("/search/:name", (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

//Two parameters
app.get("/search/:name/:age", (req, res) => {
    res.send(`Hello ${req.params.name}, Age: ${req.params.age}`);
});