import { getUserDetailsFromToken } from "../helpers/getUserDetailsFromToken.js";
import UserModel from "../models/userModel.js";

const updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);

    const { name, profile_pic } = req.body;

    //update in database
    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInformation = await UserModel.findById(user._id);

    return res.json({
      message: "user update successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

export { updateUserDetails };
