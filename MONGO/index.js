const mongoose = require('mongoose');

main()
    .then((res)=>{
        console.log("Connection Successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema=new mongoose.Schema({
    name:String,
    email: String,
    age: Number
});

//Create Model
const User=mongoose.model("User",userSchema);

//[1] Find
// User.find({age :{$gt:50}})
// .then((res)=>{
//     //console.log(res);
//     console.log(res[0].name); //Object+ Specific name
// })
// .catch((err)=>{
//     console.log(err);
// })

//UpdateOne
// User.updateOne(
//     {name: "Arafat"},
//     {age:30}
// )
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

//update many
// User.updateMany(
//     {age:{$gt:40}},
//     {$set: { status: "Senior" }},
//     { strict: false }
// )
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//findOneAndUpdate
// User.findOneAndUpdate(
//     {age:{$gt:40}},
//     {age:88},
//     {new:true}
// )
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//delete
User.findOneAndDelete(
    { age: { $gt: 40 } }   // filter
)
.then(res => {
    console.log("Deleted document:", res);
})
.catch(err => console.log(err));

//Insert One
// const user1=new User({
//     name: "Arafat",
//     email: "arafat@yahoo.in",
//     age: 48
// });

// user1
//     .save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

//Insert Many

// User.insertMany([
//     {name: "Tony", email: "tony@gmail.com", age: 50},
//     {name: "Thor", email: "Thor@gmail.com", age: 40},
//     {name: "Bruce", email: "bruce@gmail.com", age: 67}
// ]).then((res)=>{
//     console.log(res);
// })

