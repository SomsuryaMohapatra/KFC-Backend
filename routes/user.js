const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "itachiUchiha_narutoUzumaki_jiraiya$7%2#";

const router = express.Router();

//signup api
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").notEmpty(),
    body("location", "Enter valid location").notEmpty(),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must contain minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      try {
        User.create({
          name: req.body.name,
          location: req.body.location,
          email: req.body.email,
          password: securePassword,
        });
        res.json({ success: true });
      } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Internal Server Error");
      }
    } else {
      return res.status(400).send({ errors: result.array() });
    }
  }
);

//login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await User.findOne({ email });
    if (response) {
      const comparePassword = bcrypt.compare(password, response.password);
      if(comparePassword){
        const payload = {
          user: {
            id: response.id,
          },
        };
        const authToken = jwt.sign(payload, JWT_SECRET_KEY);
        return res.status(200).send({ success: true, Auth_Token: authToken });
      }else{
        return res
        .status(400)
        .json({ error: "Please Login with correct credentials" });
      }
      
    } else {
      return res
        .status(400)
        .json({ error: "Please Login with correct credentials" });
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
