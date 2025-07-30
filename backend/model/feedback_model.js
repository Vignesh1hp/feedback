const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email"],
  },
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  feedbackType: {
    type: String,
    required: true,
    enum: ["bugReport", "suggestion", "featureRequest", "other"],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  recommend: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  contactMethods: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "At least one contact method must be selected",
    },
  },
  message: {
    type: String,
    required: true,
    maxlength: 500,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    validate: {
      validator: function (v) {
        return v === true;
      },
      message: "You must agree to the terms",
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
