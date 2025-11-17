import { parseWithLLM } from '../dist/llm-parser.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const content = fs.readFileSync(join(__dirname, 'sample-doc.txt'), 'utf-8');
const apiKey = process.env.ANTHROPIC_API_KEY || 'your-api-key-here';

console.log('Testing LLM parser...\n');

parseWithLLM(content, { apiKey })
  .then(data => {
    console.log('Success! Generated walkthrough:\n');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('Error:', err.message);
  });