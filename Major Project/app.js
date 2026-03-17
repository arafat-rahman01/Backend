const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connect to DB");
    })
    .catch((error)=>{
        console.log(error);
    })

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});

//index route
app.get("/listings",async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings})
});

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})

// app.get("/testListing",async(req,res)=>{
//     let sampleListing= new Listing({
//         title:" My new villa",
//         description: "By the beach",
//         price:1200,
//         location:"Sugondha, Cox's",
//         country:"Bangladesh",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful testing");
// });

app.listen(8080,()=>{
    console.log("Serever is listening to port 8080");
})
