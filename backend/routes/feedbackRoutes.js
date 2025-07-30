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

// PUT feedback (Update by ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback updated!", data: updatedFeedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE feedback (Delete by ID)
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
