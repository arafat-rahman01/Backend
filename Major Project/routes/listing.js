const express = require("express");
const router = express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn,isOwner,validateListings } = require("../middleware.js");

//index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }),
);

//New Route
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner").populate({
      path: "reviews",
      populate: { path: "author" }
    });
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  })
);

//Create route
router.post(
  "/",
  isLoggedIn,
  validateListings,
  wrapAsync(async (req, res,next) => {
    let data = req.body.listing;
    if (typeof data.image === "string") {
      data.image = {
        url: data.image,
        filename: "listingimage",
      };
    }

    const newListing = new Listing(data);
    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "New Listing created!");
    res.redirect("/listings");
  })
);

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListings,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = req.body.listing;

    if (!data.image || !data.image.url || data.image.url.trim() === "") {
      delete data.image;
    } else {
      data.image = {
        url: data.image.url,
        filename: "listingimage",
      };
    }

    await Listing.findByIdAndUpdate(id, data);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

//Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;