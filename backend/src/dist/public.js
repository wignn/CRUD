import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../public/uploads')));

// app.get('/', (req, res) => {
//   res.send(`
//     <h1>Hello World!</h1>
//     <img src="006QZngZgy1hidil5067rj31hc0u0ke6 (1).jpg" alt="Image">
//   `);
// });