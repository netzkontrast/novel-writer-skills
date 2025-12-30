---
name: checklist
description: Generate or execute quality checklist (Specification Validation + Content Scanning)
allowed-tools: Read, Bash, Write, Edit, Glob, Grep
model: claude-sonnet-4-5-20250929
scripts:
  sh: scripts/bash/common.sh
  ps: scripts/powershell/common.ps1
---

# Quality Checklist

Generate or execute quality checklists, supporting two modes:

## 🎯 Supported Check Types

### Type 1: Specification Quality Check (Question Generation)
Verify the quality of planning documents themselves (similar to "unit tests for requirements"):

- `Outline Quality` - Check integrity, clarity, and consistency of outline.md
- `Character Setting` - Check spec/knowledge/characters.md
- `World Building` - Check spec/knowledge/world-setting.md and related docs
- `Creative Plan` - Check creative-plan.md / specification.md
- `Foreshadowing Management` - Check foreshadowing definitions in spec/tracking/plot-tracker.json

### Type 2: Content Verification Check (Result Reporting)
Scan written chapters to verify actual content:

- `World Consistency` - Scan chapter content, check for world-building contradictions
- `Plot Alignment` - Compare progress with outline, check plot development
- `Data Synchronization` - Verify synchronization of all tracking JSON files
- `Timeline` - Check logical continuity of time events
- `Writing Status` - Check writing readiness and task status

## User Input

```text
$ARGUMENTS
```

## Execution Flow

### 1. Identify Check Type

Determine check type based on user input (Specification Quality vs Content Verification):

**Keyword Mapping**:
- "outline", "quality" → Spec Quality: Outline Quality
- "character", "setting" → Spec Quality: Character Setting
- "world" + "quality/integrity/spec" → Spec Quality: World Building
- "world" + "consistency/check/scan" → Content Verification: World Consistency
- "plan", "planning" → Spec Quality: Creative Plan
- "foreshadow", "plot" → Spec Quality: Foreshadowing Management
- "plot", "align", "progress" → Content Verification: Plot Alignment
- "data", "sync", "consistency" → Content Verification: Data Synchronization
- "timeline", "time" → Content Verification: Timeline
- "status", "ready" → Content Verification: Writing Status

If user input is ambiguous, ask for selection.

### 2. Execute Corresponding Check Logic

#### Specification Quality Checks (Generate Question Checklist)

Execute requirement quality verification logic similar to spec-kit:

##### 2.1 Outline Quality Check

**Goal**: Verify if outline.md has good integrity, clarity, and consistency.

**Read Files**:
- `outline.md` or `stories/*/outline.md`
- `spec/tracking/plot-tracker.json` (if exists)

**Generate Check Dimensions**:

**Completeness**:
- Are trigger conditions and results defined for each major plot node?
- Is the story goal for each volume/chapter defined?
- Are growth arcs for all major characters covered?
- Is the escalation path for major conflicts defined?
- Are the climax and ending of the story defined?

**Clarity**:
- Are trigger conditions for plot nodes specific and verifiable?
- Is there a clear basis for chapter allocation (e.g., word count, plot density)?
- Are character motivations quantified with specific events?
- Does scene description avoid vague words ("somewhere", "some time")?

**Consistency**:
- Are plot clues contradictory?
- Is character behavior consistent with settings?
- Is the time span reasonable?
- Are world rules consistent with outline description?

**Measurability**:
- Is chapter allocation reasonable and feasible (e.g., 2000-4000 words per chapter)?
- Is foreshadowing recovery timing clear (chapter number or range)?
- Are there clear milestones for character growth?

**Coverage**:
- Are all major scene types considered (conflict, daily, turning point)?
- Are roles of all major characters covered?
- Is necessary foreshadowing setup and recovery included?

**Output Example**:
```markdown
# Outline Quality Checklist
**Created**: 2025-10-11
**Target**: outline.md
**Dimensions**: Completeness, Clarity, Consistency, Measurability, Coverage

## Completeness

- [ ] CHK001 Are trigger conditions and results defined for each major plot node? [Spec §Outline 3.2]
- [ ] CHK002 Is the story goal for each volume/chapter defined? [Gap]
- [ ] CHK003 Are growth arcs for all major characters covered? [Spec §Outline 5.1]

## Clarity

- [ ] CHK004 Are trigger conditions for plot nodes specific and verifiable? [Ambiguity, Spec §Outline 3.2]
- [ ] CHK005 Is there a clear basis for chapter allocation? [Clarity]

## Consistency

- [ ] CHK006 Are plot clues contradictory? [Consistency]
- [ ] CHK007 Are world rules consistent with outline description? [Consistency, vs §World]

## Measurability

- [ ] CHK008 Is chapter allocation reasonable and feasible (e.g., 2000-4000 words)? [Measurability]
- [ ] CHK009 Is foreshadowing recovery timing clear (chapter number or range)? [Gap]

## Coverage

- [ ] CHK010 Are all major scene types considered? [Coverage]
- [ ] CHK011 Is necessary foreshadowing setup and recovery included? [Coverage, Gap]

## Instructions

Check verified items: `[x]`
Mark problematic items: `[!]` and record specific issues below
```

##### 2.2 Character Setting Check

**Read Files**:
- `spec/knowledge/characters.md`
- `spec/tracking/character-state.json`
- `spec/tracking/relationships.json`

**Generate Check Dimensions**:

**Completeness**:
- Are basic info defined for major characters (name, age, identity, appearance)?
- Are core motivations and goals defined?
- Are personality traits and behavior patterns defined?
- Is background story defined?
- Are abilities and limitations defined?

**Clarity**:
- Are motivations specific and verifiable (not "wants success" but "wants to change family destiny through exam")?
- Are personality traits reflected through specific behaviors?
- Are goals quantifiable or have clear achievement standards?

**Consistency**:
- Is character setting consistent with behavior in outline?
- Are character descriptions consistent across documents?
- Are relationship definitions symmetrical (A to B vs B to A)?

**Measurability**:
- Are there clear stage divisions for character growth?
- Are ability changes traceable?

##### 2.3 World Building Check

**Read Files**:
- `spec/knowledge/world-setting.md`
- `spec/knowledge/locations.md`
- `spec/knowledge/culture.md`
- `spec/knowledge/rules.md`

**Generate Check Dimensions**:

**Completeness**:
- Are core world rules defined (magic system, tech level, social structure)?
- Are major locations and features defined?
- Are culture, customs, language, traditions defined?
- Is historical background defined?

**Clarity**:
- Are world rules unambiguous?
- Are geography, distance, direction clear?
- Are special terms clearly defined?

**Consistency**:
- Are world settings consistent across documents?
- Are there internal contradictions in world rules?
- Is it consistent with outline description?

**Coverage**:
- Does it cover all locations involved in the story?
- Does it define all special rules or abilities appearing?

##### 2.4 Creative Plan Check

**Read Files**:
- `creative-plan.md` or `specification.md`
- `tasks.md`

**Generate Check Dimensions**:

**Completeness**:
- Are creative goals and milestones defined?
- Are creative process and steps clarified?
- Are quality standards defined?

**Clarity**:
- Is task breakdown clear and specific?
- Is time schedule reasonable?
- Are acceptance criteria clear?

**Consistency**:
- Does plan match outline scale?
- Do tasks cover all planned content?

##### 2.5 Foreshadowing Management Check

**Read Files**:
- `spec/tracking/plot-tracker.json`
- `outline.md`

**Generate Check Dimensions**:

**Completeness**:
- Are all planned foreshadowings recorded?
- Are setup and recovery chapters defined for each foreshadowing?
- Are type and importance defined?

**Clarity**:
- Is foreshadowing content description clear?
- Is recovery method clear?

**Measurability**:
- Is recovery timing clear (chapter number or range)?
- Is setup density defined (avoid too many unrecovered foreshadowings)?

**Consistency**:
- Does foreshadowing match outline plot?
- Are planted and resolved fields consistent?

#### Content Verification Checks (Execute Script to Generate Report)

These checks scan actual written content, invoking corresponding bash scripts:

##### 2.6 World Consistency Check

Execute command:
```bash
bash scripts/bash/check-world.sh --checklist
```

If script doesn't exist, hint user that feature is in development.

##### 2.7 Plot Alignment Check

Execute command:
```bash
bash scripts/bash/check-plot.sh --checklist
```

##### 2.8 Data Synchronization Check

Execute command:
```bash
bash scripts/bash/check-consistency.sh --checklist
```

##### 2.9 Timeline Check

Execute command:
```bash
bash scripts/bash/check-timeline.sh check --checklist
```

##### 2.10 Writing Status Check

Execute command:
```bash
bash scripts/bash/check-writing-state.sh --checklist
```

### 3. Output Checklist

**Save Location**: `spec/checklists/`

**Naming Convention**:
- Spec Quality: `[type]-quality.md` (e.g., `outline-quality.md`)
- Content Verification: `[type]-[date].md` (e.g., `world-consistency-20251011.md`)

**Output Format**: Use `templates/checklist-template.md` as template.

### 4. Report Results

Output:
- Checklist file path
- Total check items
- Check type and scope
- Instructions on how to use checklist

## Example Usage

```bash
# Spec Quality Check
/checklist Outline Quality
/checklist Character Setting
/checklist World Building

# Content Verification Check
/checklist World Consistency
/checklist Plot Alignment
/checklist Data Synchronization
```

## Notes

1. **Spec Quality Checklist**: Used for planning verification before writing, finding quality issues in documents themselves
2. **Content Verification Checklist**: Used for content check after writing, finding issues in actual output
3. Two types of checklists complement each other. Recommendation: Use Type 1 in planning stage, Type 2 in writing stage
4. All checklists are saved in `spec/checklists/` directory for tracking history

## Backward Compatibility

Old commands `/world-check` and `/plot-check` are still available, but using the unified `/checklist` command is recommended.
