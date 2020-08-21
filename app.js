var methodoverride=require("method-override");
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful",{useNewUrlParser:true});
app.use(methodoverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs"); 
app.use(express.static("public"));
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});
var blog=mongoose.model("blog", blogSchema);



app.get("/",function(req,res){
	blog.find({},function(err,blogs){
		if(err){}
			else{res.render("index.ejs",{blogs:blogs});}
		
	});
	
});
app.post("/",function(req,res){
	blog.create(req.body.blog,function(err,newblog){
	if(err){}
 else{res.redirect("/")}
	
	});
		
	});

app.get("/blogs/new",function(req,res){
	res.render("new.ejs");
});

app.get("/:id",function(req,res){
	blog.findById(req.params.id,function(err,foundblog){
		if(err){}
		else{res.render("show.ejs",{blog :foundblog});}
	});

});
app.put("/:id",function(req,res){
	blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
		if(err){}
		else{res.redirect("/"+req.params.id);}
	});

});

app.get("/:id/edit",function(req,res){
	blog.findById(req.params.id,function(err,foundblog){
		if(err){}
		else{res.render("edit.ejs",{blog :foundblog});}
	});

});

app.delete("/:id",function(req,res){
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err){}
		else{res.redirect("/");}
		
	});
	
});










app.listen(3000,function(){
	console.log("blog");
});
