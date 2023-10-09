import path from 'path';
import { fileURLToPath } from 'url';
import fallback from "express-history-api-fallback";
import express from "express";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express();
const root =`${__dirname}/dist`
const PORT = 3000;

app.use(express.static(root));
app.use(fallback("index.html", { root }));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
