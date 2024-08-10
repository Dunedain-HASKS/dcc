import User from "../models/userModel.js";

export async function registerUser(req, res) {
  const { username } = req.body;

  const userExist = await User.findOne({ username });

  if (userExist) {
    res.json(userExist);
    return;
  }

  const newUser = await User.create({
    username,
  });

  if (newUser) {
    res.status(201).json({
      newUser,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}

export async function loginUser(req, res) {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

export async function showUser(req, res) {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}
