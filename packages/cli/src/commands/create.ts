import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename, dirname, join } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { parseMarkdown, parseWithLLM, validateWalkthrough } from '@walkthrough-kit/parser';

/**
 * Create a walkthrough JSON file from markdown or freeform text
 */
export async function createCommand(inputPath: string, options: { ai?: boolean; apiKey?: string; output?: string }) {
  const spinner = ora();

  try {
    // Step 1: Resolve and validate the input file path
    const absolutePath = resolve(inputPath);
    if (!existsSync(absolutePath)) {
      console.error(chalk.red(`✗ File not found: ${inputPath}`));
      process.exit(1);
    }

    spinner.start(`Reading ${chalk.cyan(basename(inputPath))}...`);

    // Step 2: Read the file
    const content = readFileSync(absolutePath, 'utf-8');
    spinner.succeed(`Read ${chalk.cyan(basename(inputPath))}`);

    let data;

    if (options.ai) {
      // AI mode
      spinner.start('Using AI to analyze content...');
      
      const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        spinner.fail();
        console.error(chalk.red('\n✗ API key required for AI mode'));
        console.log(chalk.yellow('Set ANTHROPIC_API_KEY environment variable or use --api-key option'));
        process.exit(1);
      }

      data = await parseWithLLM(content, { apiKey });
      spinner.succeed(`AI extracted ${chalk.cyan(data.steps.length)} steps`);
      
    } else {
      // Markdown mode
      spinner.start('Parsing markdown...');
      data = await parseMarkdown(content);
      spinner.succeed(`Found ${chalk.cyan(data.steps.length)} steps`);
    }

    // Step 4: Validate the data
    const validation = validateWalkthrough(data);
    if (validation.warnings.length > 0) {
      console.log();

      // Group warnings by type
      const structureWarnings = validation.warnings.filter(w => w.type === 'structure');
      const compatibilityWarnings = validation.warnings.filter(w => w.type === 'compatibility');
      const qualityWarnings = validation.warnings.filter(w => w.type === 'quality');

      if (structureWarnings.length > 0) {
        console.log(chalk.yellow('⚠️  Structure issues:'));
        structureWarnings.forEach(w => {
          console.log(chalk.yellow(`  • ${w.message}${w.location ? ` (${w.location})` : ''}`));
        });
        console.log();
      }

      if (compatibilityWarnings.length > 0) {
        console.log(chalk.yellow('⚠️  Compatibility warnings:'));
        compatibilityWarnings.forEach(w => {
          console.log(chalk.yellow(`  • ${w.message}${w.location ? ` (${w.location})` : ''}`));
        });
        console.log();
      }

      if (qualityWarnings.length > 0) {
        console.log(chalk.dim('ℹ️  Quality suggestions:'));
        qualityWarnings.forEach(w => {
          console.log(chalk.dim(`  • ${w.message}${w.location ? ` (${w.location})` : ''}`));
        });
        console.log();
      }
    }

    // Step 5: Determine output path
    const outputPath = options.output ? resolve(options.output) : getOutputPath(inputPath);

    // Step 6: Write JSON file
    spinner.start(`Writing ${chalk.cyan(basename(outputPath))}...`);
    const json = JSON.stringify(data, null, 2);
    writeFileSync(outputPath, json, 'utf-8');
    spinner.succeed(`Created ${chalk.cyan(outputPath)}`);

    // Step 7: Show success summary
    console.log();
    console.log(chalk.green('✓ Walkthrough created successfully!'));

    if (options.ai) {
      console.log(chalk.yellow('⚠  AI-generated content - please review carefully!'));
    }

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
  const ext = inputPath.endsWith('.md') ? '.md' : '.txt';
  const name = basename(inputPath, ext);
  return join(dir, `${name}.json`);
}