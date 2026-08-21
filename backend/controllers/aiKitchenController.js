const { GoogleGenAI } = require("@google/genai");
const Product = require("../models/Product");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeKitchen = async (req, res) => {
  try {
    // -----------------------------------------
    // 1. Check uploaded image
    // -----------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Kitchen image is required",
      });
    }

    const { material, quality } = req.body;

    if (!material || !quality) {
      return res.status(400).json({
        success: false,
        message: "Material and quality are required",
      });
    }

    // -----------------------------------------
    // 2. Get selected material from MongoDB
    // -----------------------------------------

    const product = await Product.findOne({
      name: material,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Selected material not found",
      });
    }

    const variant = product.variants.find(
      (item) => item.quality === quality
    );

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Selected quality not found",
      });
    }

    // -----------------------------------------
    // 3. Convert image to base64
    // -----------------------------------------

    const imageBase64 =
      req.file.buffer.toString("base64");

    // -----------------------------------------
    // 4. Gemini analysis prompt
    // -----------------------------------------

    const prompt = `
You are an expert luxury kitchen interior designer
and kitchen space consultant.

Analyze the uploaded photograph of the user's existing
kitchen.

The purpose is NOT to generate or edit an image.

Instead, identify useful areas in the actual kitchen
where a professional kitchen designer could suggest
improvements.

SELECTED MATERIAL:
Material: ${product.name}
Category: ${product.category}
Quality: ${variant.quality}
Finish: ${variant.finish}
Price: ₹${variant.pricePerSqFt}/sq.ft
Durability: ${variant.durability}

IMPORTANT:

Analyze the actual visible kitchen in the uploaded image.

Identify between 3 and 6 important areas.

Each point must refer to a REAL visible area in the image.

Examples:

- overhead cabinet area
- lower cabinet area
- countertop
- sink area
- cooking zone
- unused wall space
- corner storage
- lighting
- backsplash
- tall-unit opportunity
- appliance placement
- workflow problem
- colour/finish opportunity

Do NOT invent areas that are not visible.

For every point provide:

1. x coordinate
2. y coordinate
3. short title
4. useful design suggestion
5. category
6. priority

COORDINATE RULE:

x = horizontal position as percentage from left to right.

0 = extreme left
50 = center
100 = extreme right

y = vertical position as percentage from top to bottom.

0 = top
50 = center
100 = bottom

The coordinate must point to the ACTUAL AREA
being discussed.

For example:

{
  "x": 25,
  "y": 35
}

means approximately 25% from the left and 35%
from the top of the uploaded image.

Keep coordinates between 5 and 95.

IMPORTANT:
Do not place every marker in the center.

Spread the points across the actual visible
kitchen areas.

Also provide an overall kitchen assessment.

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "Short overall assessment of the kitchen.",
  "style": "Detected kitchen style",
  "layout": "Detected kitchen layout",
  "space": "Small / Medium / Large",
  "lighting": "Short lighting assessment",
  "storage": "Short storage assessment",
  "overallScore": 78,

  "points": [
    {
      "id": 1,
      "x": 25,
      "y": 30,
      "title": "Overhead Storage",
      "category": "Storage",
      "priority": "High",
      "suggestion": "Use full-height overhead cabinets to maximize unused vertical space."
    }
  ],

  "recommendation": {
    "style": "Modern Contemporary",
    "layout": "Optimized L-Shape",
    "color": "Warm White",
    "countertop": "Light Quartz",
    "finish": "${variant.finish}",
    "storage": "Full-height overhead and tall-unit storage",
    "lighting": "Warm under-cabinet LED lighting"
  },

  "improvements": [
    "Improvement 1",
    "Improvement 2",
    "Improvement 3"
  ]
}

Do not add markdown.
Do not add explanations outside JSON.
`;

    // -----------------------------------------
    // 5. Send image to Gemini
    // -----------------------------------------

    const response =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: imageBase64,
            },
          },
          {
            text: prompt,
          },
        ],

        config: {
          temperature: 0.3,
        },
      });

    // -----------------------------------------
    // 6. Get Gemini response
    // -----------------------------------------

    let text = response.text || "";

    console.log(
      "Gemini raw response:",
      text
    );

    // Remove markdown fences if Gemini adds them
    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // -----------------------------------------
    // 7. Parse JSON
    // -----------------------------------------

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "Gemini JSON parse error:",
        parseError
      );

      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an invalid analysis format",
        rawResponse: text,
      });
    }

    // -----------------------------------------
    // 8. Validate points
    // -----------------------------------------

    if (
      !analysis.points ||
      !Array.isArray(analysis.points)
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini did not return kitchen analysis points",
      });
    }

    // -----------------------------------------
    // 9. Clean / normalize points
    // -----------------------------------------

    const points = analysis.points.map(
      (point, index) => ({
        id: point.id || index + 1,

        x: Math.min(
          95,
          Math.max(
            5,
            Number(point.x) || 50
          )
        ),

        y: Math.min(
          95,
          Math.max(
            5,
            Number(point.y) || 50
          )
        ),

        title:
          point.title ||
          "Design Opportunity",

        category:
          point.category ||
          "Design",

        priority:
          point.priority ||
          "Medium",

        suggestion:
          point.suggestion ||
          "This area can be improved as part of the kitchen redesign.",
      })
    );

    // -----------------------------------------
    // 10. Final response
    // -----------------------------------------

    return res.status(200).json({
      success: true,

      analysis: {
        summary:
          analysis.summary || "",

        style:
          analysis.style || "Not detected",

        layout:
          analysis.layout || "Not detected",

        space:
          analysis.space || "Not detected",

        lighting:
          analysis.lighting || "Not detected",

        storage:
          analysis.storage || "Not detected",

        overallScore:
          analysis.overallScore || 0,

        points,

        recommendation:
          analysis.recommendation || {},

        improvements:
          analysis.improvements || [],
      },

      selectedMaterial: {
        name: product.name,
        category: product.category,
        quality: variant.quality,
        finish: variant.finish,
        pricePerSqFt:
          variant.pricePerSqFt,
        durability:
          variant.durability,
      },
    });

  } catch (error) {
    console.error(
      "Gemini Kitchen Analysis Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to analyze kitchen",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeKitchen,
};