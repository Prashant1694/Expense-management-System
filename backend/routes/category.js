const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Fetch categories
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ categories: user.categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

//Add a new category
router.post("/", async (req, res) => {
  try {
    const { userId, newCategory } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.categories.includes(newCategory)) {
      user.categories.push(newCategory); // Only push a string
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Category added", categories: user.categories });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: "Failed to add category" });
  }
});

module.exports = router;