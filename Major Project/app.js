const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");

const listings =  require("./routes/listing.js");
const reviews=require("./routes/review.js");

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
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions={
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));

app.use((req, res, next) => {
    res.locals.layout = "layout";
    next();
});

app.get("/",(req,res)=>{
    res.send("Hi, i'm root");
});

app.use("/listings",listings); 
app.use("/listings/:id/reviews",reviews);
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
