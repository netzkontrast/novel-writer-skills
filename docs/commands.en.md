# Command Reference

This document provides a detailed explanation of all Slash Commands in Novel Writer Skills.

## Command Categories

### Seven-Step Methodology Commands

| Command | Function | Output File | Dependencies |
|---|---|---|---|
| `/constitution` | Create a writing constitution | `.specify/memory/constitution.md` | None |
| `/specify` | Define the story specifications | `stories/[name]/specification.md` | `/constitution` |
| `/clarify` | Clarify ambiguities | Updates `specification.md` | `/specify` |
| `/plan` | Develop a creation plan | `stories/[name]/creative-plan.md` | `/specify` |
| `/tasks` | Break down the task list | `stories/[name]/tasks.md` | `/plan` |
| `/write` | Execute chapter writing | `stories/[name]/content/chapter-XX.md` | `/tasks` |
| `/analyze` | Quality validation analysis | Analysis report (in chat) | `/write` |

### Tracking and Validation Commands

| Command | Function | Output File | Frequency |
|---|---|---|---|
| `/track-init` | Initialize the tracking system | `spec/tracking/*.json` | First-time use |
| `/track` | Comprehensive tracking update | Updates `spec/tracking/*.json` | After each chapter |
| `/plot-check` | Plot consistency check | Analysis report | Every 5-10 chapters |
| `/timeline` | Timeline management | `spec/tracking/timeline.json` | After major events |
| `/relations` | Character relationship tracking | `spec/tracking/relationships.json` | When relationships change |
| `/world-check` | World-building validation | Analysis report | After new settings |

## Detailed Explanations

### `/constitution` - Create a Writing Constitution

#### Function

Establishes the core principles and values for the novel, forming a "constitution" for the work.

#### Use Case

- At the start of a project
- When adjusting the creative direction
- When adding new collaborators

#### Output

Generates the `.specify/memory/constitution.md` file, which includes:
- Core values
- Quality standards
- Style principles
- Content guidelines

#### Example

```
/constitution
```

The AI will guide you with questions like:
- "What core message do you want this novel to convey?"
- "What are you absolutely not willing to compromise on?"
- "What is your narrative style?"

#### Best Practices

- Spend 15-20 minutes thinking carefully
- Principles should be specific and verifiable
- Use clear terms like "must" and "must not"
- Regularly review and update (with version control)

---

### `/specify` - Define Story Specifications

#### Function

Defines various aspects of the story, much like a product specification document.

#### Use Case

- When you have a new story idea
- When you need to organize your thoughts
- Before starting formal writing

#### Output

Generates the `stories/[story-name]/specification.md` file, which includes:
- A one-sentence summary
- Target reader profile
- Core selling points
- Main characters
- Success criteria
- Constraints and risks

#### Example

```
/specify
```

The AI will ask:
- "Describe this story in one sentence."
- "Who is the target reader?"
- "What is the core conflict?"
- "What makes this story unique?"

#### Special Tags

Use these tags in the specification document:
- `[Clarification Needed]` - Marks ambiguous points
- `[Core Requirement]` - Non-negotiable requirements
- `[Optional Feature]` - Nice-to-have elements

#### Best Practices

- Write a quick first draft, then refine
- Use the SMART principle for success criteria
- Clearly define what the story "is" and "is not"
- Keep the document concise (3-5 pages is ideal)

---

### `/clarify` - Clarify Ambiguities

#### Function

Eliminates ambiguity in the specifications with 5 precise questions.

#### Use Case

- After completing `/specify`
- When you find the specifications unclear
- When team members have different interpretations

#### Process

1. The AI scans `specification.md`
2. Identifies ambiguous or contradictory points
3. Generates up to 5 key questions
4. Automatically updates the specifications based on your answers
5. Retains a history of decisions

#### Example

```
/clarify
```

Possible questions:
- "Is the protagonist's core motivation revenge or justice?"
- "Is the ending a happy one, or does it have a touch of melancholy?"
- "Is the story's pacing fast and thrilling, or slow and deliberate?"

#### Best Practices

- Answer honestly, not what you think is "correct"
- If you don't know, it's okay to say "Let me think about it"
- Your answers will influence the rest of the writing, so be thoughtful
- You can run it multiple times until everything is clear

---

### `/plan` - Develop a Creation Plan

#### Function

Translates the specifications into a concrete technical plan and chapter structure.

#### Use Case

- After the specifications are clear
- Before starting to write
- When you need to restructure the story

#### Output

Generates the `stories/[story-name]/creative-plan.md` file, which includes:
- Choice of writing methodology (three-act, hero's journey, etc.)
- Chapter structure design
- Character relationship map
- World-building system
- Timeline and causality chain
- Foreshadowing and payoff plan

#### Example

```
/plan
```

The AI will help you:
- Choose a suitable writing method
- Design a chapter outline
- Plan the pacing and tension
- Map out character arcs

#### Best Practices

- The plan should be specific but not overly detailed
- Leave room for inspiration
- Focus on planning the first 1/3 of the story
- Regularly review and adjust the plan

---

### `/tasks` - Break Down the Task List

#### Function

Breaks down the creation plan into executable tasks.

#### Use Case

- After the plan is complete
- When you need a clear execution path
- For multi-person collaboration

#### Output

Generates the `stories/[story-name]/tasks.md` file, which includes:
- Chapter writing tasks
- Character profile completion tasks
- World-building setting tasks
- Revision and polishing tasks

#### Task Tags

- `[P]` - Can be executed in parallel
- `[Depends:X]` - Depends on task X
- `[High-Prio]` - High priority
- `[P0/P1/P2]` - Priority levels

#### Example

```
/tasks
```

Generates something like:
```
[P0] Complete the protagonist's character profile
[P0][Depends:1] Write Chapter 1: The Prologue
[P1] Add world-building details for the geography
[P1][P] Write Chapter 2: The First Encounter
```

#### Best Practices

- Keep task granularity moderate (2-4 hours to complete)
- Specify dependencies to avoid bottlenecks
- Prioritize tasks on the critical path
- Regularly update task statuses

---

### `/write` - Execute Chapter Writing

#### Function

AI-assisted chapter writing based on the task list and plan.

#### Use Case

- When tasks are ready
- During each writing session
- When you need AI to help generate content

#### Output

Generates `stories/[story-name]/content/chapter-XX.md` files.

#### Usage

```
/write

# Or specify a chapter
/write Chapter 5 - The First Encounter

# Or based on a task
/write [P0][Depends:1] Write Chapter 1: The Prologue
```

#### Auto-Activating Skills During Writing

- **Genre Knowledge**: Applies conventions based on the story's genre
- **Dialogue Techniques**: Optimizes dialogue scenes
- **Scene Structure**: Controls the pacing of scenes
- **Consistency Checker**: Runs consistency checks in the background

#### Best Practices

- Write 1-2 chapters at a time
- Refer to the specification and plan
- Let the AI generate a framework, then fill in the details
- Save multiple versions to compare and choose from

---

### `/analyze` - Quality Validation Analysis

#### Function

Comprehensively validates the quality and consistency of the work.

#### Two Modes

1. **Framework Analysis** (before writing)
   - Verifies the completeness of the plan
   - Checks for logical consistency
   - Assesses feasibility

2. **Content Analysis** (after writing)
   - Verifies the quality of execution
   - Checks for consistency
   - Assesses whether standards have been met

#### Use Case

- After finishing the first 3 chapters (early validation)
- Every 5 chapters (regular check-ins)
- After completing the first draft (full review)

#### Validation Dimensions

```
/analyze
```

Checks for:
- ✅ Constitution compliance
- ✅ Specification fulfillment
- ✅ Content consistency
- ✅ Quality standards
- ✅ Pacing and tension
- ✅ Character arcs

#### Best Practices

- Run it early to catch issues sooner
- Don't wait until the entire work is written to analyze
- Adjust the plan based on the analysis results
- Keep a record of areas for improvement

---

## Tracking Command Details

### `/track-init` - Initialize the Tracking System

#### Function

Creates the JSON files required for the tracking system.

#### Use Case

- When using the tracking feature for the first time
- When starting a new story

#### Output

Creates the following in `spec/tracking/`:
- `plot-tracker.json` - Plot tracking
- `timeline.json` - Timeline
- `character-state.json` - Character states
- `relationships.json` - Character relationships

#### Example

```
/track-init
```

#### Best Practices

- Run it before you start writing
- Only needs to be run once
- You can manually edit the JSON files

---

### `/track` - Comprehensive Tracking Update

#### Function

Intelligently updates all tracking data.

#### Use Case

- After completing each chapter
- After a major event occurs
- For regular organization

#### Process

1. The AI reads the latest chapter
2. Extracts key information
3. Updates all tracking files
4. Marks items that need manual confirmation

#### Example

```
/track

# Or specify a range of chapters
/track Chapters 3-5
```

#### Best Practices

- Make it a habit to run this after each chapter
- Check if the AI's updates are accurate
- Manually add any details the AI may have missed

---

## Quick Reference

### Minimum Workflow

```
/constitution → /specify → /write
```

### Standard Workflow

```
/constitution → /specify → /clarify → /plan → /tasks → /write → /analyze
```

### Complete Workflow

```
/constitution → /specify → /clarify → /plan → /tasks →
/track-init → /write → /track → /analyze
```

### Recommended Pace

```
Day 1: /constitution + /specify (2-3h)
Day 2: /clarify + /plan (2-3h)
Day 3: /tasks + start /write (2-3h)
Days 4-10: /write (1-2h per day)
Day 11: /analyze + plan the next batch
```

---

## Command Combination Tips

### Rapid Iteration

```
1. /write Chapters 1-3
2. /analyze for early validation
3. Adjust /plan based on feedback
4. Continue with /write
```

### In-Depth Planning

```
1. /constitution (core principles)
2. /specify (overall specifications)
3. /clarify (eliminate ambiguities)
4. /plan (detailed plan)
5. Repeat /clarify until everything is perfectly clear
6. Start /write
```

### Exploratory Writing

```
1. A simplified /constitution
2. A lightweight /specify
3. Directly /write exploratory chapters
4. Update /specify and /plan based on the results
5. Structured /write
```

---

**Tip**: All commands are used in Claude Code, not in the terminal!

Want to learn more? Check out the [Skills Guide](skills-guide.md) to learn about the auto-activating intelligent assistance system.
