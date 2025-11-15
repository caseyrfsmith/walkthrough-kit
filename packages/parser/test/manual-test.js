import { readFileSync } from 'fs';
import { parseMarkdown } from '../dist/markdown-parser.js';

async function test() {
  console.log('🧪 Testing markdown parser...\n');
  
  // Read the test file
  const markdown = readFileSync('../../examples/basic-guide.md', 'utf-8');
  
  // Parse it
  const result = await parseMarkdown(markdown);
  
  // Pretty print the result
  console.log(JSON.stringify(result, null, 2));
  
  console.log('\n✅ Parsing complete!');
  console.log(`\nFound ${result.steps.length} steps:`);
  result.steps.forEach(step => {
    const hasCode = step.code ? '📝' : '📄';
    console.log(`  ${hasCode} Step ${step.number}: ${step.title}`);
  });
}

test().catch(console.error);