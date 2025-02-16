import "dotenv/config";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import sharp from "sharp";

import assert from "assert";
import { fetchShops } from "../src/components/fashion/data.js";

const OUTPUT_DIR = path.join(process.cwd(), "public/data");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");

// Ensure directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

async function fetchAirtableData() {
  assert(
    !!process.env.AIRTABLE_API_KEY,
    "AIRTABLE_API_KEY is missing"
  );
  const shops = await fetchShops(process.env.AIRTABLE_API_KEY);

  console.log(`Fetched ${shops.length} shops`);

  for (const shop of shops) {
    const { id, picture } = shop;

    // let localImagePath = null;
    if (picture) {
      const imageUrl = picture;
      const imageExt = path.extname(imageUrl).split("?")[0] || ".jpg";
      const imageFilename = `${id}${imageExt}`;
      const localImagePathFull = path.join(IMAGES_DIR, imageFilename);

      try {
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();

        // Minify & save image
        await sharp(Buffer.from(buffer))
          .resize(800) // Resize for optimization
          .toFile(localImagePathFull);

        console.log(`Prepared picture for ${shop.name}`);
      } catch (err) {
        console.error(`Failed to download image for ${shop.name}:`, err);
      }
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "shops.json"),
    JSON.stringify(
      shops.map((s) => ({ ...s, picture: `/data/images/${s.id}.jpg` })),
      null,
      2
    )
  );
  console.log("✅ Data successfully saved!");
}

fetchAirtableData();
