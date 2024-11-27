const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  location: { type: String },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
  categories: [
    {
      categoryName: { type: String, required: true },
      items: [
        {
          itemName: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true },
          imageUrl: { type: String },
        },
      ],
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
