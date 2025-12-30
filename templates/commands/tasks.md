---
description: Breakdown creative plan into executable task list
allowed-tools: Read(//stories/**/creative-plan.md), Read(stories/**/creative-plan.md), Read(//stories/**/specification.md), Read(stories/**/specification.md), Write(//stories/**/tasks.md), Write(stories/**/tasks.md), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/tasks-story.sh
  ps: .specify/scripts/powershell/generate-tasks.ps1
---

Generate specific, executable task list based on creative plan.

## Goal

Transform macro plan into micro tasks, making creation manageable and trackable.

## Execution Steps

### 1. Load Plan Documents

Run `{SCRIPT}` to load:
- Creative Plan: `stories/*/creative-plan.md`
- Chapter Architecture Info
- Timeline and Dependencies

### 2. Generate Task List

Create `stories/*/tasks.md`, containing:

#### Core Writing Tasks

**Important**: Mark involved clues for each writing task based on clue distribution in specification.md Chapter 5 and creative-plan.md.

```markdown
## Writing Tasks

### High Priority [Must Complete First]

- [ ] [P0] **T001** - Chapter 1: [Chapter Title] (Target Words)
  - **Core Task**: [Main task of this chapter]
  - **Key Plot**: [Specific plot points]
  - **Involved Clues**:
    - PL-XX([Clue Name]) ⭐⭐⭐ Main Push
    - PL-YY([Clue Name]) ⭐ Background
  - **Intersection**: [If applicable] X-001([Intersection Description])
  - **Foreshadowing**: [If applicable] F-001 Plant / F-002 Reveal
  - **Must Include**: [Key element list]
  - **Ending Hook**: [Suspense setup]
  - **Dependencies**: None
  - **Output**: `content/volume1/chapter-001.md`

- [ ] [P0] **T002** - Character Profile: Protagonist Detailed Setting
  - **Core Task**: Perfect protagonist setting
  - **Must Include**: Personality, background, ability, desire, fear, growth arc
  - **Dependencies**: None
  - **Output**: `characters/protagonist.md`

### Medium Priority [Normal Progress]

- [ ] [P1] **T005** - Chapter 5: [Chapter Title] (Target Words)
  - **Core Task**: [Main task of this chapter]
  - **Key Plot**: [Specific plot]
  - **Involved Clues**:
    - PL-01([Clue Name]) ⭐⭐⭐ Main Push
    - PL-02([Clue Name]) ⭐⭐ Auxiliary
  - **Intersection**: None
  - **Foreshadowing**: F-001 Plant ([Content])
  - **Must Include**: [Key elements]
  - **Ending Hook**: [Suspense]
  - **Dependencies**: T004(Chapter 4)
  - **Output**: `content/volume1/chapter-005.md`

### Low Priority [Optional Perfection]

- [ ] [P2] Extra: Character Prequel
- [ ] [P2] Setting Collection: Detailed World Building
```

**Task Field Description**:
- **Involved Clues**: Read from "Active Clues" column in creative-plan.md, indicating which clues this chapter pushes forward
- **Intersection**: Read from specification.md Section 5.3, indicating if this chapter is an intersection point
- **Foreshadowing**: Read from specification.md Section 5.4, indicating foreshadowing operations in this chapter

#### Task Marker Description
- `[P]` - Can execute in parallel
- `[Dep:X]` - Need to complete Task X first
- `[P0/P1/P2]` - Priority marker

### 3. Task Sorting and Grouping

- Group by priority
- Identify dependencies
- Mark parallel tasks
- Estimate completion time

### 4. Generate Execution Plan

```markdown
## Execution Plan

### Phase 1 (Week 1)
Parallel Task Group 1:
- Protagonist Setting [P]
- World Building Foundation [P]
- Chapter 1 Draft [P]

### Phase 2 (Week 2-3)
Serial Tasks:
- Chapter 2 [Dep: Chapter 1]
- Chapter 3 [Dep: Chapter 2]

Parallel Task Group 2:
- Supporting Role Setting [P]
- Scene Design [P]
```

### 5. Output Task Statistics

- Total Tasks
- Estimated Total Words
- Estimated Completion Time
- Key Milestones

Prompt next step: Start executing `/write` or view specific task details.
