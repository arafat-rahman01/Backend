const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
    .then(()=>{console.log("connection seccessful")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
  name: String,
  email: String
});

module.exports = mongoose.model("User", userSchema);

const productSchema = new Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model("Product", productSchema);

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  totalPrice: Number
});

module.exports = mongoose.model("Order", orderSchema);

const user = await User.create({ name: "Arafat", email: "a@gmail.com" });

const p1 = await Product.create({ name: "Burger", price: 100 });
const p2 = await Product.create({ name: "Pizza", price: 200 });

const order = await Order.create({
  user: user._id,
  products: [p1._id, p2._id],
  totalPrice: 300
});

Order.find()
  .populate("user")
  .populate("products")
  .then(res => console.log(res));