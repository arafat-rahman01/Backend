const mongoose=require("mongoose");
const Schema = mongoose.Schema;

main()
    .then(()=>{console.log("connection seccessful")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema=new Schema({
    item: String,
    price : Number
});

const customerSchema=new Schema({
    name: String,
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
    ]
})

const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const addCustomer=async()=>{
    let cust1=new Customer({
        name: "Rahul Kumar",
    });

    let order1= await Order.findOne({item: "Chips"});
    let order2= await Order.findOne({item: "Chocolate"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let res= await cust1.save();
    console.log(res);
};

addCustomer();

const addOrder=async()=>{
    // let res=await Order.insertMany([
    //     {item: "Somosa", price: 12},
    //     {item: "Chips", price: 10},
    //     {item: "Choklete", price: 40}
    // ]);
    // console.log(res);

    let res=await Customer.find({});
    console.log(res);
};

// addOrder();