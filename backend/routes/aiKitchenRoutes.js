const express = require("express");
const multer = require("multer");

const {
  analyzeKitchen,
} = require("../controllers/aiKitchenController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed"
        )
      );
    }
  },
});

router.post(
  "/analyze",
  upload.single("image"),
  analyzeKitchen
);

module.exports = router;