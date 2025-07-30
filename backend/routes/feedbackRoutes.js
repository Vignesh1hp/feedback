const express = require("express");
const router = express.Router();
const Feedback = require("../model/feedback_model");

// POST feedback
router.post("/", async (req, res) => {
  const {
    name,
    email,
    contact,
    feedbackType,
    rating,
    recommend,
    contactMethods,
    message,
    agreeToTerms,
  } = req.body;

  const errors = [];

  if (!name || name.trim() === "") errors.push("Name is required");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email required");
  if (contact && !/^\d{10}$/.test(contact)) errors.push("Contact must be 10 digits");
  if (!feedbackType) errors.push("Feedback type is required");
  if (!rating || rating < 1) errors.push("Rating must be at least 1");
  if (!recommend) errors.push("Recommendation is required");
  if (message && message.length > 300) errors.push("Message max 300 characters");
  if (!agreeToTerms) errors.push("Must agree to terms");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

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
