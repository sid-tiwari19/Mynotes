const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");

//authentication token signature
const JWT_SECRET = "thisisnotasecretmsg";

// ROUTE 1:create a user using post. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid name").isEmail(),
    body("password", "Minium 8 characters required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    var success = false;
    //If there are errors, return bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      // check if email exists
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Email address already registered" });
      }
      //hashing + salt of password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //  generating token based on unique user id of a data
      const data = {
        user: {
          id: user.id,
        },
      };
      // sending token back
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
      // catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 2: Authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    var success = false;
    //If there are errors, return bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // find if email exists
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid credentials!" });
      }
      // check if password matches
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({ success, error: "Invalid credentials!" });
      }
      // send back token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 3: Get logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

// ROUTE 4: Change Password
router.post("/changepass", fetchuser, async (req, res) => {
  try {
    let success = false;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const { oldpassword, newpassword } = req.body;
    if (newpassword.length < 8) {
      return res
        .status(400)
        .json({ success, error: "Passoword must have minimum 8 characters" });
    }
    if (oldpassword === newpassword)
      return res.status(400).json({
        success,
        error: "New password must be different than old password",
      });
    if (!user) {
      return res.status(400).json({ success, error: "Invalid credentials!" });
    }
    // check if password matches
    const passwordCompare = await bcrypt.compare(oldpassword, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Invalid credentials!" });
    }
    const salt = await bcrypt.genSalt(10); // Generate a salt value
    const secPass = await bcrypt.hash(newpassword, salt);
    user.password = secPass;
    await user.save();

    // Password updated successfully
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports = router;
