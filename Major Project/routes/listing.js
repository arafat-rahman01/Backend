const express = require("express");
const router = express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn,isOwner,validateListings } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index + Delete Route
router.route("/")
  .get(wrapAsync(listingController.index))
    .post(
      isLoggedIn,
      validateListings,
      upload.single('listingImage'),
      wrapAsync(listingController.createListing)
    );

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show Route + update route + Delete route
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
  isLoggedIn,
  isOwner,
  validateListings,
  wrapAsync(listingController.updateListing),
  )
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyRoute),
)



//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;