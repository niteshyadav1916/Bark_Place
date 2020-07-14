var mongoose=require("mongoose");
var campgroundsSchema=new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	createdAt: { type: Date, default: Date.now },
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});

module.exports=mongoose.model("campgrounds",campgroundsSchema);