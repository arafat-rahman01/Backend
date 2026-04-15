const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema,reviewSchema }=require("./schema.js");
const Review=require("./models/review.js");

const listings =  require("./routes/listing.js");

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
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use((req, res, next) => {
    res.locals.layout = "layout";
    next();
});

app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});



const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

app.use("/listings",listings); 

//Reviews
//Post Review Route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    await newReview.save();

    listing.reviews.push(newReview._id);

    await listing.save();

    res.redirect(`/listings/${listing._id}`); 
}));

//Delete review route
app.delete("/listing/:id/review/:reviewId",wrapAsync(async(req,res)=>{
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

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

// 404 handler
app.use((req, res, next) => {
    let err = new Error("Page Not Found");
    err.statusCode = 404;
    next(err);
});

// error middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080,()=>{
    console.log("Serever is listening to port 8080");
});
