---
name: track
description: Comprehensive tracking of novel creation progress and content
argument-hint: [--brief | --plot | --stats | --check | --fix]
allowed-tools: Read(//spec/tracking/**), Read(spec/tracking/**), Read(//stories/**), Read(stories/**), Bash(find:*), Bash(wc:*), Bash(grep:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/track-progress.sh
  ps: .specify/scripts/powershell/track-progress.ps1
---

# Comprehensive Progress Tracking

Show comprehensive progress and status of novel creation.

## Tracking Dimensions

1. **Writing Progress** - Words, chapters, completion rate
2. **Plot Development** - Main line progress, sub-line status
3. **Timeline** - Story time advancement
4. **Character Status** - Character development and location
5. **Foreshadowing Management** - Planting and revealing status

## Usage

Execute script {SCRIPT} [Options]:
- No args - Show full tracking report
- `--brief` - Show brief info
- `--plot` - Show plot tracking only
- `--stats` - Show stats only
- `--check` - **[Enhanced]** Execute deep consistency check (includes character validation)
- `--fix` - **[New]** Auto-fix found simple issues

## Data Sources

Integrate info from multiple tracking files:
- `progress.json` - Writing progress
- `spec/tracking/plot-tracker.json` - Plot tracking
- `spec/tracking/timeline.json` - Timeline
- `spec/tracking/relationships.json` - Relationship network
- `spec/tracking/character-state.json` - Character state
- `spec/tracking/validation-rules.json` - **[New]** Validation rules (for --check and --fix)

## Output Example

```
📊 Novel Creation Comprehensive Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 "Chronicles of Ming Dynasty"

✍️ Writing Progress
  Completed: 60/240 Chapters (25%)
  Words: 162,000/800,000
  Current: Vol 2 "Court Storm"

📍 Plot Status
  Main: Reform Cause [Court Entry Stage]
  Sub: Romance [Getting to Know Each Other]

⏰ Timeline
  Story Time: Spring of 30th Year of Wanli
  Time Span: 5 months

👥 Main Characters
  Li Zhongyong: Hanlin Academy Compiler @Beijing
  Shen Yuqing: Adopted Daughter of Zhang Juzheng [Active]

⚡ Pending
  Foreshadowing: 3 unrevealed
  Conflict: Reform vs Conservative [Escalating]

✅ Consistency Check: Passed
```

## Enhanced Features

### Data Consistency Verification

Basic check (executed by default):
- Consistency between plot-tracker.json and outline.md
- Time logic in timeline.json
- Relationship conflicts in relationships.json
- Location reasonableness in character-state.json

### Deep Validation Mode (--check)

When using `--check`, execute programmatic deep validation:

#### Internal Task Flow (Auto Executed)
```markdown
# Phase 1: Basic Validation [Parallel]
- [x] T001 [P] Execute plot consistency check (plot-check logic)
- [x] T002 [P] Execute timeline validation (timeline logic)
- [x] T003 [P] Execute relationship validation (relations logic)
- [x] T004 [P] Execute world validation (world-check logic)

# Phase 2: Character Deep Validation
- [x] T005 Load validation-rules.json validation rules
- [x] T006 Scan character names in all chapters
- [x] T007 Compare with character-state.json for name consistency
- [x] T008 Check if address forms match relationships.json
- [x] T009 Verify if character behavior fits persona

# Phase 3: Generate Comprehensive Report
- [x] T010 Aggregate all validation results
- [x] T011 Mark issue severity
- [x] T012 Generate fix suggestions
```

#### Validation Report Example
```
📊 Deep Validation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Passed Items: 15/18

❌ Issues Found (3):
1. [High] Ch 3: Protagonist name "Li Ming" should be "Li Zhongyong"
2. [Medium] Ch 7: Shen Yuqing address error, used "Senior Brother"
3. [Low] Ch 12: Timeline jump unexplained

🔧 Auto-fixable: 2
📝 Manual confirm needed: 1

Run /track --fix to auto-fix simple issues
```

### Auto-Fix Mode (--fix)

When using `--fix`, auto-fix based on validation report:

#### Auto-Fix Scope
1. **Character Name Error** - Auto replace based on validation-rules.json
2. **Fixed Address Error** - Auto correct to correct address
3. **Simple Spelling Error** - Correct obvious typos

#### Fix Flow
```markdown
# Internal Fix Tasks (Auto Executed)
- [x] F001 Read issue list from validation report
- [x] F002 [P] Fix Ch 3 character name error
- [x] F003 [P] Fix Ch 7 address error
- [x] F004 Generate fix report
- [x] F005 Update tracking files
```

#### Fix Report Example
```
🔧 Auto-Fix Report
━━━━━━━━━━━━━━━━━━━
✅ Fixed: 2 issues
- Ch 3: "Li Ming" → "Li Zhongyong"
- Ch 7: "Senior Brother" → "Young Master"

⚠️ Manual handling needed: 1 issue
- Ch 12: Timeline jump needs supplementary explanation

Fix complete! Suggest re-running /track --check to verify
```

### Intelligent Analysis and Suggestions

1. **Progress Analysis**
   - Compare planned vs actual progress
   - Predict completion time
   - Identify writing bottlenecks

2. **Content Analysis**
   - Foreshadowing coverage (Planted/Revealed)
   - Character appearance frequency
   - Conflict intensity curve

3. **Action Suggestions**
   Provide based on analysis results:
   - Next writing focus
   - Foreshadowing to handle
   - Relationship lines to strengthen
   - Timeline adjustment suggestions

### Visualized Report

Generate structured report:
```
📊 Comprehensive Tracking Report
━━━━━━━━━━━━━━━━━━━━━━━━━━
[Progress Bar] ████████░░░░░░░ 25%

🎯 Next Step Suggestions:
1. Reveal "Bronze Ancient Mirror" foreshadowing before Ch 65
2. Strengthen direct conflict between protagonist and antagonist
3. Supplement Vol 2 timeline details

⚠️ Attention Needed:
- Character B not appeared for 5 chapters
- Sub-plot progress lagging
- Time jump in Ch 45 needs explanation
```

### Data Export

Support exporting tracking data as:
- Markdown format full report
- JSON format raw data
- Visualized charts (Relationship map, Timeline)
