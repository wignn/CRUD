import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log(await findImg(path.join(__dirname, "public")));
})();

async function findImg(folderName) {
  let imgFiles = [];

  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      imgFiles = imgFiles.concat(await findImg(path.join(folderName, item.name)));
    } else {
      if (item.name === "dean.js") {
        imgFiles.push(path.join(folderName, item.name));
      }
    }
  }
  return imgFiles;
}
