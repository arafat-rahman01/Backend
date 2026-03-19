const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const methodOverride=require("method-override");

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
app.use(methodOverride("_method"));


app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});

//index route
app.get("/listings",async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings})
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Create route
app.post("/listings",async(req,res)=>{
   // let {title,description,image,price,country,location}=req.body;
   //console.log(req.body);
   //console.log(req.body.listing);
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");

});

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
});

//Edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

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
});
