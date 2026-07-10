import fs from "node:fs";
import { parseAidLetterFromPdfBuffer } from "./aid-letter-parser.mjs";
const filePath = process.argv[2];
const buffer = fs.readFileSync(filePath);
console.log(JSON.stringify(parseAidLetterFromPdfBuffer(buffer), null, 2));
