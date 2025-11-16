import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename, dirname, join } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { parseMarkdown } from '@walkthrough-kit/parser';

/**
 * Create a walkthrough JSON file from markdown
 */
export async function createCommand(inputPath: string, options: { ai?: boolean }) {
  const spinner = ora();
  
  try {
    // Step 1: Resolve and validate the input file path
    const absolutePath = resolve(inputPath);
    
    if (!existsSync(absolutePath)) {
      console.error(chalk.red(`✗ File not found: ${inputPath}`));
      process.exit(1);
    }
    
    spinner.start(`Reading ${chalk.cyan(basename(inputPath))}...`);
    
    // Step 2: Read the markdown file
    const markdown = readFileSync(absolutePath, 'utf-8');
    spinner.succeed(`Read ${chalk.cyan(basename(inputPath))}`);
    
    // Step 3: Parse the markdown
    spinner.start('Parsing markdown...');
    const data = await parseMarkdown(markdown);
    spinner.succeed(`Found ${chalk.cyan(data.steps.length)} steps`);
    
    // Step 4: Determine output path
    const outputPath = getOutputPath(inputPath);
    
    // Step 5: Write JSON file
    spinner.start(`Writing ${chalk.cyan(basename(outputPath))}...`);
    const json = JSON.stringify(data, null, 2);
    writeFileSync(outputPath, json, 'utf-8');
    spinner.succeed(`Created ${chalk.cyan(outputPath)}`);
    
    // Step 6: Show success summary
    console.log();
    console.log(chalk.green('✓ Walkthrough created successfully!'));
    console.log();
    console.log(chalk.dim('Usage:'));
    console.log(chalk.dim('  import { Walkthrough } from "@/components/walkthrough";'));
    console.log(chalk.dim(`  import steps from "${outputPath}";`));
    console.log(chalk.dim('  '));
    console.log(chalk.dim('  <Walkthrough steps={steps} />'));
    console.log();
    
  } catch (error) {
    spinner.fail('Failed to create walkthrough');
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

/**
 * Determine output file path
 * Converts: examples/test-guide.md -> examples/test-guide.json
 */
function getOutputPath(inputPath: string): string {
  const dir = dirname(inputPath);
  const name = basename(inputPath, '.md');
  return join(dir, `${name}.json`);
}