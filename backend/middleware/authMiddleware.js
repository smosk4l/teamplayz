const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Pobranie tokena z nagłówka
      token = req.headers.authorization.split(" ")[1];
      // Weryfikacja tokenu
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobranie użytkownika na podstawie tokenu
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Nieautoryzowany dostęp");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Nieautoryzowany dostęp, brak tokenu!");
  }
});

module.exports = { protect };
