import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // console.log(token);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Not Authorized Login Again..!!",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (
      token_decode.email !== process.env.ADMIN_EMAIL &&
      token_decode.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(500).json({
        success: false,
        message: "Not Authorized Login Again..!!",
      });
    }
    req.admin = token_decode;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default adminAuth;
