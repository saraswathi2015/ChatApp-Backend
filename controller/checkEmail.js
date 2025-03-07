import UserModel from "../models/userModel.js";

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await UserModel.findOne({ email }).select("-password"); //in our array object password negilated

    //the email not stored in database .so cannot login
    if (!checkEmail) {
      return res.status(400).json({
        error: true,
        message: "User Not Exists",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Email verified",
      data: checkEmail,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

export { checkEmail };
