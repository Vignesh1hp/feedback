const express = require("express");

const databaseConnection = require("./database")
// database connection
databaseConnection();


const app = express();

app.get("/",async(req,res)=>{
  res.send("hello world")
})

app.listen(8000,(err)=>{
  console.log("Port listening on 8000");
  
})