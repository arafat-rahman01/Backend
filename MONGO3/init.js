const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
    .then((res)=>{
        console.log("Connection Successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },
    {
        from: "rahul",
        to: "abrar",
        msg: "front end dev ",
        created_at: new Date(),
    },
    {
        from: "kiran",
        to: "manoj",
        msg: "full stack dev learning",
        created_at: new Date(),
    },
    {
        from: "tahsin",
        to: "rifat",
        msg: "backend dev done",
        created_at: new Date(),
    }
]

Chat.insertMany(allChats);

