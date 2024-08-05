//express package
const express=require("express");
const app=express();

//file system
const fs=require("fs");
const path=require("path");

//refactoring requiring file
const default_routes=require("./Routes/default_routes")

//middleware usage
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//template engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//refactoring the code
app.use("/",default_routes)

//custom middleware for error 404
app.use(function(req,res){
    res.status(404).render("404");

});

app.use(function(error,req,res,next){
    console.dir(error.message)
    res.status(500).render("500");
})

app.listen(3000);