const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 350,
  },
  address: {
    type: String,
    required: true,
  },
  contact: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
  timings: {
    start: String,
    end: String,
  },
  image: {
    type: String,
  },
  rating: String,
  type: String, // Veg/Non-Veg
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("restaurant", RestaurantSchema);
