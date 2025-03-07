import express from "express";
import { registerController } from "./../controller/registerUser.js";
import { checkEmail } from "../controller/checkEmail.js";
import { checkPassword } from "../controller/checkPassword.js";
import { userDetails } from "../controller/userDetails.js";
import { logout } from "../controller/logout.js";
import { updateUserDetails } from "../controller/updateUserDetails.js";
import { searchUser } from "../controller/searchUser.js";

const router = express.Router();

//create user api
router.post("/register", registerController);

//check user email
router.post("/email", checkEmail);

//check user password
router.post("/password", checkPassword);

//login user details
router.get("/user-details", userDetails);

//logout user
router.get("/logout", logout);

//update user details
router.post("/update-user", updateUserDetails);

//user serach details
router.post("/search-user", searchUser);

export default router;
