const express = require("express");
const router = express.Router();
const Feedback = require("../model/feedback_model");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.json(allFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
