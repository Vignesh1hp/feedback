const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email:{
    type:String,
  },
  contact:{
    type:String,
  },
  feedbackType:{
    type:String,
  },
  rating:{
    type:Number,
  },
  recommend:{
    type:String,
  },
  contactMethods:{
    type:[String],
  },
  message:{
    type:String,
  },
  agreeToTerms:{
    type:Boolean,
  },

});

module.exports = mongoose.model("Feedback",feedbackSchema);
