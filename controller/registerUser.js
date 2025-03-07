import UserModel from "./../models/userModel.js";
import bcryptjs from "bcryptjs";

const registerController = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ error: true, message: "Already Users Exists" });
    }

    //password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashpassword,
      profile_pic,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
      success: true,
      data: userSave,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: true, message: error });
  }
};

export { registerController };
