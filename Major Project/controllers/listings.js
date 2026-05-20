const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
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
  };

  module.exports.createListing = async (req, res,next) => {
      let url = req.file.path;
      let filename = req.file.filename;
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
};

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
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
};

module.exports.destroyRoute= async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }