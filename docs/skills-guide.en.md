# Agent Skills Guide

Agent Skills are a core feature of Novel Writer Skills—they **activate automatically** as you write, with no need for manual invocation.

## How Skills Work

### Automatic Activation

When you are writing in Claude Code, the AI automatically determines which Skills to activate based on the context:

```
You say: "I want to write a romance novel."
     ↓
[Romance Skill is automatically activated]
     ↓
AI's response automatically applies the conventions of romance writing.
```

### Continuous Application

Once activated, Skills remain active throughout the entire conversation:
- They run seamlessly in the background.
- They continuously provide professional advice.
- They proactively alert you when they detect issues.

## Skill Categories

### 1. Genre Knowledge Skills

#### Romance

**Activation Conditions**:
- Mentioning "romance," "love story," or "love."
- The story specifications include romantic elements.

**What it Provides**:
- Emotional beats (first meeting, first kiss, dark moment, grand finale).
- Pacing guide (slow burn vs. fast-paced).
- Common pitfalls (love at first sight, conflict based solely on misunderstandings).
- HEA/HFN (Happily Ever After/Happy For Now) ending requirements.

**When it Applies**:
- `/specify` - Suggests including a relationship arc.
- `/plan` - Maps emotional beats to chapters.
- `/write` - Techniques for dialogue and chemistry.
- `/analyze` - Checks for adherence to romance conventions.

#### Mystery

**Activation Conditions**:
- Mentioning "mystery," "suspense," "detective," or "crime."
- The story involves a mystery and an investigation.

**What it Provides**:
- The fair play rule.
- Strategies for planting clues (in 3 layers).
- How to design red herrings.
- Suspect management.

**When it Applies**:
- `/specify` - Defines the central mystery.
- `/plan` - Maps out a timeline for planting clues.
- `/write` - Ensures clues are visible but not obvious.
- `/analyze` - Verifies the fair play rule.

#### Fantasy

**Activation Conditions**:
- Mentioning "fantasy," "magic," or "world-building."
- The story includes elements of a fictional world.

**What it Provides**:
- Sanderson's Laws of Magic.
- A framework for designing magic systems.
- A world-building checklist.
- Principles for designing races and creatures.

**When it Applies**:
- `/specify` - Defines core world-building elements.
- `/plan` - Ensures the rules of the world are consistent.
- `/write` - Shows the world through action.
- `/analyze` - Checks for consistency in the world's rules.

### 2. Writing Techniques Skills

#### Dialogue Techniques

**Activation Conditions**:
- Writing dialogue scenes.
- Asking questions about character dialogue.

**What it Provides**:
- Showing character through language.
- Subtext is better than direct statements.
- Techniques for interruptions and overlapping speech.
- Avoiding info-dumping.

**When it Applies**:
- `/write` - Automatically optimizes dialogue scenes.
- Provides real-time suggestions for character voice consistency.
- Detects and alerts you to overly direct dialogue.

#### Scene Structure

**Activation Conditions**:
- Planning or writing scenes.
- Asking questions about chapter structure.

**What it Provides**:
- The scene-sequel model.
- The goal-conflict-disaster framework.
- Strategies for managing tension.
- Designing turning points.

**When it Applies**:
- `/plan` - Designs scene sequences.
- `/write` - Guides scene construction.
- Provides scene outline templates.

### 3. Quality Assurance Skills

#### Consistency Checker

**Activation Conditions**:
- Runs **automatically** in the background during the writing process.
- No manual activation needed.

**What it Monitors**:
- Character consistency (physical, personality, knowledge).
- Consistency of the world's rules.
- Logical timeline.

**Alert Format**:

```
⚠️ Consistency Check Alert

Issue: Character trait mismatch
Location: Chapter 5, Paragraph 3
Reference: characters/mary.md, line 15

Current text: "Mary's green eyes..."
Established trait: "Eye color: blue"

Possible solutions:
1. Change the current text to "blue eyes."
2. Update the character profile (if you are changing the setting).
3. Is this a different character?

Would you like me to fix this automatically?
```

**Severity Levels**:
- 🔴 **Critical**: Fix immediately.
- ⚠️ **Warning**: Fix as soon as possible.
- 📝 **Note**: Consider checking.

#### Workflow Guide

**Activation Conditions**:
- The user says, "I want to write a novel."
- When starting a new project.
- When deviating from the recommended workflow.

**What it Provides**:
- Guidance on the seven-step methodology.
- Explanations of step dependencies.
- Best practice recommendations.
- How to handle common issues.

**Gentle Reminders**:

```
I noticed you've jumped straight to writing. The strength of Novel-writer
lies in systematic upfront planning. Would you like to run /constitution
and /specify to build a solid foundation?
```

## Synergy between Skills and Commands

### Complete Workflow Example

```
User: "I want to write a romantic mystery novel."

[Automatically Activated]
✓ Romance Skill
✓ Mystery Skill
✓ Workflow Guide Skill

AI: "Great! Let's use a systematic approach to writing. First, run
/constitution to define your writing principles..."

User executes: /constitution
[Workflow Guide provides guidance]

User executes: /specify
[Romance + Mystery Skills provide genre-specific advice]

User executes: /write
[All activated Skills work together]
- Romance: Emotional beats
- Mystery: Clue planting
- Dialogue Techniques: Dialogue optimization
- Consistency Checker: Background monitoring

[Issue Detected]
⚠️ Consistency Alert: A character suddenly knows information in Chapter 5
that they did not know in Chapter 3.
```

## Skill Configuration

### Adjusting Strictness

You can adjust the strictness of the consistency checker:

```
"Please use a flexible mode for consistency checks,
as this is a fantasy novel where magic can bend reality."
```

**Modes**:
- **Strict Mode**: Flags all contradictions.
- **Flexible Mode**: Allows for "rule of cool" exceptions.
- **Minimal Mode**: Only flags critical contradictions.

### Disabling Specific Checks

If some inconsistencies are intentional:

```
"Please disable timeline checks for the dream sequences—
they are intentionally non-linear."
```

## Testing Skill Activation

Want to know if a Skill is active? Just ask:

```
"Which Skills are currently active?"
```

The AI will tell you the list of currently active Skills.

## Frequently Asked Questions

### Q: Will Skills interfere too much with my writing?

A: No! The design principles of Skills are:
- **Suggest, don't force**: They provide professional advice, but you have the final say.
- **Passive activation**: They don't interrupt your writing flow.
- **Configurable**: You can adjust or disable them.

### Q: Can I manually activate a Skill?

A: You don't need to! Just mention the relevant topic:
- Want to activate the Romance Skill? Say, "This is a romance novel."
- Want to activate the Mystery Skill? Say, "There's a mystery here."

### Q: Will multiple Skills activated at the same time conflict?

A: No! Skills are designed to work together:
- Romance + Mystery = Romantic Mystery
- Fantasy + Romance = Fantasy Romance
- All Skills are aware of each other's presence.

### Q: Will Skills increase response time?

A: Very rarely! Skills are lightweight:
- Most run in the background.
- They only provide advice when relevant.
- They don't affect normal conversation speed.

### Q: How do I know which Skill a suggestion is coming from?

A: You usually don't need to know! But if you're curious:
- Suggestions may mention their source (e.g., "According to romance conventions...").
- You can ask, "Which Skill did this suggestion come from?"

## Difference between Skills and Plugins

| Feature | Agent Skills | Plugins |
|---|---|---|
| **Activation** | AI auto-detects | User installs |
| **Location** | `.claude/skills/` | `plugins/` |
| **Type** | Knowledge base, checking system | Commands, experts, functions |
| **Awareness** | Seamless | Explicit (Slash commands) |
| **Purpose** | Passive assistance | Active functionality |

**In simple terms**:
- Skills = Automatically activated professional knowledge
- Plugins = Manually invoked tools and features

## Developing Custom Skills

Want to create your own Skills? Check out the [Plugin Development Guide](plugin-development.md).

The basic structure of a Skill:

```yaml
---
name: my-custom-skill
description: "Use when [trigger condition] - [function description]"
allowed-tools: Read, Grep
---

# Skill Title

## Quick Reference
[Quick reference]

## Core Principles
[Core principles]

## Integration with Commands
[Integration with commands]
```

## Summary

Agent Skills are your **invisible assistants**:
- ✨ Automatically activated, no manual effort needed
- 🎯 Precisely apply professional knowledge
- 🔍 Proactively identify issues
- 🤝 Work in synergy with commands
- 🎛️ Configurable and adjustable

**You focus on writing, Skills take care of quality!**

---

Want to learn more?
- 📖 [Getting Started Guide](getting-started.md) - Get started quickly
- 📚 [Command Reference](commands.md) - Full documentation for Slash Commands
- 🔌 [Plugin Development](plugin-development.md) - Create custom functionality
