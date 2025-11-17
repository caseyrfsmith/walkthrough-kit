import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Initialize walkthrough-kit in a project by copying component files
 */
export async function initCommand() {
  // Prompt for directories
  const response = await prompts([
    {
      type: 'text',
      name: 'componentDir',
      message: 'Where should we put the component?',
      initial: 'src/components/walkthrough',
    },
    {
      type: 'text',
      name: 'dataDir',
      message: 'Where should walkthrough data go?',
      initial: 'src/data',
    },
    {
      type: 'confirm',
      name: 'createExample',
      message: 'Create an example walkthrough?',
      initial: true,
    }
  ]);

  if (!response.componentDir || !response.dataDir) {
    console.log(chalk.yellow('\nCancelled.'));
    process.exit(0);
  }

  const spinner = ora();

  try {
    // Resolve paths
    const targetComponentDir = resolve(response.componentDir);
    const targetDataDir = resolve(response.dataDir);

    // Find the component templates source directory
    // We're in packages/cli/dist/commands/init.js
    // We need to go to packages/component-templates/src/
    const sourceDir = resolve(__dirname, '../../../component-templates/src');
    
    if (!existsSync(sourceDir)) {
      throw new Error(`Component templates not found at: ${sourceDir}`);
    }

    // Create target directories
    spinner.start('Creating directories...');
    mkdirSync(targetComponentDir, { recursive: true });
    mkdirSync(targetDataDir, { recursive: true });
    spinner.succeed('Created directories');

    // Copy all files from source to target
    spinner.start('Copying component files...');
    const filesCopied = copyDirectory(sourceDir, targetComponentDir);
    spinner.succeed(`Copied ${chalk.cyan(filesCopied)} files`);

    // Create example walkthrough if requested
    if (response.createExample) {
      spinner.start('Creating example walkthrough...');
      
      const exampleMarkdown = `---
title: Example walkthrough
estimatedTime: 2 minutes
difficulty: beginner
---

## Install the package

Install from your package manager.

\`\`\`bash
npm install example-package
\`\`\`

## Import and use

Import the package in your code.

\`\`\`javascript:1-2
import { Example } from 'example-package';

const result = Example.doSomething();
\`\`\`

## Check the result

The result contains your processed data.

\`\`\`javascript
console.log(result);
\`\`\`
`;

      const examplePath = join(targetDataDir, 'example-walkthrough.md');
      writeFileSync(examplePath, exampleMarkdown, 'utf-8');
      spinner.succeed('Created example walkthrough');
    }

    // Show success message
    console.log();
    console.log(chalk.green('✓ Walkthrough Kit initialized successfully!'));
    console.log();
    console.log(chalk.bold('Component files copied to:'));
    console.log(chalk.cyan(`  ${targetComponentDir}/`));
    console.log();
    
    // Show directory structure
    console.log(chalk.dim('Structure:'));
    console.log(chalk.dim('  ├── Walkthrough.tsx'));
    console.log(chalk.dim('  ├── Walkthrough.css'));
    console.log(chalk.dim('  ├── types.ts'));
    console.log(chalk.dim('  ├── index.ts'));
    console.log(chalk.dim('  ├── hooks/'));
    console.log(chalk.dim('  │   └── useStepNavigation.ts'));
    console.log(chalk.dim('  └── lexer/'));
    console.log(chalk.dim('      ├── index.ts'));
    console.log(chalk.dim('      ├── tokenize.ts'));
    console.log(chalk.dim('      ├── languages.ts'));
    console.log(chalk.dim('      └── theme.ts'));
    console.log();

    if (response.createExample) {
      console.log(chalk.bold('Example walkthrough created:'));
      console.log(chalk.cyan(`  ${targetDataDir}/example-walkthrough.md`));
      console.log();
      console.log(chalk.dim('Generate JSON with:'));
      console.log(chalk.dim(`  walkthrough create ${targetDataDir}/example-walkthrough.md`));
      console.log();
    }

    console.log(chalk.bold('Next steps:'));
    if (!response.createExample) {
      console.log(chalk.dim('  1. Create a markdown file with your walkthrough'));
      console.log(chalk.dim('  2. Run: walkthrough create your-guide.md'));
      console.log(chalk.dim('  3. Import and use the component:'));
    } else {
      console.log(chalk.dim('  1. Generate the example JSON (see command above)'));
      console.log(chalk.dim('  2. Import and use the component:'));
    }
    console.log();
    console.log(chalk.dim(`     import { Walkthrough } from '${response.componentDir}';`));
    console.log(chalk.dim(`     import steps from '${response.dataDir}/example-walkthrough.json';`));
    console.log(chalk.dim('     '));
    console.log(chalk.dim('     <Walkthrough steps={steps} />'));
    console.log();

  } catch (error) {
    spinner.fail('Failed to initialize');
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

/**
 * Recursively copy a directory
 * Returns the number of files copied
 */
function copyDirectory(source: string, target: string): number {
  let fileCount = 0;

  // Create target directory if it doesn't exist
  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  // Read all items in source directory
  const items = readdirSync(source);

  for (const item of items) {
    const sourcePath = join(source, item);
    const targetPath = join(target, item);
    const stats = statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectory
      fileCount += copyDirectory(sourcePath, targetPath);
    } else {
      // Copy file
      copyFileSync(sourcePath, targetPath);
      fileCount++;
    }
  }

  return fileCount;
}