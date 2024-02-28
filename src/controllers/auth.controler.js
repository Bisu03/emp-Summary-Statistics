import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * @function register
 * @description for user registration.
 * @return {message}
 */
export const register = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(404).json({ message: "Username Already Present" });
    }
    const hash = bcrypt.hashSync(req.body.password, 5);
    await User.create({
      username,
      email,
      password: hash,
    });
    return res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function login
 * @description for user login.
 * @return {message}
 */
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isCorrectPass = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrectPass) {
      return res.status(500).json({ message: "Invalid Crediential" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    const { password, ...info } = user._doc;
    return res.status(201).json({ ...info, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
