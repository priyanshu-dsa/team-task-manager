const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/jwt");

const {
  signupSchema,
  loginSchema
} = require("../validators/authValidator");

router.post("/signup", async (req, res) => {
  try {


    const validatedData = signupSchema.safeParse(req.body);

    
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors
      });
    }

  
    const { name, email, password, role } = validatedData.data;

  
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }


    const hashed = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

  
    res.status(201).json({
      msg: "Signup successful",
      user
    });

  } catch (err) {

    res.status(500).json({
      msg: "Signup error",
      error: err.message
    });

  }
});


router.post("/login", async (req, res) => {

  try {

    const validatedData = loginSchema.safeParse(req.body);


    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors
      });
    }

    const { email, password } = validatedData.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        msg: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (err) {

    res.status(500).json({
      msg: "Login error",
      error: err.message
    });

  }
});

module.exports = router;