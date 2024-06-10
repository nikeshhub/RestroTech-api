import { model } from "mongoose";
import userSchema from "../Schema/user.js";
import menuSchema from "../Schema/menu.js";
import tableSchema from "../Schema/table.js";
import orderSchema from "../Schema/order.js";

export const User = model("User", userSchema);
export const Menu = model("Menu", menuSchema);
export const Table = model("Table", tableSchema);
export const Order = model("Order", orderSchema);
