const express = require("express");
const router = express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn,isOwner,validateListings } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

//Index + Delete Route
router.route("/")
  .get("/",wrapAsync(listingController.index))
  .post("/",isLoggedIn,validateListings,wrapAsync(listingController.createListing));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show Route
router.get("/:id",wrapAsync(listingController.showListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListings,
  wrapAsync(listingController.updateListing),
);

//Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyRoute),
);

module.exports = router;