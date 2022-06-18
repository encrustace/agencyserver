import express from "express";
import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserRouter = express.Router();

//Add User
UserRouter.post("/register", async (req, res) => {
  const newUser = new user(req.body);
  const existingUser = await user.findOne({
    email: req.body.email,
  });
  if (!existingUser) {
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await newUser.save(async (err, user) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(user);
      }
    });
  } else {
    res.status(400).send("Email is already taken!");
  }
});

//Update user
UserRouter.put("/update", async (req, res) => {
  const existingUser = await user.findOne({ email: req.body.email });
  if (existingUser) {
    const user = {
      [req.body.field]: req.body.value,
    };
    try {
      var updatedUser = await user.updateOne({}, user);
      res.status(200).send("Updated client successfully", updatedUser);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    res.status(404).send(`user ${req.body.email} does not exist`);
  }
});

//Get all users
UserRouter.get("/all", async (req, res) => {
  user.find().exec(function (err, docs) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

//Delete user
UserRouter.delete("/delete", async (req, res) => {
  let existingUser = await user.findOne({ email: req.body.email });
  if (existingUser) {
    await user.deleteOne({ email: req.body.email });
    res.status(200).send("User deleted with email: " + req.body.email);
  } else {
    res.status(200).send("User does not exist!");
  }
});

//Login
UserRouter.post("/login", async (req, res) => {
  let existingUser = await user.findOne({ email: req.body.email });
  if (existingUser) {
    if (bcrypt.compareSync(req.body.password, existingUser.password)) {
      const accessToken = jwt.sign(
        existingUser.email,
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).send({
        accessToken: accessToken,
      });
    } else {
      res.status(200).send("Wrong credentials!");
    }
  } else {
    res.status(200).send("User does not exist!");
  }
});

export default UserRouter;
