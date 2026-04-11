const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ================= DB CONNECTION =================
main()
  .then(() => console.log("Connection successful"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// ================= SCHEMAS =================

// Order Schema
const orderSchema = new Schema({
  item: String,
  price: Number
});

// Customer Schema
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

// ================= MIDDLEWARE =================

// When customer deleted → delete all related orders
customerSchema.post("findOneAndDelete", async (data) => {
  if (data && data.orders.length) {
    await Order.deleteMany({ _id: { $in: data.orders } });
    console.log(" Related orders deleted!");
  }
});

// ================= MODELS =================

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// ================= FUNCTIONS =================

// Add Customer + Order
const addCustomer = async () => {
  let newOrder1 = new Order({
    item: "Pizza",
    price: 250
  });

  let newOrder2 = new Order({
    item: "Burger",
    price: 150
  });

  await newOrder1.save();
  await newOrder2.save();

  let newCustomer = new Customer({
    name: "Rohan",
    orders: [newOrder1._id, newOrder2._id]
  });

  await newCustomer.save();

  console.log("Customer & Orders added!");
};

// Show all customers with populated orders
const showCustomers = async () => {
  let res = await Customer.find({}).populate("orders");
  console.log(JSON.stringify(res, null, 2));
};

// Delete Customer (and auto delete orders)
const deleteCustomer = async () => {
  await Customer.findByIdAndDelete("PUT_CUSTOMER_ID_HERE");
  console.log("Customer deleted!");
};

// ================= RUN =================

// Step 1: Add Data
// addCustomer();

// Step 2: Show Data
// showCustomers();

// Step 3: Delete Customer (Replace ID first)
// deleteCustomer();


// const mongoose=require("mongoose");
// const Schema = mongoose.Schema;

// main()
//     .then(()=>{console.log("connection seccessful")})
//     .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
// }

// const orderSchema=new Schema({
//     item: String,
//     price : Number
// });

// const customerSchema=new Schema({
//     name: String,
//     orders:[
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Order"
//         },
//     ]
// });

// // customerSchema.pre("findOneAndDelete",async()=>{
// //     console.log("PRE MIDDLEWARE");
// // });

// customerSchema.post("findOneAndDelete",async(data)=>{
//     if(customer.orders.length){
//         Order.deleteMany({_id: {$in: customer.orders}});
//     }
// });

// const Order=mongoose.model("Order",orderSchema);
// const Customer=mongoose.model("Customer",customerSchema);

// const addCust=async()=>{
//     let newCust= new Customer({
//         name: "Rohan"
//     });

//     let newOrder = new Order({
//         item: "Pizza",
//         price: 250
//     });

//     newCust.orders.push(newOrder);
//     await newOrder.save();
//     await newCust.save();
// };

// // addCust();

// const delCust=async()=>{
//     await Customer.findByIdAndDelete("69d902a97674840f42296096");
// }

// delCust();


// // const addCustomer=async()=>{
// //     let cust1=new Customer({
// //         name: "Rahul Kumar",
// //     });

// //     let order1= await Order.findOne({item: "Chips"});
// //     let order2= await Order.findOne({item: "Chocolate"});

// //     cust1.orders.push(order1);
// //     cust1.orders.push(order2);

// //     let res= await cust1.save();
// //     console.log(res);
// // };

// // addCustomer();

// //const addOrder=async()=>{
//     // let res=await Order.insertMany([
//     //     {item: "Somosa", price: 12},
//     //     {item: "Chips", price: 10},
//     //     {item: "Choklete", price: 40}
//     // ]);
//     // console.log(res);

// //     let res=await Customer.find({});
// //     console.log(res);
// // };

// // addOrder();