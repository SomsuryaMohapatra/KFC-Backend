const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/createuser",
  [
    body("name","Enter valid Name").notEmpty(),
    body("location","Enter valid location").notEmpty(),
    body("email","Enter valid email").isEmail(),
    body("password","Password must contain minimum 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        User.create({
          name: req.body.name,
          location: req.body.location,
          email: req.body.email,
          password: req.body.password,
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

module.exports = router;
