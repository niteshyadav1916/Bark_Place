var express=require("express");
var router =express.Router();
var campgrounds=require("../models/campground.js");
var Comment = require("../models/comment.js");
var middleware=require("../middleware");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/",middleware.isLoggedIn,function(req,res){
	 var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	 if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      campgrounds.find({name: regex}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allCampgrounds);
         }
      });
  } else{
     campgrounds.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err,allCampgrounds){
		
// 			  if(req.xhr) {
//               res.json(allCampgrounds);
//             } else {
// 			 res.render("campgrounds/campgrounds.ejs",{campgrounds:allCampgrounds,currentUser:req.user,page: 'campgrounds'});
// 			}
// 		 
		   campgrounds.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
				if(req.xhr) {
              res.json(allCampgrounds);
            } else {
                res.render("campgrounds/campgrounds.ejs", {
                    campgrounds: allCampgrounds,
					currentUser:req.user,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        }
	 });
	 });
  }
 });
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		username:req.user.username,
		id:req.user._id
	}
	var newCampground={name:name,price:price,image:image,description:description,author:author}
	
	campgrounds.create(newCampground,function(err,newlyCreated){
		
		 if(err){
	        	console.log("error");
		 }
		 else{
			 console.log(newlyCreated);
				res.redirect("/dogs");
		 }

	});
	
});

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new.ejs");
});

router.get("/:id",function(req,res){
	
	// campgrounds.findById(req.params.id).populate("comments").populate("likes").exec(function(err,foundCampground){
	// 	// || ! foundCampground is imp to prevent breaking down of aur app if obj id is chnaged
	// 	if(err || !foundCampground){
	// 		req.flash("error","Dog Not Found");
	// 		res.redirect("back");
	// 	 }
		
	// 	else{
	// 		console.log(foundCampground);
			 
	// 	 }	
		
	// 	});
	   campgrounds.findById(req.params.id).populate("comments likes").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show.ejs",{campgrounds:foundCampground});
        }
    });
	
});
///likes
router.post("/:id/like", middleware.isLoggedIn, function (req, res) {
    campgrounds.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
            return res.redirect("/dogs");
        }

        // check if req.user._id exists in foundCampground.likes
        var foundUserLike = foundCampground.likes.some(function (like) {
            return like.equals(req.user._id);
        });

        if (foundUserLike) {
            // user already liked, removing like
            foundCampground.likes.pull(req.user._id);
        } else {
            // adding the new user like
            foundCampground.likes.push(req.user);
        }

        foundCampground.save(function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/dogs");
            }
            return res.redirect("/dogs/" + foundCampground._id);
        });
    });
});
//edit
router.get("/:id/edit",middleware.chechCGOwnership,function(req,res){
	//is user logged in?
	
	   campgrounds.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit.ejs",{campgrounds:foundCampground});
		   });
});
//update
router.put("/:id",middleware.chechCGOwnership,function(req,res){
campgrounds.findByIdAndUpdate(req.params.id,req.body.campgrounds,function(err,updatedCampgrounds){
	if(err){
		res.redirect("/dogs");
	}
	else{
	
		res.redirect("/dogs/" + req.params.id);
	}
});

});

router.delete("/:id",middleware.chechCGOwnership,function(req,res){
	campgrounds.findByIdAndRemove(req.params.id,req.body.campgrounds,function(err,updatedCampgrounds){
	if(err){
		res.redirect("/dogs");
	}
	else{
		res.redirect("/dogs/");
	}
});

});


module.exports=router;