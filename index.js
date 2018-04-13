// require the needed npm packages 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");

var app = express();

// connect to the mongoDB and create a new connection 
// here it is blog_app
mongoose.connect("mongodb://localhost/blog_app");

// setting the paths and using the methods
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(sanitizer());
app.use(methodOverride("_method"));

// defining the schema
var blogSchema = new mongoose.Schema(
    {
        title:String,
        image:String,
        body:String,
        date:{type:Date,default:Date.now}
    }
);


// defining the model
var Blog = mongoose.model("Blog",blogSchema);

// dummy date added into the database
// Blog.create(
//     {
//         title:"tasks",
//         image:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&h=350.jpg",
//         body:"A wonderful view"
//     },
//     function(err,blogObj){
//         if(err){
//             console.log(err);
//         }else {
//             // console.log(blogObj);
//         }
//     });
    
// index 
app.get("/",function(req,res){
    res.redirect("/blogs");
});

// default
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    })
});

// create
app.post("/blogs",function(req,res){
    req.body.blogNew.body = req.sanitize(req.body.blogNew.body)
    var blog = req.body.blogNew;
    console.log(req.body.blogNew.body)
    Blog.create(blog,function(err,addedBlog){
        if(err){
            res.redirect("/blogs/new");
        }else{
            res.redirect("/blogs")
        }
    });
});

// new -- form to add new blog
app.get("/blogs/new",function(req,res){
    res.render("newBlog");
});

// show - show details of a particular blog
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/");
        }else{
            res.render("show",{selectedBlog:foundBlog});
        }
    });
});




// update - to update the defined or present blog
app.put("/blogs/:id",function(req,res){
    req.body.blogNew.body = req.sanitize(req.body.blogNew.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blogNew,function(err,updatedBlog){
        if(err){
            res.render("/blogs/:id/edit");
        }else{
            res.redirect("/blogs/"+req.params.id)
        }
    });
});

// delete - to delete a particular blog
app.delete("/blogs/:id",function(req,res){
   Blog.findByIdAndRemove(req.params.id,function(err,obj){
       if(err){
           res.redirect("/blogs/"+req.params.id);
       }else{
           res.redirect("/blogs")
       }
   })
});


// edit - to edit a defined blog
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blogItem){
        console.log(blogItem.title)
        if(err){
            res.redirect("/")
        }else{
            res.render("edit",{blogItem:blogItem})
        }
    });
});


// to start the server at the defined portal
app.listen(3000,function(){
    console.log("Server Started at port: 3000");
});