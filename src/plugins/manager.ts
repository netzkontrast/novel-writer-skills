import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../utils/logger.js';

interface PluginConfig {
  name: string;
  version: string;
  description: string;
  type: 'feature' | 'expert' | 'workflow';
  commands?: Array<{
    id: string;
    file: string;
    description: string;
  }>;
  skills?: Array<{
    id: string;
    file: string;
    description: string;
  }>;
  dependencies?: {
    core: string;
  };
  installation?: {
    message?: string;
  };
}

export class PluginManager {
  private pluginsDir: string;
  private commandsDir: string;
  private skillsDir: string;

  constructor(projectRoot: string) {
    this.pluginsDir = path.join(projectRoot, 'plugins');
    this.commandsDir = path.join(projectRoot, '.claude', 'commands');
    this.skillsDir = path.join(projectRoot, '.claude', 'skills');
  }

  /**
   * Scan and load all plugins
   */
  async loadPlugins(): Promise<void> {
    try {
      await fs.ensureDir(this.pluginsDir);
      const plugins = await this.scanPlugins();

      if (plugins.length === 0) {
        logger.info('No plugins found');
        return;
      }

      logger.info(`Found ${plugins.length} plugins`);

      for (const pluginName of plugins) {
        await this.loadPlugin(pluginName);
      }

      logger.success('All plugins loaded');
    } catch (error) {
      logger.error('Failed to load plugins:', error);
    }
  }

  /**
   * Scan plugins directory
   */
  private async scanPlugins(): Promise<string[]> {
    try {
      if (!await fs.pathExists(this.pluginsDir)) {
        return [];
      }

      const entries = await fs.readdir(this.pluginsDir, { withFileTypes: true });
      const plugins = [];

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const configPath = path.join(this.pluginsDir, entry.name, 'config.yaml');
          if (await fs.pathExists(configPath)) {
            plugins.push(entry.name);
          }
        }
      }

      return plugins;
    } catch (error) {
      logger.error('Failed to scan plugins directory:', error);
      return [];
    }
  }

  /**
   * Load a single plugin
   */
  private async loadPlugin(pluginName: string): Promise<void> {
    try {
      logger.info(`Loading plugin: ${pluginName}`);

      const configPath = path.join(this.pluginsDir, pluginName, 'config.yaml');
      const config = await this.loadConfig(configPath);

      if (!config) {
        logger.warn(`Invalid configuration for plugin ${pluginName}`);
        return;
      }

      // Inject commands
      if (config.commands && config.commands.length > 0) {
        await this.injectCommands(pluginName, config.commands);
      }

      // Inject Skills
      if (config.skills && config.skills.length > 0) {
        await this.injectSkills(pluginName, config.skills);
      }

      logger.success(`Plugin ${pluginName} loaded successfully`);

      if (config.installation?.message) {
        console.log(config.installation.message);
      }
    } catch (error) {
      logger.error(`Failed to load plugin ${pluginName}:`, error);
    }
  }

  /**
   * Read plugin configuration
   */
  private async loadConfig(configPath: string): Promise<PluginConfig | null> {
    try {
      const content = await fs.readFile(configPath, 'utf-8');
      const config = yaml.load(content) as PluginConfig;

      if (!config.name || !config.version) {
        return null;
      }

      return config;
    } catch (error) {
      logger.error(`Failed to read configuration file: ${configPath}`, error);
      return null;
    }
  }

  /**
   * Inject plugin commands
   */
  private async injectCommands(
    pluginName: string,
    commands: PluginConfig['commands']
  ): Promise<void> {
    if (!commands) return;

    for (const cmd of commands) {
      try {
        const sourcePath = path.join(this.pluginsDir, pluginName, cmd.file);
        const destPath = path.join(this.commandsDir, `${cmd.id}.md`);

        await fs.ensureDir(this.commandsDir);
        await fs.copy(sourcePath, destPath);
        logger.debug(`Injected command: /${cmd.id}`);
      } catch (error) {
        logger.error(`Failed to inject command ${cmd.id}:`, error);
      }
    }
  }

  /**
   * Inject plugin Skills
   */
  private async injectSkills(
    pluginName: string,
    skills: PluginConfig['skills']
  ): Promise<void> {
    if (!skills) return;

    for (const skill of skills) {
      try {
        const sourcePath = path.join(this.pluginsDir, pluginName, skill.file);
        const destPath = path.join(this.skillsDir, pluginName, path.basename(skill.file));

        await fs.ensureDir(path.dirname(destPath));
        await fs.copy(sourcePath, destPath);
        logger.debug(`Injected Skill: ${skill.id}`);
      } catch (error) {
        logger.error(`Failed to inject Skill ${skill.id}:`, error);
      }
    }
  }

  /**
   * List all installed plugins
   */
  async listPlugins(): Promise<PluginConfig[]> {
    const plugins = await this.scanPlugins();
    const configs: PluginConfig[] = [];

    for (const pluginName of plugins) {
      const configPath = path.join(this.pluginsDir, pluginName, 'config.yaml');
      const config = await this.loadConfig(configPath);
      if (config) {
        configs.push(config);
      }
    }

    return configs;
  }

  /**
   * Install a plugin
   */
  async installPlugin(pluginName: string, source?: string): Promise<void> {
    try {
      logger.info(`Installing plugin: ${pluginName}`);

      if (source) {
        const destPath = path.join(this.pluginsDir, pluginName);
        await fs.copy(source, destPath);
      } else {
        logger.warn('Remote installation not implemented yet');
        return;
      }

      await this.loadPlugin(pluginName);
      logger.success(`Plugin ${pluginName} installed successfully`);
    } catch (error) {
      logger.error(`Failed to install plugin ${pluginName}:`, error);
      throw error;
    }
  }

  /**
   * Remove a plugin
   */
  async removePlugin(pluginName: string): Promise<void> {
    try {
      logger.info(`Removing plugin: ${pluginName}`);

      // Delete plugin directory
      const pluginPath = path.join(this.pluginsDir, pluginName);
      await fs.remove(pluginPath);

      // Delete injected commands
      if (await fs.pathExists(this.commandsDir)) {
        const commandFiles = await fs.readdir(this.commandsDir);
        for (const file of commandFiles) {
          // Simplified handling here; ideally, read plugin config to determine files to delete
          // Skipping for now as we need to know which commands belong to this plugin
        }
      }

      // Delete injected Skills
      const pluginSkillsDir = path.join(this.skillsDir, pluginName);
      if (await fs.pathExists(pluginSkillsDir)) {
        await fs.remove(pluginSkillsDir);
      }

      logger.success(`Plugin ${pluginName} removed successfully`);
    } catch (error) {
      logger.error(`Failed to remove plugin ${pluginName}:`, error);
      throw error;
    }
  }
}
