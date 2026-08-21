const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
  quality: {
    type: String,
    required: true
  },

  material: {
    type: String,
    required: true
  },

  finish: {
    type: String,
    required: true
  },

  pricePerSqFt: {
    type: Number,
    required: true
  },

  durability: {
    type: String
  }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    suitableStyles: [
      {
        type: String
      }
    ],

    variants: [productVariantSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);