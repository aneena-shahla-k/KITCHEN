const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Acrylic",
    category: "Surface Finish",
    description:
      "High-gloss acrylic finish for modern premium kitchens.",
    suitableStyles: ["Modern", "Contemporary", "Minimal"],
    variants: [
      {
        quality: "Standard",
        material: "Acrylic",
        finish: "High Gloss",
        pricePerSqFt: 850,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "Acrylic",
        finish: "High Gloss",
        pricePerSqFt: 1200,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "Acrylic",
        finish: "Ultra Gloss",
        pricePerSqFt: 1650,
        durability: "Excellent"
      }
    ]
  },

  {
    name: "Matte Laminate",
    category: "Surface Finish",
    description:
      "Soft matte laminate with a clean, understated appearance.",
    suitableStyles: ["Modern", "Minimal", "Scandinavian"],
    variants: [
      {
        quality: "Standard",
        material: "Laminate",
        finish: "Matte",
        pricePerSqFt: 500,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "Laminate",
        finish: "Super Matte",
        pricePerSqFt: 750,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "Laminate",
        finish: "Anti-Fingerprint Matte",
        pricePerSqFt: 1050,
        durability: "Excellent"
      }
    ]
  },

  {
    name: "Natural Veneer",
    category: "Wood Finish",
    description:
      "Natural wood veneer offering a warm and sophisticated appearance.",
    suitableStyles: ["Contemporary", "Luxury", "Modern"],
    variants: [
      {
        quality: "Standard",
        material: "Natural Veneer",
        finish: "Natural Wood",
        pricePerSqFt: 900,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "Natural Veneer",
        finish: "Premium Wood",
        pricePerSqFt: 1350,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "Natural Veneer",
        finish: "Select Wood Veneer",
        pricePerSqFt: 1900,
        durability: "Excellent"
      }
    ]
  },

  {
    name: "PU Finish",
    category: "Painted Finish",
    description:
      "Premium painted finish with a refined smooth surface.",
    suitableStyles: ["Luxury", "Contemporary", "Modern"],
    variants: [
      {
        quality: "Standard",
        material: "PU Paint",
        finish: "Matt PU",
        pricePerSqFt: 1000,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "PU Paint",
        finish: "Satin PU",
        pricePerSqFt: 1450,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "PU Paint",
        finish: "High Gloss PU",
        pricePerSqFt: 1900,
        durability: "Excellent"
      }
    ]
  },

  {
    name: "High Gloss Laminate",
    category: "Surface Finish",
    description:
      "Reflective laminate finish suitable for contemporary kitchen designs.",
    suitableStyles: ["Modern", "Contemporary"],
    variants: [
      {
        quality: "Standard",
        material: "High Gloss Laminate",
        finish: "Gloss",
        pricePerSqFt: 600,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "High Gloss Laminate",
        finish: "High Gloss",
        pricePerSqFt: 850,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "High Gloss Laminate",
        finish: "Premium Gloss",
        pricePerSqFt: 1100,
        durability: "Excellent"
      }
    ]
  },

  {
    name: "Membrane",
    category: "Surface Finish",
    description:
      "Flexible decorative finish suitable for classic and contemporary kitchens.",
    suitableStyles: ["Classic", "Contemporary", "Traditional"],
    variants: [
      {
        quality: "Standard",
        material: "PVC Membrane",
        finish: "Matte",
        pricePerSqFt: 550,
        durability: "Good"
      },
      {
        quality: "Premium",
        material: "PVC Membrane",
        finish: "Textured",
        pricePerSqFt: 750,
        durability: "Very Good"
      },
      {
        quality: "Luxury",
        material: "Premium Membrane",
        finish: "Designer Texture",
        pricePerSqFt: 950,
        durability: "Excellent"
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  }
};

seedDatabase();