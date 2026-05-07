const Listing = require("../models/listing");
const Reviews = require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    
    listing.reviews.push(newReview._id);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review created!");
    res.redirect(`/listings/${listing._id}`); 
};