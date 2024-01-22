import mongoose from "mongoose";

const inventoriesSchema = mongoose.Schema({
    id: Number,
    sku: String,
    description: String,
    instock: Number
})

const inventoriesModel = mongoose.model("inventories", inventoriesSchema)

export default inventoriesModel