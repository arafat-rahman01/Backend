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

//Show Route + update route + Delete route
router.route("/id")
  .get("/:id",wrapAsync(listingController.showListing))
  .put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListings,
  wrapAsync(listingController.updateListing),
  )
  .delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyRoute),
)

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;