---
description: Clarify ambiguities in the story outline through targeted Q&A, ensuring clear creative direction, supports focus parameter
argument-hint: [keywords or focus area]
allowed-tools: Read(//stories/**), Read(stories/**), Read(//plugins/**), Read(plugins/**), Write(//stories/*/story.md), Write(stories/*/story.md), Bash(ls:*), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
disable-model-invocation: false
scripts:
  sh: .specify/scripts/bash/clarify-story.sh --json --paths-only
  ps: .specify/scripts/powershell/clarify-story.ps1 -Json -PathsOnly
---

Focus Area (Optional): $ARGUMENTS
---

## Goal

Detect and reduce ambiguities or missing decision points in the story outline, collect clarification information through interactive Q&A, and record results in story files.

**Note**: This clarification process should run and complete before `/plan`. If the user explicitly indicates skipping clarification (e.g., exploratory writing), you may proceed, but must warn of increased rework risk downstream.

## Execution Steps

### 1. Initialization Check

Run `{SCRIPT}` to get current story path:
- Parse JSON to get `STORY_PATH` and `STORY_NAME`
- If no story file found, prompt user to run `/story` first to create story outline
- Load story file content for analysis

<!-- PLUGIN_HOOK: genre-knowledge-clarify -->
<!-- Plugin Enhancement Area: Genre Recognition
     If you installed genre-knowledge plugin, insert genre recognition enhancement prompts here
     Ref: "2.1 Enhance /clarify command" in plugins/genre-knowledge/README.md
-->

### 2. Structured Ambiguity Scan

Scan story outline comprehensively, assessing clarity of each category (Clear/Partially Clear/Missing):

**Creative Positioning**
- Target Audience (Age group, gender preference, reading level)
- Work Positioning (Commercial page-turner/Serious literature/Genre fiction)
- Expected Scale (Short 30-50k/Novella 100-200k/Novel 500k+)

**World Building**
- Era Background Precision (Specific year/Dynasty/Fictional degree)
- World Rules (Magic system/Tech level/Social system)
- Geographical Scope (Single city/Multi-country/Continent/Interstellar)

**Character Design**
- Protagonist Growth Curve (Zero to Hero/Genius/Steady)
- Protagonist Personality Tone (Hot-blooded/Calm/Machiavellian/Saintly)
- Supporting Role Positioning (Plot driver/Emotional support/Contrast)
- Antagonist IQ Setting (Dumb villain/Even match/High-dimensional crush)

**Narrative Strategy**
- Perspective Choice (First person/Third person limited/Omniscient)
- Timeline Structure (Linear/Flashback/Multi-line parallel)
- Narrative Pacing (Fast-paced/Slow burn/Balanced tension)

**Core Plot**
- Core Conflict Type (Man vs Man/Nature/Society/Self)
- Main Goal Clarity (Revenge/Growth/Rescue/Exploration)
- Ending Inclination (Happy Ending/Tragedy/Open)

**Style Tone**
- Writing Style (Vernacular fluent/Classical elegant/Humorous/Cold realistic)
- Description Focus (Action scenes/Psychological description/Atmosphere/Dialogue driven)
- Emotional Tone (Inspiring/Depressive dark/Warm healing/Heart-wrenching)

**Creative Constraints**
- Sensitive Content Handling (Violence level/Emotional scale)
- Value Orientation (Positive energy/Realism/Critical)
- Update Plan (Daily/Weekly/Monthly)

Generate candidate questions for each "Partially Clear" or "Missing" category, unless:
- Clarification won't substantially affect creative direction
- Information is better determined during chapter planning stage

### 3. Generate Priority Question Queue

Internally generate up to 5 priority clarification questions, applying constraints:
- Max 5 questions for entire session
- Each question must be answerable via one of:
  * Multiple Choice (2-5 mutually exclusive options)
  * Short Answer (Limit 5 words)
- Only include questions with substantial impact on creative direction
- Ensure balanced category coverage, prioritize high-impact areas
- If >5 categories need clarification, choose top 5 by (Impact × Uncertainty)

### 3.5 Question Design Principles (Conversational Understanding)

Each question should be **like a human writer communicating**, not an engineer filling a form.

**Core Principles**:
- ✅ **State observation first, then ask**: Let author know "why ask this"
- ✅ **Speak human**: Use creator language, not taxonomy terms
- ✅ **Point out impact**: Let author understand what this decision affects
- ❌ **Avoid direct questioning**: Don't just ask "What is your target audience?"

**Contrast Example**:

❌ **Engineering Question** (Avoid):
```
Question 1: What age group is your target audience?
A. 18-25  B. 26-35  C. 36-45
```

✅ **Conversational Question** (Recommended):
```
💬 I noticed your story has campus elements but also workplace content. These two scenes appeal to very different reader groups—
Campus readers like hot-blooded growth, workplace readers focus on power struggles. This directly affects our pacing design and value expression.

So I want to confirm first: **Who do you mainly want to write for?**

| Option | Description |
|------|------|
| A | Student Group (18-25) - Focus on growth and idealism |
| B | Professionals (26-35) - Focus on reality and strategic thinking |
| C | Both (Adjust to dual-line narrative, balancing both) |
| D | Custom (Please input your idea) |
```

**Question Structure Template**:
```markdown
💬 [Observed phenomenon/contradiction]. [What creative decision this affects].

So I want to confirm: **[Core Question]**

[Option Table or Short Answer Hint]
```

### 4. Sequential Q&A Loop

**Display one question at a time**, using conversational format.

Multiple Choice Format (Must include question context):
```markdown
💬 [Question Context: What did you observe? What does this affect?]

So I want to confirm: **[Core Question]**

| Option | Description |
|------|------|
| A | Detailed description of Option A |
| B | Detailed description of Option B |
| C | Detailed description of Option C |
| D | Detailed description of Option D |
| E | Detailed description of Option E (Optional) |
| F | Custom (Please input your idea) |
```

Short Answer Format (Must include question context):
```markdown
💬 [Question Context: What did you observe? What does this affect?]

So I want to confirm: **[Core Question]**

Please answer briefly (within 5 words): _______
```

**Handle User Answer**
- Verify answer validity
- If F (Custom) selected, receive and record user's custom input
- If ambiguous, request quick clarification
- Record answer and proceed to next question

**Stop Conditions**
- All key ambiguities resolved
- User signals completion ("Done", "Enough", "Stop")
- Reached 5 question limit

### 5. Consolidate Clarification Results

Immediately after each accepted answer:

**First Consolidation**
- Create `## Clarification Log` section in story outline (if not exists)
- Add `### Clarification Session [Date]` sub-header

**Record Format**
```markdown
- Q: [Question Content] → A: [User Answer]
```

**Update Related Sections**
Update corresponding parts of story outline based on clarification:
- Creative Positioning → Update Story Overview
- World Building → Update World Settings
- Characters → Update Character Settings
- Narrative Strategy → Add to Creative Instructions
- Style Tone → Add to Style Guide

### 6. Verify and Save

Verify after each update:
- Clarification log completeness
- No remaining ambiguous markers resolved by new answers
- No contradictory statements
- Correct Markdown format

Write updated content back to story file.

### 7. Completion Report

Report includes:
- Number of questions asked and answered
- Updated story file path
- List of touched sections
- Coverage summary table:

| Category | Status |
|------|------|
| Creative Positioning | ✅ Clarified |
| World Building | ✅ Clarified |
| Character Design | ⏸ Delayed to Plan |
| ... | ... |

- Suggested next command (Usually `/plan`)

## Behavioral Rules

- If no meaningful ambiguity found, respond: "No key ambiguities requiring immediate clarification detected."
- If story file missing, guide user to run `/story` first
- Do not exceed 5 questions total limit
- Avoid asking pure technical writing details
- Respect user's early termination signal
- If full coverage reached without questions, output concise coverage summary

## Novel Creation Specific Considerations

- **Genre Adaptation**: Load corresponding knowledge base based on story genre (Page-turner/Mystery/Romance/Serious Lit, etc.), provide targeted questions
- **Reader Orientation**: Different standards and focus for commercial vs literary works
- **Cultural Sensitivity**: Some subjects require careful handling
- **Series Planning**: Whether it's a series affects overall architecture and decisions

Priority Context: {ARGS}
