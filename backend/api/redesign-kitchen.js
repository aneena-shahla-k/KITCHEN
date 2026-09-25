import OpenAI from "openai";
import multer from "multer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const runUpload = (req, res) =>
  new Promise((resolve, reject) => {
    upload.single("image")(
      req,
      res,
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // ---------------------------------------------
    // RECEIVE IMAGE
    // ---------------------------------------------

    await runUpload(req, res);

    if (!req.file) {
      return res.status(400).json({
        error:
          "Please upload a kitchen image.",
      });
    }

    // ---------------------------------------------
    // RECEIVE PREFERENCES
    // ---------------------------------------------

    let preferences = {};

    try {
      preferences = JSON.parse(
        req.body.preferences || "{}"
      );
    } catch {
      return res.status(400).json({
        error:
          "Invalid kitchen preferences.",
      });
    }

    const {
      style = "Modern",
      color = "White",
      finish = "Matte",
      countertop = "Quartz",
      budget = "₹4–6 Lakhs",
      storage = [],
    } = preferences;

    const storageText =
      Array.isArray(storage) &&
      storage.length
        ? storage.join(", ")
        : "Standard storage";

    // ---------------------------------------------
    // CONVERT IMAGE TO DATA URL
    // ---------------------------------------------

    const base64Image =
      req.file.buffer.toString(
        "base64"
      );

    const mimeType =
      req.file.mimetype ||
      "image/jpeg";

    const imageDataUrl =
      `data:${mimeType};base64,${base64Image}`;

    // ---------------------------------------------
    // AI DESIGN PROMPT
    // ---------------------------------------------

    const prompt = `
You are an expert interior designer specializing
in realistic residential kitchen renovations.

EDIT THE PROVIDED KITCHEN IMAGE.

The goal is to redesign the EXISTING kitchen,
not to create a completely unrelated kitchen.

CUSTOMER REQUIREMENTS:

Kitchen Style:
${style}

Color Palette:
${color}

Cabinet Finish:
${finish}

Countertop:
${countertop}

Estimated Budget:
${budget}

Storage Requirements:
${storageText}

IMPORTANT VISUAL RULES:

1. Preserve the existing room architecture.

2. Preserve the original camera viewpoint.

3. Preserve the existing room proportions.

4. Preserve structural walls.

5. Preserve windows and doors unless they are
   clearly part of the cabinetry being replaced.

6. Keep the kitchen in the same physical space.

7. Do not move walls.

8. Do not create a different room.

9. Do not add unrealistic architectural elements.

10. Keep the redesign practical and buildable.

11. Replace or redesign cabinetry according to
    the selected style.

12. Apply the selected color palette.

13. Apply the selected cabinet finish.

14. Apply the selected countertop material.

15. Include the requested storage features.

16. Make the design appropriate for a modern
    Indian residential kitchen.

17. Use realistic cabinet proportions.

18. Use realistic hardware.

19. Use realistic countertop thickness.

20. Use realistic appliances where appropriate.

21. Use believable lighting.

22. Maintain realistic shadows and reflections.

23. Make the result photorealistic.

24. Do not place any text, labels, prices,
    logos or UI elements inside the image.

25. The budget should influence the level of
    materials and complexity without displaying
    the budget in the image.

26. The final image should look like a professional
    interior-design visualization of the SAME
    kitchen after renovation.

Create one polished final kitchen visualization.
`;

    // ---------------------------------------------
    // GENERATE / EDIT IMAGE
    // ---------------------------------------------

    const result =
      await openai.images.edit({
        model: "gpt-image-2",

        image: imageDataUrl,

        prompt,

        size: "1536x1024",
      });

    // ---------------------------------------------
    // READ GENERATED IMAGE
    // ---------------------------------------------

    const base64Output =
      result?.data?.[0]?.b64_json;

    if (!base64Output) {
      throw new Error(
        "No image was returned by the AI."
      );
    }

    const generatedImage =
      `data:image/png;base64,${base64Output}`;

    // ---------------------------------------------
    // RETURN IMAGE TO FRONTEND
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      image: generatedImage,
    });

  } catch (error) {
    console.error(
      "Kitchen AI generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Failed to generate the kitchen redesign.",
    });
  }
}