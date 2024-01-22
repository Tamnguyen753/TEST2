import mongoose from "mongoose";

const ordersSchema = mongoose.Schema({
    id: Number,
    item: String,
    price: Number,
    quantity: Number
})
const ordersModel = mongoose.model("orders", ordersSchema)

export default ordersModel