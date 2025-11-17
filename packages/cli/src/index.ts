#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createCommand } from './commands/create.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('walkthrough')
  .description('Generate interactive code walkthroughs from markdown')
  .version('0.1.0');

program
  .command('init')
  .description('Generate walkthrough component library')
  .action(async () => {
    console.log(chalk.blue('🎯 Initializing walkthrough-kit...\n'));
    await initCommand(); 
  });

program
  .command('create <input>')
  .description('Generate walkthrough JSON from markdown')
  .option('--ai', 'Use AI to extract structure from freeform text')
  .option('--api-key <key>', 'Anthropic API key (or set ANTHROPIC_API_KEY env var)')
  .action(createCommand);

program
  .command('validate <file>')
  .description('Validate walkthrough JSON structure')
  .action(async (file: string) => {
    console.log(chalk.blue(`✅ Validating ${file}...\n`));
    // TODO: Implement validate command
    console.log(chalk.yellow('Coming soon!'));
  });

program.parse();