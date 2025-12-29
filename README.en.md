# Novel Writer Skills - A Dedicated Novel Writing Tool for Claude Code

[![npm version](https://badge.fury.io/js/novel-writer-skills.svg)](https://www.npmjs.com/package/novel-writer-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 An AI-powered intelligent novel writing assistant designed specifically for Claude Code
>
> Deeply integrates Slash Commands and Agent Skills to provide the optimal writing experience

## ✨ Core Features

- 📚 **Slash Commands** - Claude Code slash commands with full support for the seven-step methodology
- 🤖 **Agent Skills** - AI-activated knowledge bases and intelligent checking systems
- 🎯 **Genre Knowledge Base** - Automatically provides writing conventions for genres like romance, mystery, and fantasy
- 🔍 **Intelligent Quality Checks** - Automatically monitors issues like consistency, pacing, and perspective
- 📝 **Writing Technique Enhancement** - Professional techniques for dialogue, scenes, and characters are applied automatically
- 🔌 **Plugin System** - Extendable functionality, such as authentic voice, translation, etc.

## 🚀 Quick Start

### 1. Installation

```bash
npm install -g novel-writer-skills
```

### 2. Initialize a Project

```bash
# Basic usage
novelwrite init my-novel

# Initialize in the current directory
novelwrite init --here

# Pre-install plugins
novelwrite init my-novel --plugins authentic-voice
```

### 3. Start Writing in Claude Code

Open the project in Claude Code and use the slash commands:

```text
/constitution    # 1. Create a writing constitution
/specify         # 2. Define the story specifications
/clarify         # 3. Clarify key decisions
/plan            # 4. Develop a creation plan
/tasks           # 5. Break down the task list
/write           # 6. AI-assisted writing
/analyze         # 7. Quality validation analysis
```

## 🎨 Agent Skills Auto-Activation

### Genre Knowledge

When you mention a specific genre, the corresponding knowledge base is automatically activated:

- 💕 **Romance** - Romance novel conventions and emotional pacing
- 🔍 **Mystery** - Mystery and suspense techniques and clue management
- 🐉 **Fantasy** - Fantasy setting standards and world-building

### Writing Techniques

Best practices are automatically applied during the writing process:

- 💬 **Dialogue** - Naturalness of dialogue and character voice
- 🎬 **Scene Structure** - Scene construction and pacing control
- 👤 **Character Arc** - Character arcs and logical development

### Intelligent Checks (Quality Assurance)

Monitors automatically in the background and proactively alerts you to issues:

- ✅ **Consistency Checker** - Consistency checks (characters, world-building, timeline)
- 🧭 **Workflow Guide** - Guides you through the seven-step methodology

## 📚 Slash Commands

### Seven-Step Methodology

| Command | Function | Output |
|------|------|------|
| `/constitution` | Create a writing constitution | `.specify/memory/constitution.md` |
| `/specify` | Define the story specifications | `stories/[name]/specification.md` |
| `/clarify` | Clarify ambiguities (5 questions) | Updates specification.md |
| `/plan` | Develop a creation plan | `stories/[name]/creative-plan.md` |
| `/tasks` | Break down the task list | `stories/[name]/tasks.md` |
| `/write` | Execute chapter writing | `stories/[name]/content/chapter-XX.md` |
| `/analyze` | Quality validation analysis | Analysis report (dual mode: framework/content) |

### Tracking and Validation

| Command | Function |
|------|------|
| `/track-init` | Initialize the tracking system |
| `/track` | Comprehensive tracking update |
| `/plot-check` | Plot consistency check |
| `/timeline` | Timeline management |
| `/relations` | Character relationship tracking |
| `/world-check` | World-building validation |

## 🔌 Plugin System

### Install a Plugin

```bash
# List available plugins
novelwrite plugin:list

# Install a plugin
novelwrite plugin:add authentic-voice

# Remove a plugin
novelwrite plugin:remove authentic-voice
```

### Official Plugins

- **authentic-voice** - A writing plugin for a more authentic voice, enhancing originality and a sense of realism
- More plugins are in development...

## 📖 Project Structure

```text
my-novel/
├── .claude/
│   ├── commands/       # Slash Commands
│   └── skills/         # Agent Skills
│
├── .specify/           # Spec Kit Configuration
│   ├── memory/
│   │   └── constitution.md
│   └── templates/
│       ├── scripts/    # Command-line script tools
│       │   ├── bash/
│       │   └── powershell/
│       ├── commands/
│       ├── knowledge/
│       └── ...
│
├── stories/
│   └── 001-my-story/
│       ├── specification.md
│       ├── creative-plan.md
│       ├── tasks.md
│       └── content/
│           ├── chapter-01.md
│           └── ...
│
├── spec/
│   ├── tracking/       # Tracking data
│   │   ├── plot-tracker.json
│   │   ├── timeline.json
│   │   ├── character-state.json
│   │   └── relationships.json
│   │
│   └── knowledge/      # Knowledge base
│       ├── characters/
│       ├── worldbuilding/
│       └── references/
│
└── README.md
```

## 🆚 Comparison with novel-writer

| Feature | novel-writer | novel-writer-skills |
|------|-------------|-------------------|
| **Supported Platforms** | 13 AI tools (Claude, Cursor, Gemini, etc.) | Claude Code only |
| **Core Methodology** | ✅ Seven-Step Methodology | ✅ Seven-Step Methodology |
| **Slash Commands** | ✅ Cross-platform commands | ✅ Claude-optimized commands |
| **Agent Skills** | ❌ Not supported | ✅ Deeply integrated |
| **Intelligent Checks** | ⚠️ Manual execution | ✅ Automatic monitoring |
| **Genre Knowledge Base** | ⚠️ Manual reference needed | ✅ Automatic activation |
| **Use Case** | Need for cross-platform support | For the best experience (Claude Code) |

**Recommendation:**

- If you use multiple AI tools → Choose **novel-writer**
- If you focus on Claude Code → Choose **novel-writer-skills**

## 🛠️ CLI Commands

### Project Management

```bash
# Initialize a project
novelwrite init <project-name>

# Check the environment
novelwrite check

# Upgrade the project
novelwrite upgrade
```

### Plugin Management

```bash
# List installed plugins
novelwrite plugin:list

# Install a plugin
novelwrite plugin:add <plugin-name>

# Remove a plugin
novelwrite plugin:remove <plugin-name>
```

## 🔧 Command-Line Scripts (Optional)

In addition to Slash Commands in Claude Code, the project also includes command-line script tools:

### Script Location

After initializing a project, the scripts are located in: `.specify/templates/scripts/`

```text
.specify/templates/scripts/
├── bash/          # macOS/Linux scripts
└── powershell/    # Windows scripts
```

### Use Cases

- ✅ **Command-Line Alternative** - Execute the seven-step methodology directly in the terminal
- ✅ **Automated Workflows** - Integrate into CI/CD or batch scripts
- ✅ **Batch Operations** - Process multiple stories or perform batch checks
- ✅ **Standalone Use** - For scenarios without dependency on Claude Code

### Quick Examples

**macOS/Linux:**

```bash
# Create a constitution
bash .specify/templates/scripts/bash/constitution.sh

# Define specifications
bash .specify/templates/scripts/bash/specify-story.sh

# Track progress
bash .specify/templates/scripts/bash/track-progress.sh
```

**Windows:**

```powershell
# Create a constitution
.\.specify\templates\scripts\powershell\constitution.ps1

# Define specifications
.\.specify\templates\scripts\powershell\specify-story.ps1

# Track progress
.\.specify\templates\scripts\powershell\track-progress.ps1
```

### Available Scripts

All Slash Commands have a corresponding script version:

| Script | Function | Corresponding Command |
|-----|------|---------|
| `constitution` | Create a writing constitution | `/constitution` |
| `specify-story` | Define story specifications | `/specify` |
| `plan-story` | Develop a creation plan | `/plan` |
| `track-progress` | Track progress | `/track` |
| `check-consistency` | Consistency check | - |
| And more... | See `.specify/templates/scripts/README.md` | - |

📖 **Detailed Documentation**: [scripts/README.md](templates/scripts/README.md)

### When to Use Scripts vs. Slash Commands

| Scenario | Recommended Method |
|-----|---------|
| Daily writing, need AI assistance | ✅ Slash Commands (preferred) |
| Batch processing, automation | ✅ Command-line scripts |
| CI/CD integration | ✅ Command-line scripts |
| Quick checks and validation | ✅ Command-line scripts |

## 📚 Documentation

- [Getting Started Guide](docs/getting-started.md) - Detailed installation and usage tutorial
- [Command Reference](docs/commands.md) - Complete documentation for all commands
- [Skills Guide](docs/skills-guide.md) - How Agent Skills work
- [Scripting Tools](templates/scripts/README.md) - Guide to using command-line scripts
- [Plugin Development](docs/plugin-development.md) - How to develop your own plugins

## 🤝 Contributing

Issues and Pull Requests are welcome!

Project repository: [https://github.com/wordflowlab/novel-writer-skills](https://github.com/wordflowlab/novel-writer-skills)

## 📄 License

MIT License

## 🙏 Acknowledgments

This project is based on the methodology of [novel-writer](https://github.com/wordflowlab/novel-writer) and is deeply optimized for Claude Code.

---

**Novel Writer Skills** - Let Claude Code be your best writing partner! ✨📚
