const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Add this line to import jwt
const userModel = require('./models/userModel');
const app = express();
const port = 3000;

// Database connection
mongoose.connect("mongodb://localhost:27017/nutrify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connection successful");
}).catch((err) => {
  console.error("Database connection error:", err);
});

app.use(express.json());

// Endpoint for registering user
app.post("/register", async (req, res) => {
  let user = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    let doc = await userModel.create(user);
    res.status(201).send({ message: "User Registered" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Some Problem" });
  }
});

// Endpoint for login
app.post("/login", async (req, res) => {
  let userCred = req.body;

  try {
    const user = await userModel.findOne({ email: userCred.email });
    if (user !== null) {
      const success = await bcrypt.compare(userCred.password, user.password);
      if (success) {
        jwt.sign({ email: userCred.email }, "nutrifyapp", (err, token) => {
          if (!err) {
            res.send({ message: "Login success", token: token });
          } else {
            res.status(500).send({ message: "Token generation failed" });
          }
        });
      } else {
        res.status(404).send({ message: "Incorrect password" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Some Problem" });
  }
});

// Server setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
