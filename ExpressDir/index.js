const express=require("express");
const app=express();

let port=3050;

app.listen(port,()=>{
    console.log(`app is listening in port ${port}`);
});


//https://github.com/hoppscotch/hoppscotch/discussions/2051 [link in Github]


//[1]
// app.use((req,res)=>{
//     console.log("Request Received");
//     res.send("Response send successfully");
// });

//[2]
// app.use((req, res) => {
//     console.log("Request Received");

//     let data = {
//         success: true,
//         message: "Data fetched successfully",
//         students: [
//             { name: "Arafat", roll: 101 },
//             { name: "Rahim", roll: 102 },
//             { name: "Karim", roll: 103 }
//         ]
//     };

//     res.send(data);
// });


app.get("/",(req,res)=>{
    res.send("Home button");
});

app.get("/apple",(req,res)=>{
    res.send("Apple ");
});

app.get("/mango",(req,res)=>{
    res.send("Mango");
});

app.get((req,res)=>{
    res.status(404).send("Not Found");
});