import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    console.log("user", user);
    const verifyPassword = await bcryptjs.compare(password, user.password);
    console.log(verifyPassword);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ error: true, message: "Password is Wrong" });
    }

    //change userId to token format
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    //convert normal userId(string) to token format
    const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Login successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

export { checkPassword };
