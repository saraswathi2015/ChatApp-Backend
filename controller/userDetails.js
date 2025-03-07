import { getUserDetailsFromToken } from "../helpers/getUserDetailsFromToken.js";

const userDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsFromToken(token);
    return res.status(200).json({
      success: true,
      message: "User Details",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: error.message });
  }
};

export { userDetails };
