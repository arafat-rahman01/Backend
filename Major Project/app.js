const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connect to DB");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});

app.get("/testListing",async(req,res)=>{
    let sampleListing= new Listing({
        title:" My new villa",
        description: "By the beach",
        price:1200,
        location:"Sugondha, Cox's",
        country:"Bangladesh",
    });
    await sampleListing.save();
    console.log("Sample was saved");
    res.send("successful testing");
});

app.listen(8080,()=>{
    console.log("Serever is listening to port 8080");
})