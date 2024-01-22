import { Router } from "express";
import { createinventory, getInventories, getLowquantity, getOrders, login } from "../Controllers/auth-controller.js";
import verifyTokenMiddware from "../middleware/auth-middleware.js";

const authRouter = Router()
//inventory
authRouter.post("/postinventory", verifyTokenMiddware, createinventory)
authRouter.get("/getInventory", verifyTokenMiddware, getInventories)
authRouter.get("/lowquantity", verifyTokenMiddware, getLowquantity)
//user
authRouter.post("/login", login)
//order
authRouter.get("/order", verifyTokenMiddware, getOrders)


export default authRouter