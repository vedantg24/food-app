const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth");
const config = require("config");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please add an email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    // check('mob_no', 'Please add mobile number'),
    // check('address', 'Please add an address'),
    // check('role', 'Please add a role'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mob_no, address, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
        mob_no,
        address,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users
// @decs    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users/login
// @decs    Login user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "User removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
