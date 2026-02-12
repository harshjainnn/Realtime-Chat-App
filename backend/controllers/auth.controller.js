import express from "express";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPw,
    });
    if (newUser) {
      tokenGenerator(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log("Signup Controller Error", err.message);
    res.status(500).json({ message: "Signup Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    tokenGenerator(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Login Controller Error", err.message);
    res.status(500).json({ message: "Login Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (err) {
    console.log("Logout Error", err.message);
    res.status(500).json({ message: "Logout Error" });
  }
};

export const update = async (req, res) => {
  try {
    console.log("Incoming update request body:", req.body);
    console.log("User from req.user:", req.user?._id);

    const profilePicture = req.body.profilePic;
    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error in updating profile pic: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("No Authorised User: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
