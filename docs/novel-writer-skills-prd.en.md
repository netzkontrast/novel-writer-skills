# Novel Writer Skills Product Requirements Document

**Version**: v1.0
**Date**: 2025-10-18
**Status**: Draft

---

## 1. Product Positioning

### 1.1 Project Overview

**novel-writer-skills** is an AI novel writing tool designed specifically for **Claude Code**, deeply integrating Claude's Slash Commands and Agent Skills system.

- **Technology Stack**: Exclusive to Claude Code
- **Core Capabilities**: Seven-Step Methodology + Agent Skills intelligent assistance
- **Target Users**: Authors who use Claude Code for novel writing

### 1.2 Relationship with novel-writer

- **novel-writer**: Cross-platform (13 AI tools), foundational methodology
- **novel-writer-skills**: Exclusive to Claude Code, deeply enhanced

**Shared**: Seven-Step Methodology, file structure, tracking system
**Differences**: Removal of cross-platform support, addition of the Agent Skills intelligent system

---

## 2. Core Architecture

### 2.1 Technical Components

| Component | Description |
|---|---|
| **Slash Commands** | Claude Code slash commands, actively invoked by the user |
| **Agent Skills** | AI-activated knowledge bases and checking systems |
| **CLI Tool** | Project initialization and management (`novel-skills` command) |
| **Plugin System** | Extendable functional modules |

### 2.2 Project Structure

```
novel-writer-skills/
├── .claude/
│   ├── commands/              # Slash Commands
│   │   ├── constitution.md
│   │   ├── specify.md
│   │   ├── clarify.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   ├── write.md
│   │   ├── analyze.md
│   │   └── [Tracking commands...]
│   │
│   └── skills/                # Agent Skills
│       ├── genre-knowledge/   # Genre knowledge bases
│       ├── writing-techniques/ # Writing techniques
│       └── quality-assurance/ # Intelligent checks
│
├── src/                       # CLI source code
│   ├── cli.ts
│   ├── init.ts
│   └── utils/
│
├── templates/                 # Project templates
│   ├── project-template/
│   └── plugin-template/
│
├── plugins/                   # Official plugins
│   ├── authentic-voice/
│   ├── translate/
│   └── [Other plugins...]
│
├── docs/                      # Documentation
│   ├── getting-started.md
│   ├── commands.md
│   └── skills-guide.md
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Core Features

### 3.1 Slash Commands (User-Invoked)

#### Seven-Step Methodology Commands

| Command | Function | Output |
|---|---|---|
| `/constitution` | Create a writing constitution | `.specify/memory/constitution.md` |
| `/specify` | Define story specifications | `stories/[name]/specification.md` |
| `/clarify` | Clarify ambiguities (5 questions) | Updates specification.md |
| `/plan` | Develop a creation plan | `stories/[name]/creative-plan.md` |
| `/tasks` | Break down the task list | `stories/[name]/tasks.md` |
| `/write` | Execute chapter writing | `stories/[name]/content/chapter-XX.md` |
| `/analyze` | Quality validation analysis | Analysis report (dual mode: framework/content) |

#### Tracking and Validation Commands

| Command | Function |
|---|---|
| `/track-init` | Initialize the tracking system |
| `/track` | Comprehensive tracking update |
| `/plot-check` | Plot consistency check |
| `/timeline` | Timeline management |
| `/relations` | Character relationship tracking |
| `/world-check` | World-building validation |
| `/checklist` | Quality checklist |

### 3.2 Agent Skills (AI Auto-Activated)

#### Skills Design Principles

- **Passive Activation**: The AI automatically determines activation based on context
- **Seamless**: The user does not need to manually invoke them
- **Continuous Application**: Remain active throughout the conversation

#### Skills Categories

**1. Genre Knowledge Skills**

Automatically provide writing conventions and techniques based on the novel's genre:

- `romance.md` - Romance novel conventions
- `mystery.md` - Mystery and suspense techniques
- `fantasy.md` - Fantasy setting standards
- `sci-fi.md` - Sci-fi world-building
- `thriller.md` - Thriller pacing control

**Trigger Example**: User says, "I want to write a romance novel" → `romance` skill is automatically activated.

**2. Writing Techniques Skills**

Automatically apply best practices in specific writing scenarios:

- `dialogue-techniques.md` - Naturalness of dialogue
- `scene-structure.md` - Scene construction
- `character-arc.md` - Character arcs
- `pacing-control.md` - Pacing management
- `description-depth.md` - Depth of description

**Trigger Example**: When writing a dialogue scene → `dialogue-techniques` is automatically activated.

**3. Quality Assurance Skills**

Automatically monitor and provide alerts during the writing process:

- `consistency-checker.md` - Consistency checks (characters, world-building, timeline)
- `pov-validator.md` - Point of view validation
- `continuity-tracker.md` - Continuity tracking
- `pacing-monitor.md` - Pacing monitoring

**Trigger Example**: A contradiction is detected during writing → an automatic warning is issued.

### 3.3 Synergy between Skills and Commands

```
User: I want to write a romance novel.

[Skills Activated]
✓ romance-novel-conventions (Genre Knowledge)
✓ workflow-guide (Guides through the seven-step methodology)

AI Response:
"Great! Let's use a systematic approach to writing. First, execute /constitution
to define your writing principles, then /specify to clarify the story specifications..."

[During subsequent writing]
✓ Execute /write → dialogue-techniques is automatically activated
✓ Writing process → consistency-checker monitors in the background
✓ Issue detected → proactively alerts the user
```

---

## 4. Technical Specifications

### 4.1 Slash Command Format

```markdown
---
description: A brief one-sentence description of the command
---

# Command Title

## Objective
[What the command aims to achieve]

## Process
[Step-by-step explanation]

## Output
[What files are generated]

## Example
[Usage example]
```

### 4.2 Agent Skill Format

```yaml
---
name: skill-identifier
description: "Use when [trigger condition] - [function description]"
allowed-tools: Read, Grep, Glob
---

# Skill Title

## Quick Reference
[Quick reference table]

## Core Concepts
[Core concepts]

## Best Practices
[Best practices]

## Common Pitfalls
[Common mistakes]
```

**Key points for writing the `description`**:

- Must include a clear trigger condition
- Explain the value it provides
- Example: `"Use when user mentions romance or love story - provides genre conventions and emotional beat planning for romance writing"`

### 4.3 User Project Structure

The project structure after initializing with `novel-skills init [name]`:

```
my-novel/
├── .claude/
│   ├── commands/       # Copied from novel-writer-skills
│   └── skills/         # Copied from novel-writer-skills
│
├── .specify/           # Spec Kit configuration
│   ├── memory/
│   │   └── constitution.md
│   └── scripts/
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

---

## 5. CLI Tool

### 5.1 Core Commands

```bash
# Install
npm install -g novel-writer-skills

# Initialize a project
novelwrite init my-novel

# Add a plugin
novelwrite plugin:add authentic-voice

# List plugins
novelwrite plugin:list

# Upgrade the project
novelwrite upgrade

# Check status
novelwrite check
```

### 5.2 Initialization Process

```bash
novelwrite init my-novel
```

What it does:
1. Creates the project directory structure
2. Copies `.claude/commands/` and `.claude/skills/`
3. Initializes `.specify/` configuration
4. Creates `spec/tracking/` templates
5. Generates README.md

---

## 6. Development Roadmap

### 6.1 MVP (4-6 weeks)

**Goal**: Validate the usability of core features

**Deliverables**:
- ✅ Seven-Step Methodology Commands (7 commands)
- ✅ Tracking and Validation Commands (6 commands)
- ✅ 2-3 Genre Knowledge Skills (romance, mystery, fantasy)
- ✅ 2-3 Writing Techniques Skills (dialogue, scene-structure)
- ✅ 1 Quality Assurance Skill (consistency-checker)
- ✅ Basic CLI tools (init, plugin)
- ✅ Core documentation

**Success Criteria**:
- Commands can correctly execute the seven-step process
- Skills activate in the correct scenarios (activation rate > 80%)
- Positive feedback from 5-10 early users

### 6.2 Phase 2 (6-8 weeks)

**Goal**: Full functionality and a plugin ecosystem

**Deliverables**:
- ✅ Complete Genre Skills (5 genres)
- ✅ Complete Writing Skills (6 techniques)
- ✅ Complete QA Skills (4 checks)
- ✅ A refined plugin system
- ✅ Official plugins (authentic-voice, translate, etc.)
- ✅ Plugin development documentation

**Success Criteria**:
- Skills cover mainstream writing scenarios
- Consistency check accuracy > 85%
- Community starts contributing plugins

### 6.3 Phase 3 (8-10 weeks)

**Goal**: Optimization and promotion

**Deliverables**:
- ✅ Performance optimization (Skills load in < 2 seconds)
- ✅ Advanced Commands (polish-prose, theme-analysis, etc.)
- ✅ Complete example projects
- ✅ Video tutorials
- ✅ Community building

**Success Criteria**:
- 100+ active users
- False positive rate < 10%
- GitHub Stars > 200

---

## 7. Success Metrics

### 7.1 Technical Metrics

| Metric | Goal | Measurement Method |
|---|---|---|
| Skill activation accuracy | > 85% | Pass rate of test cases |
| Consistency check recall rate | > 90% | Capture rate of known errors |
| Command execution success rate | > 95% | Error-free completion rate |
| Loading performance | < 2s | Skill loading time |
| False positive rate | < 10% | Percentage of incorrect alerts |

### 7.2 User Metrics

| Metric | Goal | Measurement Method |
|---|---|---|
| Monthly active users | 100+ | GitHub insights |
| Retention rate (7-day) | > 40% | Statistics on continued usage |
| Full workflow completion rate | > 60% | Percentage of users completing the seven-step methodology |
| User satisfaction | > 4.0/5.0 | Surveys |
| Community contributions | 5+ PRs/month | GitHub contributions |

---

## 8. Risks and Countermeasures

### 8.1 Technical Risks

| Risk | Impact | Countermeasure |
|---|---|---|
| Inaccurate Skill activation | Poor user experience | Carefully write descriptions, test thoroughly |
| High false positive rate | Decreased user trust | Tiered warnings (Critical/Warning/Note) |
| Performance issues | Slow loading, affects usability | Lazy loading, optimize Skill size |

### 8.2 Product Risks

| Risk | Impact | Countermeasure |
|---|---|---|
| Only supports Claude, small user base | Limited growth | Focus on depth over breadth, create the best experience |
| Steep learning curve | High new user churn | Improve documentation, provide examples, guided tutorials |
| Low community engagement | Slow ecosystem growth | Incentive mechanisms, lower the bar for contributions |

---

## 9. Next Actions

### 9.1 Immediate Actions (This Week)

1. **Set up the project framework**
   - Create the `novel-writer-skills` repository
   - Set up the project structure
   - Configure TypeScript and build tools

2. **Implement the basic CLI**
   - `novel-skills init` command
   - Project template files

3. **Write the first Command**
   - `/constitution` command
   - Test its execution in Claude Code

### 9.2 Short-Term Goals (Within 2 Weeks)

1. **Complete the Seven-Step Methodology Commands**
   - Implement all 7 core commands
   - Write the usage documentation

2. **Implement 2-3 basic Skills**
   - romance-novel-conventions
   - dialogue-techniques
   - consistency-checker

3. **Test and Iterate**
   - Invite 5-10 early users
   - Collect feedback and iterate quickly

### 9.3 Mid-Term Goals (4-6 Weeks)

1. **Complete the MVP**
   - All core features implemented
   - Documentation complete
   - Example project

2. **Prepare for Launch**
   - Publish the npm package
   - Make the GitHub repository public
   - Write release notes

---

## Appendix

### A. Reference Resources

- [Anthropic Agent Skills Documentation](https://docs.anthropic.com/en/docs/build-with-claude/agent-skills)
- [Claude Code Slash Commands Specification](https://docs.anthropic.com/en/docs/build-with-claude/slash-commands)
- [novel-writer project](https://github.com/wordflowlab/novel-writer) (for methodology reference)

### B. Glossary

| Term | Description |
|---|---|
| **Slash Commands** | Commands starting with `/` entered by the user in Claude Code |
| **Agent Skills** | AI-activated knowledge bases and capability modules |
| **Seven-Step Methodology** | constitution → specify → clarify → plan → tasks → write → analyze |
| **Specification-Driven Development (SDD)** | A methodology of defining specifications before starting creative work |

---

**Version History**

- v1.0 (2025-10-18): Initial version, defining product positioning and core features
