import { model } from "mongoose";
import userSchema from "../Schema/user.js";
import menuSchema from "../Schema/menu.js";

export const User = model("User", userSchema);
export const Menu = model("Menu", menuSchema);
