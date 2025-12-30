#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { getVersion, getVersionInfo } from './version.js';
import { PluginManager } from './plugins/manager.js';
import { ensureProjectRoot, getProjectInfo } from './utils/project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// Display welcome banner
function displayBanner(): void {
  const banner = `
╔═══════════════════════════════════════╗
║  📚  Novel Writer Skills  📝          ║
║  Novel Writing Tool for Claude Code   ║
╚═══════════════════════════════════════╝
`;
  console.log(chalk.cyan(banner));
  console.log(chalk.gray(`  ${getVersionInfo()}\n`));
}

displayBanner();

program
  .name('novelwrite')
  .description(chalk.cyan('Novel Writer Skills - Novel Writing Tool for Claude Code'))
  .version(getVersion(), '-v, --version', 'Display version number')
  .helpOption('-h, --help', 'Display help information');

// init command - Initialize a novel project
program
  .command('init')
  .argument('[name]', 'Novel project name')
  .option('--here', 'Initialize in the current directory')
  .option('--plugins <names>', 'Pre-install plugins, comma-separated')
  .option('--no-git', 'Skip Git initialization')
  .description('Initialize a new novel project')
  .action(async (name, options) => {
    const spinner = ora('Initializing novel project...').start();

    try {
      // Determine project path
      let projectPath: string;
      if (options.here) {
        projectPath = process.cwd();
        name = path.basename(projectPath);
      } else {
        if (!name) {
          spinner.fail('Please provide a project name or use the --here argument');
          process.exit(1);
        }
        projectPath = path.join(process.cwd(), name);
        if (await fs.pathExists(projectPath)) {
          spinner.fail(`Project directory "${name}" already exists`);
          process.exit(1);
        }
        await fs.ensureDir(projectPath);
      }

      // Create basic project structure
      const baseDirs = [
        '.specify',
        '.specify/memory',
        '.specify/templates',
        '.claude',
        '.claude/commands',
        '.claude/skills',
        'stories',
        'spec',
        'spec/tracking',
        'spec/knowledge'
      ];

      for (const dir of baseDirs) {
        await fs.ensureDir(path.join(projectPath, dir));
      }

      // Create basic configuration file
      const config = {
        name,
        type: 'novel',
        ai: 'claude',
        created: new Date().toISOString(),
        version: getVersion()
      };

      await fs.writeJson(path.join(projectPath, '.specify', 'config.json'), config, { spaces: 2 });

      // Copy template files from novel-writer-skills package
      const packageRoot = path.resolve(__dirname, '..');

      // Copy command files
      const commandsSource = path.join(packageRoot, 'templates', 'commands');
      const commandsDest = path.join(projectPath, '.claude', 'commands');
      if (await fs.pathExists(commandsSource)) {
        await fs.copy(commandsSource, commandsDest);
        spinner.text = 'Slash Commands installed...';
      }

      // Copy Skills files
      const skillsSource = path.join(packageRoot, 'templates', 'skills');
      const skillsDest = path.join(projectPath, '.claude', 'skills');
      if (await fs.pathExists(skillsSource)) {
        await fs.copy(skillsSource, skillsDest);
        spinner.text = 'Agent Skills installed...';
      }

      // Copy template files to .specify/templates
      const fullTemplatesDir = path.join(packageRoot, 'templates');
      if (await fs.pathExists(fullTemplatesDir)) {
        const userTemplatesDir = path.join(projectPath, '.specify', 'templates');
        await fs.copy(fullTemplatesDir, userTemplatesDir, { overwrite: false });
      }

      // Copy memory files
      const memoryDir = path.join(packageRoot, 'templates', 'memory');
      if (await fs.pathExists(memoryDir)) {
        const userMemoryDir = path.join(projectPath, '.specify', 'memory');
        await fs.copy(memoryDir, userMemoryDir);
      }

      // Copy tracking template files
      const trackingTemplatesDir = path.join(packageRoot, 'templates', 'tracking');
      if (await fs.pathExists(trackingTemplatesDir)) {
        const userTrackingDir = path.join(projectPath, 'spec', 'tracking');
        await fs.copy(trackingTemplatesDir, userTrackingDir);
      }

      // Copy knowledge base templates (project specific)
      const knowledgeTemplatesDir = path.join(packageRoot, 'templates', 'knowledge');
      if (await fs.pathExists(knowledgeTemplatesDir)) {
        const userKnowledgeDir = path.join(projectPath, 'spec', 'knowledge');
        await fs.copy(knowledgeTemplatesDir, userKnowledgeDir);
      }

      // Copy general knowledge base system (new in v1.0)
      const knowledgeBaseDir = path.join(packageRoot, 'templates', 'knowledge-base');
      if (await fs.pathExists(knowledgeBaseDir)) {
        const claudeKnowledgeBaseDir = path.join(projectPath, '.claude', 'knowledge-base');
        await fs.copy(knowledgeBaseDir, claudeKnowledgeBaseDir);
        spinner.text = 'Knowledge base system installed...';
      }

      // If --plugins is specified, install plugins
      if (options.plugins) {
        spinner.text = 'Installing plugins...';
        const pluginNames = options.plugins.split(',').map((p: string) => p.trim());
        const pluginManager = new PluginManager(projectPath);

        for (const pluginName of pluginNames) {
          const builtinPluginPath = path.join(packageRoot, 'plugins', pluginName);
          if (await fs.pathExists(builtinPluginPath)) {
            await pluginManager.installPlugin(pluginName, builtinPluginPath);
          } else {
            console.log(chalk.yellow(`\nWarning: Plugin "${pluginName}" not found`));
          }
        }
      }

      // Git initialization
      if (options.git !== false) {
        try {
          execSync('git init', { cwd: projectPath, stdio: 'ignore' });

          const gitignore = `# Temporary files
*.tmp
*.swp
.DS_Store

# Editor configuration
.vscode/
.idea/

# AI cache
.ai-cache/

# Node modules
node_modules/
`;
          await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
          execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
          execSync('git commit -m "Initialize novel project"', { cwd: projectPath, stdio: 'ignore' });
        } catch {
          console.log(chalk.yellow('\nHint: Git initialization failed, but project created successfully'));
        }
      }

      spinner.succeed(chalk.green(`Novel project "${name}" created successfully!`));

      // Show next steps
      console.log('\n' + chalk.cyan('Next steps:'));
      console.log(chalk.gray('─────────────────────────────'));

      if (!options.here) {
        console.log(`  1. ${chalk.white(`cd ${name}`)} - Enter project directory`);
      }

      console.log(`  2. ${chalk.white('Open project in Claude Code')}`);
      console.log(`  3. Use the following slash commands to start writing:`);

      console.log('\n' + chalk.yellow('     📝 Seven-Step Methodology:'));
      console.log(`     ${chalk.cyan('/constitution')} - Create writing constitution, define core principles`);
      console.log(`     ${chalk.cyan('/specify')}      - Define story specifications, clarify what to create`);
      console.log(`     ${chalk.cyan('/clarify')}      - Clarify key decisions, resolve ambiguities`);
      console.log(`     ${chalk.cyan('/plan')}         - Develop technical plan, decide how to create`);
      console.log(`     ${chalk.cyan('/tasks')}        - Breakdown tasks, generate executable list`);
      console.log(`     ${chalk.cyan('/write')}        - AI-assisted chapter writing`);
      console.log(`     ${chalk.cyan('/analyze')}      - Comprehensive validation analysis, ensure quality consistency`);

      console.log('\n' + chalk.yellow('     📊 Tracking Management Commands:'));
      console.log(`     ${chalk.cyan('/track-init')}  - Initialize tracking system`);
      console.log(`     ${chalk.cyan('/track')}       - Comprehensive tracking update`);
      console.log(`     ${chalk.cyan('/plot-check')}  - Check plot consistency`);
      console.log(`     ${chalk.cyan('/timeline')}    - Manage story timeline`);

      console.log('\n' + chalk.gray('Agent Skills will activate automatically, no manual invocation needed'));
      console.log(chalk.dim('Hint: Slash commands are used within Claude Code, not in the terminal'));

    } catch (error) {
      spinner.fail(chalk.red('Project initialization failed'));
      console.error(error);
      process.exit(1);
    }
  });

// check command - Check environment
program
  .command('check')
  .description('Check system environment and Claude Code')
  .action(() => {
    console.log(chalk.cyan('Checking system environment...\n'));

    const checks = [
      { name: 'Node.js', command: 'node --version', installed: false },
      { name: 'Git', command: 'git --version', installed: false }
    ];

    checks.forEach(check => {
      try {
        const version = execSync(check.command, { encoding: 'utf-8' }).trim();
        check.installed = true;
        console.log(chalk.green('✓') + ` ${check.name} is installed (${version})`);
      } catch {
        console.log(chalk.yellow('⚠') + ` ${check.name} is not installed`);
      }
    });

    console.log('\n' + chalk.cyan('Claude Code Detection:'));
    console.log(chalk.gray('Please ensure Claude Code is installed and working correctly'));
    console.log(chalk.gray('Download: https://claude.ai/download'));

    console.log('\n' + chalk.green('Environment check completed!'));
  });

// plugin command - Plugin management
program
  .command('plugin')
  .description('Plugin management (use plugin:list, plugin:add, plugin:remove)')
  .action(() => {
    console.log(chalk.cyan('\n📦 Plugin Management Commands:\n'));
    console.log('  novelwrite plugin:list              - List installed plugins');
    console.log('  novelwrite plugin:add <name>        - Install a plugin');
    console.log('  novelwrite plugin:remove <name>     - Remove a plugin');
    console.log('\n' + chalk.gray('Available Plugins:'));
    console.log('  authentic-voice   - Authentic voice writing plugin');
  });

program
  .command('plugin:list')
  .description('List installed plugins')
  .action(async () => {
    try {
      const projectPath = await ensureProjectRoot();
      const projectInfo = await getProjectInfo(projectPath);

      if (!projectInfo) {
        console.log(chalk.red('❌ Unable to read project info'));
        process.exit(1);
      }

      const pluginManager = new PluginManager(projectPath);
      const plugins = await pluginManager.listPlugins();

      console.log(chalk.cyan('\n📦 Installed Plugins\n'));
      console.log(chalk.gray(`Project: ${path.basename(projectPath)}\n`));

      if (plugins.length === 0) {
        console.log(chalk.yellow('No plugins found'));
        console.log(chalk.gray('\nUse "novel-skills plugin:add <name>" to install a plugin'));
        console.log(chalk.gray('Available plugins: authentic-voice\n'));
        return;
      }

      for (const plugin of plugins) {
        console.log(chalk.yellow(`  ${plugin.name}`) + ` (v${plugin.version})`);
        console.log(chalk.gray(`    ${plugin.description}`));

        if (plugin.commands && plugin.commands.length > 0) {
          console.log(chalk.gray(`    Commands: ${plugin.commands.map(c => `/${c.id}`).join(', ')}`));
        }

        if (plugin.skills && plugin.skills.length > 0) {
          console.log(chalk.gray(`    Skills: ${plugin.skills.map(s => s.id).join(', ')}`));
        }
        console.log('');
      }
    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ Current directory is not a novelwrite project'));
        console.log(chalk.gray('   Please run this command in the project root directory\n'));
        process.exit(1);
      }

      console.error(chalk.red('❌ Failed to list plugins:'), error);
      process.exit(1);
    }
  });

program
  .command('plugin:add <name>')
  .description('Install a plugin')
  .action(async (name) => {
    try {
      const projectPath = await ensureProjectRoot();
      const projectInfo = await getProjectInfo(projectPath);

      if (!projectInfo) {
        console.log(chalk.red('❌ Unable to read project info'));
        process.exit(1);
      }

      console.log(chalk.cyan('\n📦 NovelWrite Plugin Installation\n'));
      console.log(chalk.gray(`Project Version: ${projectInfo.version}\n`));

      const packageRoot = path.resolve(__dirname, '..');
      const builtinPluginPath = path.join(packageRoot, 'plugins', name);

      if (!await fs.pathExists(builtinPluginPath)) {
        console.log(chalk.red(`❌ Plugin ${name} not found\n`));
        console.log(chalk.gray('Available plugins:'));
        console.log(chalk.gray('  - authentic-voice (Authentic Voice Plugin)'));
        process.exit(1);
      }

      const spinner = ora('Installing plugin...').start();
      const pluginManager = new PluginManager(projectPath);

      await pluginManager.installPlugin(name, builtinPluginPath);
      spinner.succeed(chalk.green('Plugin installed successfully!\n'));

    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ Current directory is not a novelwrite project'));
        console.log(chalk.gray('   Please run this command in the project root directory\n'));
        process.exit(1);
      }

      console.log(chalk.red('\n❌ Plugin installation failed'));
      console.error(chalk.gray(error.message || error));
      console.log('');
      process.exit(1);
    }
  });

program
  .command('plugin:remove <name>')
  .description('Remove a plugin')
  .action(async (name) => {
    try {
      const projectPath = await ensureProjectRoot();
      const pluginManager = new PluginManager(projectPath);

      console.log(chalk.cyan('\n📦 NovelWrite Plugin Removal\n'));
      console.log(chalk.gray(`Preparing to remove plugin: ${name}\n`));

      const spinner = ora('Removing plugin...').start();
      await pluginManager.removePlugin(name);
      spinner.succeed(chalk.green('Plugin removed successfully!\n'));
    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ Current directory is not a novelwrite project'));
        console.log(chalk.gray('   Please run this command in the project root directory\n'));
        process.exit(1);
      }

      console.log(chalk.red('\n❌ Plugin removal failed'));
      console.error(chalk.gray(error.message || error));
      console.log('');
      process.exit(1);
    }
  });

// upgrade command - Upgrade existing project
program
  .command('upgrade')
  .option('--commands', 'Update command files')
  .option('--skills', 'Update Skills files')
  .option('--knowledge-base', 'Update knowledge base system')
  .option('--all', 'Update everything')
  .option('-y, --yes', 'Skip confirmation prompt')
  .description('Upgrade existing project to the latest version')
  .action(async (options) => {
    const projectPath = process.cwd();
    const packageRoot = path.resolve(__dirname, '..');

    try {
      const configPath = path.join(projectPath, '.specify', 'config.json');
      if (!await fs.pathExists(configPath)) {
        console.log(chalk.red('❌ Current directory is not a novel-writer-skills project'));
        process.exit(1);
      }

      const config = await fs.readJson(configPath);
      const projectVersion = config.version || 'unknown';

      console.log(chalk.cyan('\n📦 NovelWrite Project Upgrade\n'));
      console.log(chalk.gray(`Current Version: ${projectVersion}`));
      console.log(chalk.gray(`Target Version: ${getVersion()}\n`));

      let updateCommands = options.all || options.commands || false;
      let updateSkills = options.all || options.skills || false;
      let updateKnowledgeBase = options.all || options.knowledgeBase || false;

      if (!updateCommands && !updateSkills && !updateKnowledgeBase) {
        updateCommands = true;
        updateSkills = true;
        updateKnowledgeBase = true;
      }

      if (!options.yes) {
        const inquirer = (await import('inquirer')).default;
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: 'Confirm upgrade?',
            default: true
          }
        ]);

        if (!answers.proceed) {
          console.log(chalk.yellow('\nUpgrade canceled'));
          process.exit(0);
        }
      }

      const spinner = ora('Upgrading project...').start();

      if (updateCommands) {
        spinner.text = 'Updating Slash Commands...';
        const commandsSource = path.join(packageRoot, 'templates', 'commands');
        const commandsDest = path.join(projectPath, '.claude', 'commands');
        if (await fs.pathExists(commandsSource)) {
          await fs.copy(commandsSource, commandsDest, { overwrite: true });
        }
      }

      if (updateSkills) {
        spinner.text = 'Updating Agent Skills...';
        const skillsSource = path.join(packageRoot, 'templates', 'skills');
        const skillsDest = path.join(projectPath, '.claude', 'skills');
        if (await fs.pathExists(skillsSource)) {
          await fs.copy(skillsSource, skillsDest, { overwrite: true });
        }
      }

      if (updateKnowledgeBase) {
        spinner.text = 'Updating knowledge base system...';
        const knowledgeBaseSource = path.join(packageRoot, 'templates', 'knowledge-base');
        const knowledgeBaseDest = path.join(projectPath, '.claude', 'knowledge-base');
        if (await fs.pathExists(knowledgeBaseSource)) {
          await fs.copy(knowledgeBaseSource, knowledgeBaseDest, { overwrite: true });
        }
      }

      config.version = getVersion();
      await fs.writeJson(configPath, config, { spaces: 2 });

      spinner.succeed(chalk.green('Upgrade completed!\n'));

      console.log(chalk.cyan('✨ Upgrade Details:'));
      if (updateCommands) console.log('  • Slash Commands updated');
      if (updateSkills) console.log('  • Agent Skills updated');
      if (updateKnowledgeBase) console.log('  • Knowledge base system updated (including styles/ and requirements/)');
      console.log(`  • Version: ${projectVersion} → ${getVersion()}`);

    } catch (error) {
      console.error(chalk.red('\n❌ Upgrade failed:'), error);
      process.exit(1);
    }
  });

// Custom help information
program.on('--help', () => {
  console.log('');
  console.log(chalk.yellow('Usage Examples:'));
  console.log('');
  console.log('  $ novelwrite init my-story      # Create a new project');
  console.log('  $ novelwrite init --here        # Initialize in current directory');
  console.log('  $ novelwrite check              # Check environment');
  console.log('  $ novelwrite plugin:list        # List plugins');
  console.log('');
  console.log(chalk.gray('More info: https://github.com/wordflowlab/novel-writer-skills'));
});

// Parse command line arguments
program.parse(process.argv);

// If no command provided, display help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
