---
description: Formulate technical implementation plan based on story specifications
argument-hint: [technical preferences and choices]
allowed-tools: Read(//stories/**/specification.md), Read(stories/**/specification.md), Read(//stories/**/creative-plan.md), Read(stories/**/creative-plan.md), Read(//plugins/**), Read(plugins/**), Write(//stories/**/creative-plan.md), Write(stories/**/creative-plan.md), Read(//memory/constitution.md), Read(memory/constitution.md), Bash(find:*), Bash(grep:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/plan-story.sh
  ps: .specify/scripts/powershell/plan-story.ps1
---

User Input: $ARGUMENTS

## Goal

Translate "What to create" (Specification) into "How to create" (Plan). This is the key transformation from requirements to implementation.

## Execution Steps

### 1. Load Prerequisite Documents

Run `{SCRIPT}` to check and load:
- Constitution file: `memory/constitution.md`
- Specification file: `stories/*/specification.md`
- Clarification log (if `/clarify` has been run)

<!-- PLUGIN_HOOK: genre-knowledge-plan -->
<!-- Plugin Enhancement Area: Knowledge Search
     If you installed genre-knowledge plugin, insert knowledge search enhancement prompts here
     Ref: "2.2 Enhance /plan command" in plugins/genre-knowledge/README.md
-->

**🆕 Conditional Load: Golden Opening Rules**:

**Conditions**:
1. Check "Target Word Count" or "Total Chapters" in specification.md
2. Check if currently in opening planning stage
3. Basis:
   - If total word count < 10,000 words, or
   - If planned chapter range includes Chapters 1-3

**If opening condition met, execute the following**:

```bash
# Check if golden opening rules file exists
test -f spec/presets/golden-opening.md && echo "found" || echo "not-found"
```

- ✅ **If exists**: Read `spec/presets/golden-opening.md`
  - Automatically apply five golden rules when planning Chapters 1-3
  - Specially mark first three chapters planning in subsequent "Chapter Architecture Design" section

- ⚠️ **If not exists**: Continue normal planning (does not affect flow)

**🆕 Conditional Load: Pacing Configuration**:

If user used `/book-internalize` command to analyze benchmark work:

```bash
# Check if rhythm configuration file exists
test -f spec/presets/rhythm-config.json && echo "found" || echo "not-found"
```

- ✅ **If exists**: Read `spec/presets/rhythm-config.json`
  - Apply benchmark work's pacing patterns (chapter word count, satisfaction point interval, etc.)
  - Apply content ratio suggestions (dialogue/action/description/inner thought)
  - Cite these data in "2.2 Chapter Architecture Design"

- ⚠️ **If not exists**: Use default pacing planning

**Verify Specification Clarification Status**:
- If there are unclarified key decisions, prompt to run `/clarify` first
- Or accept user's explicit instruction to skip

### 2. Formulate Creative Plan

Create `stories/*/creative-plan.md`, containing the following:

#### 2.1 Writing Method Selection

Based on specification analysis and story genre, select the most suitable writing method:
- **Three-Act Structure**: Suitable for linear narrative, clear beginning, middle, and end
- **Hero's Journey**: Suitable for growth-type, adventure stories
- **Seven-Point Structure**: Suitable for suspense, twist stories
- **Story Circle**: Suitable for character-driven, psychological depth
- **Hybrid Method**: Different methods for main line and sub-lines
- **Genre-Specific Structure**: e.g., "Satisfaction Point Distribution Structure" for page-turners, "Clue Layout Structure" for mystery (refer to genre knowledge base)

Record selection reason and application method.

#### 2.2 Chapter Architecture Design

```markdown
## Chapter Architecture

### Overall Planning
- Total Chapters: [Based on target word count and chapter length]
- Chapter Length: [Based on pacing config or default 2000-3000 words/chapter]
- Volume Arrangement: [If applicable]

**🆕 Pacing Parameters (if rhythm-config.json exists)**:
- Average Chapter Word Count: [Read from config, e.g., 3200 words]
- Small Climax Interval: [Read from config, e.g., 5 chapters]
- Big Climax Interval: [Read from config, e.g., 30 chapters]
- Pacing Style: [Fast/Moderate/Slow]
- Content Ratio: Dialogue[X]% / Action[X]% / Description[X]% / Inner[X]%

### 🌟 Golden Opening Planning (If includes Chapters 1-3)

**Important**: If this planning includes Chapters 1-3, must pay special attention to the following points (based on golden-opening.md):

#### Chapter 1 Planning
- ✅ **Rule 1 - Dynamic Scene Entry**:
  - Prohibit: Static scenes, long environmental descriptions
  - Must: Enter directly from conflict/action/dialogue
  - Specific Design: [Describe Chapter 1 opening mode]

- ✅ **Rule 2 - Core Conflict Front-loading**:
  - Must throw out protagonist core conflict within Chapter 1
  - Specific Design: [Describe how core conflict is presented]

- ✅ **Rule 3 - Avoid Information Bombardment**:
  - Absolutely prohibit large-scale world view introduction at the beginning
  - Adopt "Drip Irrigation" information revelation
  - Specific Design: [List information points revealed in Chapter 1]

- ✅ **Rule 4 - Limit Number of Appearances**:
  - Named characters not exceed 3
  - Specific Design: [List characters appearing in Chapter 1]

#### Chapter 2-3 Planning
- ✅ **Rule 5 - Rapid Golden Finger Display**:
  - Display "Golden Finger" effect within Chapter 2 or 3
  - Specific Design: [Describe Golden Finger display mode]

#### Opening Pacing Requirements
- Chapter 1 Goal: Hook reader, establish expectation
- Chapter 2 Goal: Show ability, reinforce hook
- Chapter 3 Goal: Initial satisfaction point, confirm follow-up reading

### Emotional Curve Design ⭐ (Building Emotional Loop of Reading Experience)

**Core Philosophy**: A good novel is not only a journey of story, but also a **journey of emotion**. The essence of reader follow-up is chasing emotional ups and downs and satisfaction.

**Emotional Type Definition** (Using novel terminology):

| Emotion Type | Definition | Reader Experience | Typical Scene |
|---------|------|---------|---------|
| 😤 **Satisfaction** | Protagonist wins, twists, shows strength | Carefree, relieved, expect next time | Face slapping, counterattack, successful show-off |
| 😭 **Angst** | Protagonist fails, suppressed, frustrated | Worried, aggrieved, expect turnaround | Bullied, failed, lose important person |
| 🤔 **Suspense** | Unknown, question, foreshadowing | Curious, guessing, want to continue | Mysterious figure appears, clue discovered, puzzle left |
| 💧 **Flat** | Daily, transition, paving | Buffer, understand, prepare emotion | Daily life, character interaction, world view display |

**Emotional Design Principles**:
1. ✅ **Suppress before Rising**: Moderate angst paving before satisfaction point makes satisfaction stronger
2. ✅ **Balance Tension**: Avoid continuous angst or continuous satisfaction, maintain rhythm
3. ✅ **Suspense Driven**: Leave suspense at end of each chapter to drive follow-up
4. ✅ **Emotional Progression**: Emotional intensity at climax should be significantly higher than opening

**Chapter Segment Emotional Planning**:

| Chapter Segment | Emotion Type | Intensity | Goal Effect | Key Scene |
|--------|---------|------|---------|---------|
| Ch 1-3 | Angst→Satisfaction→Suspense | Med→High→Med | Opening suppression/rise, establish follow-up desire | [Specific Description] |
| Ch 4-8 | Flat→Angst→Satisfaction | Low→Med→High | First small climax | [Specific Description] |
| Ch 9-15 | Suspense→Angst→Satisfaction | Med→High→High | Second climax, bury foreshadowing | [Specific Description] |
| ... | ... | ... | ... | ... |

**Emotional Intensity Levels**:
- **Low**: Small emotional fluctuation, mainly paving and transition
- **Medium**: Obvious emotional ups and downs, reader has immersion
- **High**: Emotional outbreak point, reader highly involved
- **Very High**: Peak of whole book, decisive climax (usually 1-3 places)

**Emotional Curve Visualization** (Optional, ASCII simple chart):
```
Intensity
Very High |                    ╱╲              ╱╲
High      |         ╱╲        ╱  ╲            ╱  ╲___
Medium    |    ╱╲  ╱  ╲      ╱    ╲___    ___╱
Low       | __╱  ╲╱    ╲____╱         ╲__╱
          └─────────────────────────────────────> Chapter
             3   8   15   25   35   45   55
```

**Emotional Design Self-Checklist**:
- [ ] Does opening 3 chapters have clear emotional hooks?
- [ ] Is there a flat period of more than 5 continuous chapters? (Warning: Easy to drop)
- [ ] Is there enough satisfaction return after angst points?
- [ ] Does each volume/stage have a clear emotional climax?
- [ ] Is the highest emotional point of the whole book in the last 1/3 part?
- [ ] Does chapter end leave suspense to drive next chapter?

**Relationship with Pacing Configuration**:
- If `rhythm-config.json` exists, refer to "Satisfaction Interval" parameter
- Benchmark work's emotional rhythm can be used as reference, but adjust according to own story
- Different genres have different emotional rhythms (Page-turner: High freq satisfaction; Mystery: High freq suspense; Angst: Late high satisfaction)

### Structure Mapping
[Map key nodes to specific chapters based on selected method]

### Clue Distribution Planning

**Important**: Read clue management specifications from specification.md Chapter 5, mark active clues in each volume/chapter segment.

#### Volume 1: [Volume Name](Chapter Range)

| Chapter Segment | Content | Key Events | **Active Clues** | **Intersection** |
|--------|------|---------|-------------|-----------|
| [Ch X-Y] | [Segment Content] | [Key Event List] | PL-01⭐⭐⭐, PL-02⭐⭐ | X-001(Ch X) |
| [Ch X-Y] | [Segment Content] | [Key Event List] | PL-01⭐⭐, PL-03⭐⭐⭐ | None |

**Clue Marking Description**:
- PL-XX: Clue ID, from specification.md Section 5.1
- ⭐⭐⭐ Main Push: This chapter segment focuses on pushing this clue, occupying main space
- ⭐⭐ Auxiliary: Normal push, some space
- ⭐ Background: Occasionally mentioned, maintain presence
- X-XXX: Intersection ID, from specification.md Section 5.3

#### Volume 2: [Volume Name](Chapter Range)

[Repeat above table structure]

### Pacing Design
- Opening Hook: Chapter [X]
- First Climax: Chapter [X]
- Midpoint Twist: Chapter [X]
- Biggest Crisis: Chapter [X]
- Final Climax: Chapter [X]
```

#### 2.3 Character System Design

```markdown
## Character System

### Protagonist Design
- Initial State: [Starting Point]
- Growth Arc: [Change Trajectory]
- Core Conflict: [Internal vs External]
- Key Transformation Point: [Specific Chapter]

### Supporting Role Function
[Function positioning and appearance plan for each important supporting role]

### Relationship Network
[Character relationship map and evolution plan]
```

#### 2.4 World Building

```markdown
## World System

### Core Settings
- World Rules: [Physics/Magic/Tech Rules]
- Social Structure: [Politics/Economy/Culture]
- Historical Background: [Important Historical Events]

### Setting Unfolding Plan
- Layer 1 (Opening): [Basic Settings]
- Layer 2 (Development): [Deep Settings]
- Layer 3 (Climax): [Core Secret]
```

#### 2.5 Plot Technology Design

```markdown
## Plot Technology

### Conflict Escalation Path
1. Primary Conflict: [Personal Level]
2. Intermediate Conflict: [Group Level]
3. Advanced Conflict: [World Level]

### Suspense Setup
- Main Suspense: [Running through whole text]
- Chapter Suspense: [Hook for each chapter]
- Sub-line Suspense: [Rich layers]

### Foreshadowing Layout
[Foreshadowing list and recovery plan]
```

#### 2.6 Narrative Technology Selection

```markdown
## Narrative Technology

### POV Design
- Perspective Type: [First/Third Person]
- Perspective Limitation: [Omniscient/Limited]
- Multi-perspective Arrangement: [If applicable]

### Timeline Design
- Main Line Time: [Linear/Non-linear]
- Flashback Interweaving: [Usage Strategy]
- Parallel Narrative: [If applicable]

### Narrative Pacing
- Fast Paced Segments: [Action/Conflict]
- Slow Paced Segments: [Emotion/Description]
- Pacing Change: [Tension Regulation]
```

### 3. Technical Decision Record

Record all important technical decisions:
- **Decision**: What was chosen
- **Reason**: Why it was chosen
- **Risk**: Possible issues
- **Backup**: Alternative plan

### 4. Quality Assurance Plan

```markdown
## Quality Assurance

### Self-Checklist
- [ ] Logic consistency checkpoints
- [ ] Character behavior reasonableness
- [ ] World view self-consistency
- [ ] Pacing fluency

### Verification Nodes
- Every 5 chapters: Small cycle verification
- Every volume: Large cycle verification
- Draft completion: Comprehensive verification
```

### 5. Risk Management

Identify and formulate response strategies:
- **Creative Risk**: Inspiration, logic, pacing
- **Technical Risk**: Complexity, consistency
- **Time Risk**: Progress, quality balance

### 6. Output and Verification

- Save plan to `stories/*/creative-plan.md`
- Verify plan complies with Constitution principles
- Verify plan meets Specification requirements
- Prompt next step: Run `/tasks` to generate tasks

## Relationship with Other Commands

- **Input**: Specification from `/specify` + Clarification from `/clarify`
- **Output**: Provide task generation basis for `/tasks`
- **Verification**: Used by `/analyze` to check implementation compliance

## Notes

### 🌟 Application of Golden Opening Rules (Important)

**When to Apply**:
- Automatically triggered when planning includes Chapters 1-3
- Or short works with total word count < 10,000 words

**Why Important**:
- First three chapters determine 80% of reader retention rate
- Opening is key window for readers to decide whether to follow
- Golden Opening Rules verified by large number of hit works

**How to Apply**:
1. Create independent "Golden Opening Planning" section in "Chapter Architecture Design"
2. Check one by one if five major rules are reflected in first three chapters
3. Specifically design how each chapter meets rule requirements
4. If specification conflicts with rules, prioritize rules (or consciously violate)

**Common Mistakes**:
- ❌ Chapter 1 describes world view settings in large paragraphs
- ❌ Protagonist only has daily life in Chapter 1, no conflict
- ❌ Too many characters appearing in Chapter 1 (>3 people)
- ❌ Golden Finger/Core Ability delayed until after Chapter 5 to show

### 🎵 Application of Pacing Configuration

**If used `/book-internalize`**:
- System automatically reads `spec/presets/rhythm-config.json`
- Apply benchmark work's pacing parameters (chapter word count, satisfaction interval, etc.)
- Apply content ratio (dialogue/action/description/inner thought)

**Parameter Priority**:
1. **User Immediate Instruction** (Highest)
2. **rhythm-config.json** (Benchmark work pacing)
3. **Genre Knowledge Base** (Genre general pacing)
4. **Default Value** (2000-3000 words/chapter)

**Suggestions**:
- Benchmark work's pacing parameters are for reference only
- Adjust moderately according to own creative habits
- Do not apply mechanically, maintain flexibility

### Technology Serves Story
- All technical choices must serve story expression
- Do not use technique for technique's sake
- Keep plan flexible

### Executability
- Plan must be specifically executable
- Avoid being too idealistic
- Consider actual creative ability

### Iterative Optimization
- Plan can be adjusted based on practice
- Record adjustment reasons and impact
- Maintain version tracking

Remember: **A good plan is half the success, but be ready to adjust at any time. Golden Opening is a hard rule, other planning can be flexible.**
