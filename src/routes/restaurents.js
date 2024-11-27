const express = require("express");
const Restaurant = require("../models/restaurants"); // Import your Restaurant model
const router = express.Router();

// POST route to save restaurant data
router.post("/restaurants", async (req, res) => {
  try {
    // Extract restaurant data from request body
    const { name, imageUrl, description, rating, location, contact, categories } = req.body;

    // Create a new Restaurant document
    const newRestaurant = new Restaurant({
      name,
      imageUrl,
      description,
      rating,
      location,
      contact,
      categories,
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Send a success response
    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: savedRestaurant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

module.exports = router;
