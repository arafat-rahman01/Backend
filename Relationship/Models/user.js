const mongoose=require("mongoose");
const Schema = mongoose.Schema;

main()
    .then(()=>{console.log("connection seccessful")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema=new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location:String,
            city: String
        }
    ]
});

const User=mongoose.model("User",userSchema);

const addUsers=async()=>{
    let user1=new User({
        username: "Mosoquito",
        addresses: [{
            location: "879_gulistan",
            city: "Dhaka"
        }]
    })
    user1.addresses.push({location: "1239 Polton", city: "Dhaka"});
    await user1.save();
};

addUsers();