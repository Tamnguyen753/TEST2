import mongoose from "mongoose"
import inventoriesModel from "../models/Inventories.js"
import bcrypt from "bcrypt"
import getToken from "../utils/Index.js";
import userModel from "../models/users.js";
import ordersModel from "../models/orders.js";


const createinventory = async (req, res) => {
    try {
        const { id, sku, description, instock } = req.body;
        const inventory = await inventoriesModel.create({ id, sku, description, instock })
        res.send({
            message: " Thành công!",
            data: inventory
        })

    } catch (error) {
        res.send({
            message: error.message,
        })
    }
}
//getting all products in inventory.
const getInventories = async (req, res) => {
    try {
        const inventories = await inventoriesModel.find()
        res.status(201).send({
            message: "Thành công !",
            data: inventories
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
        });
    }
}
//Update the API to accept a query for getting only products that have low quantity (less than 100).
const getLowquantity = async (req, res) => {
    try {
        const allProducts = await inventoriesModel.find();
        const lowQuantityProducts = allProducts.filter(product => Number(product.instock) < 100);
        res.json(lowQuantityProducts);
    } catch (error) {
        res.send({ message: error.message })
    }
};
//Create a login API. Generate a token when user get login.
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });

        if (!existingUser) {
            throw new Error('Tên đăng nhập không tồn tại !');
        }
        const matched = await userModel.findOne({ password });
        if (!matched) {
            throw new Error('Password không đúng', 400);
        }

        res.status(200).send({
            message: "Đăng nhập thành công !",
            data: getToken({
                id: existingUser.id
            })
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
        });
    }
};
//Create an API for getting orders with the description of product inside each orders. (1 Points)
const getOrders = async (req, res, next) => {
    try {
        const orders = await ordersModel.find({});
        const inventories = await inventoriesModel.find({});

        const addDescriptionToOrders = async (orders, inventories) => {
            const ordersWithDescription = await Promise.all(orders.map(async (order) => {
                const matchedInventory = inventories.find(item => item.sku === order.item);

                if (matchedInventory) {
                    const orderWithDescription = { ...order.toObject(), description: matchedInventory.description };
                    return orderWithDescription;
                }

                return order;
            }));

            return ordersWithDescription;
        };

        const ordersWithDescription = await addDescriptionToOrders(orders, inventories);

        res.json({
            message: "Thành công",
            data: ordersWithDescription
        });
    } catch (error) {
        next(error);
    }
};





export { getInventories, createinventory, getLowquantity, login, getOrders }