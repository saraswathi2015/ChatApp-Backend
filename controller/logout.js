const logout = async (req, res) => {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res.cookie("token", "", cookieOptions).status(200).json({
      success: true,
      message: "session out",
    });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

export { logout };
