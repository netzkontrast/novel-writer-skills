# Getting Started with Novel Writer Skills

Welcome to **Novel Writer Skills** - the AI novel writing tool designed specifically for Claude Code!

## Quick Start

### 1. Installation

```bash
npm install -g novel-writer-skills
```

### 2. Create Your First Project

```bash
# Create a new project
novelwrite init my-first-novel

# Change to the project directory
cd my-first-novel
```

### 3. Open in Claude Code

Open the project folder in Claude Code, and you will see:

```
my-first-novel/
├── .claude/
│   ├── commands/      # 13 slash commands
│   └── skills/        # 7 Agent Skills
├── .specify/
├── stories/
└── spec/
```

## The Seven-Step Writing Process

### Step 1: Create a Writing Constitution

In Claude Code, type:

```
/constitution
```

This will guide you in defining:
- ✅ Core writing principles
- ✅ Quality standards
- ✅ Style preferences
- ✅ Content guidelines

**Estimated time**: 15-20 minutes

### Step 2: Define Story Specifications

```
/specify
```

Clarify your story:
- 📖 A one-sentence summary
- 👥 Target audience
- ⚔️ Core conflict
- 👤 Main characters
- 🎯 Success criteria

**Estimated time**: 30-45 minutes

### Step 3: Clarify Ambiguities

```
/clarify
```

The AI will help you with 5 key questions to:
- ❓ Identify ambiguities in the specifications
- 💡 Make clear decisions
- 📝 Automatically update the specification document

**Estimated time**: 10-15 minutes

### Step 4: Develop a Creation Plan

```
/plan
```

Design a concrete implementation plan:
- 📚 Chapter structure
- 📈 Pacing distribution
- 🎭 Character arcs
- 🔮 Foreshadowing plan

**Estimated time**: 45-60 minutes

### Step 5: Break Down the Task List

```
/tasks
```

Generate executable tasks:
- ✅ Sorted by priority
- 🔗 Dependencies indicated
- ⏱️ Estimated effort

**Estimated time**: 20-30 minutes

### Step 6: Start Writing

```
/write
```

AI-assisted writing:
- 🤖 Generates content based on specifications and plans
- 🎨 Automatically applies genre knowledge
- 🔍 Background consistency checks
- ⚡ Real-time application of writing techniques

**Suggested pace**: 1-2 chapters at a time, pausing to analyze every 3-5 chapters

### Step 7: Quality Validation

```
/analyze
```

Comprehensive quality check:
- ✅ Constitution compliance
- ✅ Specification fulfillment
- ✅ Content consistency
- ✅ Achievement of quality standards

**Suggested frequency**: Run once every 5 chapters

## Agent Skills Auto-Activation

### No Manual Invocation Needed

As you write, relevant Skills will **activate automatically**:

**Genre Knowledge**:
- Mention "romance" → Romance Skill activates
- Mention "mystery" → Mystery Skill activates
- Mention "fantasy" → Fantasy Skill activates

**Writing Techniques**:
- When writing dialogue → Dialogue Techniques activate
- When writing scenes → Scene Structure activates

**Quality Assurance**:
- During the writing process → Consistency Checker monitors in the background
- Throughout the workflow → Workflow Guide remains active

### Proactive Alerts

Skills will proactively alert you when they detect issues:

```
⚠️ Consistency Check Alert

Issue: Character trait mismatch
Location: Chapter 5, Paragraph 3

Current text: "Mary's green eyes..."
Established trait: "Eye color: blue"

Would you like me to fix this?
```

## Tracking and Validation Commands

### Initialize the Tracking System

```
/track-init
```

For first-time use, creates tracking files.

### Comprehensive Tracking

```
/track
```

Run after completing each chapter to update:
- 📊 Plot tracking
- ⏰ Timeline
- 👥 Character relationships
- 🌍 World-building status

### Specific Checks

```
/plot-check   # Plot consistency
/timeline     # Timeline management
/relations    # Character relationships
/world-check  # World-building validation
```

## Plugin System

### View Installed Plugins

```bash
novelwrite plugin:list
```

### Install a Plugin

```bash
novelwrite plugin:add authentic-voice
```

### Remove a Plugin

```bash
novelwrite plugin:remove authentic-voice
```

### Official Plugins

- **authentic-voice**: A writing plugin for a more authentic voice, enhancing originality.

## Frequently Asked Questions

### Q: Can I skip some steps?

A: Yes, but some commands depend on others:
- `/write` requires `/specify` and `/plan`
- Minimum workflow: `/constitution` → `/specify` → `/write`

### Q: Will Skills interfere with my writing?

A: No! Skills are **passive**:
- They only activate when relevant
- They provide suggestions, not commands
- You always have the final say

### Q: How can I adjust the strictness of the consistency checker?

A: Tell the AI in the chat:
```
"Please use a flexible mode for consistency checks,
as this is a fantasy novel."
```

### Q: I already have an outline. What should I do?

A: Use `/specify` to convert your existing outline into the novelwrite format, then proceed with the subsequent steps.

## Next Steps

### Further Learning

- 📖 [Command Reference](commands.md) - Detailed explanations of all commands
- 🎨 [Skills Guide](skills-guide.md) - How Skills work
- 🔌 [Plugin Development](plugin-development.md) - Create your own plugins

### Example Projects

Check out the example projects in the `examples/` directory to see a complete workflow.

### Community Support

- 💬 GitHub Discussions: https://github.com/wordflowlab/novel-writer-skills/discussions
- 🐛 Bug Reports: https://github.com/wordflowlab/novel-writer-skills/issues
- 📧 Email Support: support@wordflowlab.com

---

**Ready to get started?** Create your first project and begin your novel writing journey!

```bash
novelwrite init my-amazing-novel
cd my-amazing-novel
# Open in Claude Code and type /constitution to begin
```

Happy writing! ✨📚
