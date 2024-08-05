const express=require("express");
const router=express.Router();

//database
const db=require("../data/database");

//blog route
router.get("/blog", async function(req,res){
    const [data]=await db.query("SELECT posts.*,authors.name from posts inner join authors on authorid=authors.id ");
    res.render("blog",{posts:data});
});

//create post route
router.get("/create",async function(req,res){
    const [authors]=await db.query("SELECT * FROM blog_data.authors");
    res.render("create_blog",{authors:authors});
});

//edit post route
router.get("/edit/:id",function(req,res){
    const id=req.params.id;
    res.render("edit_post",{id:id});
});

//view route
router.get("/view",function(req,res){
    res.render("view_post");
});

//from sent from in order to store the dat in database
router.post("/form",async function(req,res){
  const  data=[
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author,
    ];
    await db.query("INSERT INTO posts (title,summary,body,authorid) values(?)",[data] );
    res.redirect("/sucess")
});

//viewing a specific page 
router.get("/view/:id",async function(req,res){
    const id=req.params.id;//used to access the id from url(dynamic url)
    const [data]=await db.query("SELECT posts.*,authors.* from posts inner join authors on authorid=authors.id where posts.id=?",id);//(accessing the data from database)
   //transforming and modifienig data fetched
    data[0].DATE.toISOString();
   const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
   data[0].human_readable=data[0].DATE.toLocaleDateString("en-US",options)
  
    res.render("view_post",{posts:data[0]});
});

//update req form
router.post("/update/:id/edit",async function(req,res)
{
    const id=req.params.id;
    await db.query("UPDATE posts set TITLE=?,SUMMARY=?,BODY=?  where posts.id=?",[req.body.Title, req.body.summary, req.body.content,id] );
    res.redirect("/sucess")
     
});

//form success
router.get("/sucess",function(req,res)
{
    res.render("sucess");
});
router.get("/delete/:id",async function(req,res)
{
    const id=req.params.id;
    const query="Delete From posts where id=?"
    await db.query(query,id);
    res.redirect("/blog")
     
});

module.exports=router;