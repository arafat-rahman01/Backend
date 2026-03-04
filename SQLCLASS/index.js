const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express=require("express");
const app=express();
const path=require("path");

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
  let q= `SELECT count(*) FROM user`;
    try{
      connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=result[0]["count(*)"];
      res.render("home.ejs",{count});
    });
  }catch(err){
    console.log(err);
    res.send("Some error in database");
  }
});


app.listen("8080",()=>{
  console.log( `Serever is listening 8080`);
});

//connection.end();
