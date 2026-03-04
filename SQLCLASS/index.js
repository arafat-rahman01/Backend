const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '01306249973arafat@A'
});

let getRandomUser=()=>{
  return [ 
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ]; 
}

// let q="INSERT INTO user(id,username,email,password) VALUES ?";

// let data=[];
// for(let i=1;i<=100;i++){
//   data.push(getRandomUser()); 
// }


app.get("/",(req,res)=>{
  let q= `SELECT count(*) AS total FROM user`;
    try{
      connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=result[0].total;
      res.render("home.ejs",{count});
    });
  }catch(err){
    console.log(err);
    res.send("Some error in database");
  }
});

//Show Route
app.get("/user",(req,res)=>{
  let q=`SELECT * FROM user`;
  try{
      connection.query(q,(err,users)=>{
      if(err) throw err;
      res.render("showuser.ejs",{users});
    });
  }catch(err){
    console.log(err);
    res.send("Some error in database");
  }
});

//Edit Route
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`SELECT * FROM user WHERE id='${id}'`;

  try{
      connection.query(q,(err,result)=>{
      if(err) throw err;
      let user=result[0];
      res.render("edit.ejs",{user});
    });
  }catch(err){
    console.log(err);
    res.send("Some error in database");
  }
});

//Update Route
app.patch("/user/:id",(req,res)=>{
  res.send("updated");
});

app.listen("8080",()=>{
  console.log( `Serever is listening 8080`);
});