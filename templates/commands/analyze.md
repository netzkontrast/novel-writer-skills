---
description: Intelligent Analysis: Automatically selects framework analysis (before write) or content analysis (after write), supports manual specification via --type
argument-hint: [--type=framework|content]
allowed-tools: Bash(find:*), Bash(wc:*), Bash(grep:*), Read(//**), Read(//plugins/**), Read(plugins/**), Write(//stories/**/analysis-report.md), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/check-analyze-stage.sh --json
  ps: .specify/scripts/powershell/check-analyze-stage.ps1 -Json
---

Perform intelligent comprehensive analysis on the novel project. Automatically selects **Framework Consistency Analysis** (before writing) or **Content Quality Analysis** (after writing) based on the current creative stage.
---

## Core Philosophy

**One Command, Dual Intelligence**:
- 📐 **Framework Analysis**: Verifies consistency of specifications, plans, and tasks before writing (similar to spec-kit)
- 📝 **Content Analysis**: Verifies quality and compliance of completed content after writing

**Restrained but not Simple**:
- User only needs to execute `/analyze`, the system automatically judges which analysis to perform
- Supports manual mode: `$ARGUMENTS --type=framework` or `--type=content`

## Execution Flow

### 1. Intelligent Stage Detection

Run `{SCRIPT}` to get current creative status:

```json
{
  "analyze_type": "framework|content",
  "chapter_count": 0,
  "has_spec": true,
  "has_plan": true,
  "has_tasks": true,
  "story_dir": "/path/to/story",
  "reason": "Reason explanation"
}
```

### 2. Decision Logic

Parse user arguments `$ARGUMENTS`:

**Manual Mode** (Highest Priority):
- Contains `--type=framework` → Force Framework Analysis
- Contains `--type=content` → Force Content Analysis

**🆕 Specialized Analysis Mode** (New):
- Contains `--focus=opening` → Opening Special Analysis (Focus on first 3 chapters)
- Contains `--focus=pacing` → Pacing Special Analysis (Focus on pacing/conflict distribution)
- Contains `--focus=character` → Character Special Analysis (Focus on character arc)
- Contains `--focus=foreshadow` → Foreshadowing Special Analysis (Focus on foreshadowing setup and payoff)
- Contains `--focus=logic` → Logic Special Analysis (Focus on finding logical loopholes)
- Contains `--focus=style` → Style Special Analysis (Focus on writing style consistency)

**Automatic Judgment Mode**:
- Chapter count = 0 → **Framework Analysis**
- Chapter count < 3 → **Framework Analysis** (but hints that writing can continue)
- Chapter count ≥ 3 → **Content Analysis**

### 3. Execute Corresponding Analysis

Execute one of the following two analyses based on the decision result.

---

## Mode A: Framework Consistency Analysis

**Goal**: Verify if preparation is sufficient before writing, ensuring no contradictions between specifications, plans, and tasks.

### A1. Load Baseline Documents

- Constitution file: `.specify/memory/constitution.md`
- Specification file: `stories/*/specification.md`
- Plan file: `stories/*/creative-plan.md`
- Task file: `stories/*/tasks.md`

### A2. Coverage Analysis

Check if all specification requirements have corresponding plans and tasks:

```markdown
## Coverage Analysis Report

### P0 Requirement Coverage
- [Req 1: Protagonist Growth] → ✅ Plan Chapter 3, Task #5-8
- [Req 2: Antagonist Setting] → ⚠️ Mentioned in plan, but no specific task
- [Req 3: Suspense Setup] → ❌ Not covered in plan or tasks

### P1 Requirement Coverage
Coverage: 75% (3/4)

### P2 Requirement Coverage
Coverage: 50% (2/4)

### Task Completeness
- Do all planned chapters have corresponding tasks: ⚠️ Chapters 10-12 missing tasks
- Do tasks cover all key scenes: ✅ Yes
```

### A3. Consistency Check

Verify if there are contradictions between documents:

```markdown
## Consistency Check Report

### Specification ↔ Plan
- ✅ Theme expression consistent
- ⚠️ Specification requires "fast pace", but plan for first 5 chapters is slow
- ❌ Specification forbids "too much romance", but plan chapters 6-8 have heavy romance lines

### Plan ↔ Tasks
- ✅ All planned chapters have tasks
- ⚠️ Total task word count estimate 150K, but plan target is 100K
- ❌ Plan requires Chapter 5 to be climax, but task labeled as "transition chapter"

### Constitution Compliance
- ✅ Plan complies with creative constitution values
- ✅ Task breakdown meets quality standards
```

### A4. Logic Issue Warning

Analyze potential logic loopholes in story line design:

```markdown
## Logic Issue Warning

### Timeline Conflict
- ⚠️ Chapter 3 is "three years later", but Chapter 5 character mentions "things from two years ago", time doesn't match

### Character Ability Contradiction
- ❌ Chapter 2 protagonist "knows no martial arts", Chapter 4 task description "defeats enemy using swordsmanship"

### Unplanned Foreshadowing
- ⚠️ Chapter 1 sets up "mysterious token", but no recovery plan in subsequent chapters
```

### A5. Readiness Assessment

Assess if writing can begin:

```markdown
## Readiness Assessment

### Necessary Conditions (P0)
- [x] Specification complete and clear
- [x] Plan covers all P0 requirements
- [ ] Task breakdown complete (missing tasks for 3 chapters)
- [ ] No fatal logic contradictions (found 2)

### Recommended Conditions (P1)
- [x] Character profiles complete
- [ ] World-building document not detailed enough
- [x] Timeline planning clear

### Overall Score: 6/10

**Recommendations**:
1. 🔴 Must Fix: Supplement tasks for Chapters 10-12
2. 🔴 Must Fix: Resolve timeline and character ability contradictions
3. 🟡 Suggest Optimization: Supplement world-building document
4. 🟢 Optional: Adjust pacing design for first 5 chapters

**Conclusion**: Currently **not recommended to start writing**, please resolve P0 issues first.
```

---

## Mode B: Content Quality Analysis

**Goal**: comprehensively verify quality of completed content, ensuring compliance with specifications and providing improvement suggestions.

### B1. Load Verification Baselines

- Constitution file: `.specify/memory/constitution.md`
- Specification file: `stories/*/specification.md`
- Plan file: `stories/*/creative-plan.md`
- Task list: `stories/*/tasks.md`
- **Completed Content**: `stories/*/content/*.md` or `stories/*/chapters/*.md`

### B2. Constitution Compliance Check

Verify if the work follows the principles of the creative constitution:

```markdown
## Constitution Compliance Report

### Core Value Check
- [x] Value Principle 1: Positive theme ✅
- [x] Value Principle 2: Avoid vulgar content ✅
- [ ] Value Principle 3: Respect cultural traditions ⚠️ Controversial description in Chapter 7

### Quality Standard Verification
- Logic Consistency: 8/10 ⚠️ Minor contradictions in Chapter 3 and 6
- Character Fullness: 7/10 (Protagonist rich, supporting characters slightly thin)
- Writing Level: 8/10 (Good fluency, some descriptions can be strengthened)

### Style Consistency
- Narrative Style: Consistent ✅
- Language Style: Consistent ✅
- Pacing Control: Slow then fast, overall reasonable ✅

**Overall Score: 8/10**
```

### B3. Specification Compliance Analysis

Check if implementation meets specification requirements:

```markdown
## Specification Compliance Analysis

### Core Requirement Coverage
#### P0 (Must Include)
- [Req 1: Father-Son Conflict] → ✅ Fully shown in Chapters 2-4
- [Req 2: Suspense Setup] → ⚠️ Insufficient suspense in Chapter 5
- [Req 3: Antagonist Depth] → ❌ Antagonist not yet formally introduced

Coverage: 67% (2/3)

#### P1 (Should Include)
Coverage: 75% (3/4)

#### P2 (Can Include)
Coverage: 50% (2/4)

### Goal Achievement
- Target Audience Fit: 85% (Pacing and plot fit target audience preferences)
- Market Positioning Fit: 80% (Clear differentiation points, but need strengthening)
- Success Criteria Met: 5/8 ⚠️ Some indicators not met

### Constraint Compliance
- Content Red Lines: ✅ No violations
- Creative Constraints: ✅ Word count, update frequency meet requirements
- Technical Constraints: ✅ Platform format standards

**Overall Score: 7/10**
```

### B4. Plan Execution Analysis

Assess deviation between actual execution and plan:

```markdown
## Plan Execution Analysis

### Chapter Structure Comparison
| Plan | Actual | Deviation Analysis |
|------|------|----------|
| Chapter 1: Opening Hook | ✅ Completed | As expected, strong opening attraction |
| Chapter 2: Conflict Unfolding | ✅ Completed | Slightly adjusted, added foreshadowing |
| Chapter 3: Turning Point | ⚠️ Completed | Turning point advanced to end of Chapter 2 |
| Chapter 4: Deepening Contradiction | ✅ Completed | Fully compliant with plan |
| Chapter 5: Pre-Climax | ❌ Delayed | Actually became a transition chapter |

### Character Development Trajectory
- Protagonist Growth Arc: Compliance 85% (Growth slightly faster than planned)
- Supporting Character Function: Realization 70% (Role of Character B not fully reflected)
- Relationship Evolution: Compliance 90% (Father-son relationship evolution as expected)

### World View Unfolding
- Layer 1 Setting (Basic Rules): ✅ Unfolded as planned
- Layer 2 Setting (Power Structure): ⚠️ Revealed early (Plan Chapter 8, Actual Chapter 5)
- Layer 3 Setting (Ultimate Secret): To be unfolded

**Compliance Score: 8/10**
```

### B5. Content Quality Analysis

In-depth analysis of work quality:

```markdown
## Content Quality Analysis

### Text Statistics
- Total Words: 45,230 words
- Average Chapter Length: 6,461 words
- Completion Progress: 35% (7/20 chapters)

### Structure Analysis
- Plot Density: Medium (2-3 plot points per chapter)
- Conflict Frequency: Moderate (Average 1.5 conflicts per chapter)
- Pacing Change: Slow in first 3 chapters, accelerated in 4-7, as expected

### Technical Issues
#### Logic Issues
1. Chapter 3: Character mentions "things from three years ago", but timeline shows only two years passed
2. Chapter 6: Protagonist used ability explicitly stated "not known" in Chapter 2

#### Coherence Issues
1. Suspense at end of Chapter 4 not connected at start of Chapter 5

#### Character Consistency
1. Protagonist reacts contradictorily to same type of event in Chapter 2 and 5 (Impulsive in Ch 2, Calm in Ch 5)

### Highlight Identification
1. Chapter 1: Opening hook designed exquisitely, natural introduction
2. Chapter 4: Father-son dialogue rich in layers, sincere emotion
3. Chapter 6: Action scene description fluent, strong imagery

**Quality Score: 7.5/10**
```

### 🆕 B5.1 Specialized Analysis (Optional)

**If user specifies `--focus` parameter, execute corresponding specialized deep analysis**:

---

#### Special 1: Opening Analysis (--focus=opening)

**Goal**: Deep analysis of whether first 1-3 chapters meet golden opening rules

**Analysis Dimensions**:

```markdown
## Opening Special Analysis Report

### Golden Rule Check

**If `spec/presets/golden-opening.md` exists, automatically read and apply five major rules**

#### Rule 1: Dynamic Scene Entry
- ✅ Chapter 1 Opening Mode: [Action/Dialogue/Conflict] Direct entry
- ❌ Issue Found: Opening has 200 words of static environmental description (Violates rule)
- Suggestion: Delete or shorten to under 50 words, enter action directly

#### Rule 2: Core Conflict Front-loading
- ✅ Core Conflict Throwing Timing: Chapter 1 Section [X]
- ⚠️ Conflict Intensity: Medium (Suggest raising to "Threatens protagonist survival/goal" level)
- Detail: [Describe conflict content]

#### Rule 3: Avoid Information Bombardment
- ✅ World View Revelation Mode: Drip irrigation, naturally integrated into plot
- ❌ Issue Found: Chapter 1 Section 3 has 500 words of setting explanation (Violates rule)
- Suggestion: Split into first 5 chapters, reveal 100 words per chapter

#### Rule 4: Limit Number of Appearances
- ✅ Named Characters in Chapter 1: [X] people (Meets ≤3 requirement)
- ❌ Issue Found: 5 people appeared in Chapter 1, too many (Violates rule)
- Suggestion: Delay appearance of [Character D] and [Character E] to Chapter 2-3

#### Rule 5: Rapid Golden Finger Display
- ✅ Golden Finger Display Timing: Chapter [X]
- ⚠️ Display Mode: Mentioned only, not actually used (Suggest actually showing effect)
- Detail: [Describe display mode]

### Opening Hook Assessment
- **First Sentence Hook Strength**: [Strong/Medium/Weak]
  - Current: [Quote first sentence]
  - Analysis: [Whether it attracts reader]
  - Suggestion: [Optimization direction]

- **Chapter 1 Ending Hook**: [Strong/Medium/Weak]
  - Current: [Quote ending paragraph]
  - Analysis: [Whether it triggers expectation]
  - Suggestion: [Optimization direction]

### First Three Chapters Pacing Check
| Chapter | Goal | Actual Completion | Score |
|------|------|-----------|------|
| Chapter 1 | Hook reader, establish expectation | [Describe actual effect] | [X]/10 |
| Chapter 2 | Show ability, reinforce hook | [Describe actual effect] | [X]/10 |
| Chapter 3 | Initial爽 point, confirm follow-up reading | [Describe actual effect] | [X]/10 |

**Opening Score: [X]/10**
**Suggestion**: [Specific improvement direction]
```

---

#### Special 2: Pacing Analysis (--focus=pacing)

**Goal**: Analyze full text pacing distribution, assess density of爽 points/conflicts

**Analysis Dimensions**:

```markdown
## Pacing Special Analysis Report

### Pacing Parameters (if rhythm-config.json exists)
**Read `spec/presets/rhythm-config.json` (if exists)**:
- Target Chapter Word Count: [X] words
- Target Small Climax Interval: [X] chapters
- Target Big Climax Interval: [X] chapters
- Target Pacing Style: [Fast/Moderate/Slow]

### Conflict Distribution Statistics
| Chapter | Conflict Count | Conflict Type | Conflict Intensity | Meets Expectation? |
|------|---------|----------|---------|-----------|
| Chapter 1 | 2 times | Interpersonal/Inner | Medium/High | ✅ |
| Chapter 2 | 1 time | Interpersonal | Low | ⚠️ Too few |
| Chapter 3 | 3 times | Interpersonal/External | High/High/Medium | ✅ |
| ... | ... | ... | ... | ... |

**Average Conflict Density**: [X] times/chapter
**Suggested Density**: [Y] times/chapter (Based on genre and pacing config)

### Satisfaction Point Distribution Statistics
| Chapter | Point Type | Point Intensity | Interval Chapters |
|------|---------|---------|---------|
| Chapter 1 | - | - | - |
| Chapter 3 | Face Slapping | High | 3 chapters |
| Chapter 7 | Upgrade | Medium | 4 chapters |
| ... | ... | ... | ... |

**Average Satisfaction Interval**: [X] chapters
**Suggested Interval**: [Y] chapters (Based on rhythm-config or genre standard)

### Climax Distribution
- **Small Climax**: Chapters [X], [Y], [Z]
  - Interval Reasonableness: ✅ Meets standard of once every 5 chapters
- **Big Climax**: Chapter [X]
  - Position Reasonableness: ⚠️ Suggested Chapter 30, Actual Chapter 25 (Early)


**Pacing Evaluation**:
- ✅ Overall ups and downs reasonable
- ⚠️ Chapters 10-15 slightly flat
- ❌ Rhythm break in Chapter 20

**Improvement Suggestions**:
1. Add a medium intensity conflict in Chapter 12
2. Supplement transition plot in Chapter 20 to avoid break feeling

**Pacing Score: [X]/10**
```

---

#### Special 3: Character Analysis (--focus=character)

**Goal**: Assess character arc, consistency, growth trajectory

```markdown
## Character Special Analysis Report

### Protagonist Arc Tracking
**Read planned character arc from specification.md and creative-plan.md**

| Node | Planned State | Actual State | Compliance |
|------|---------|---------|--------|
| Start | [State A] | [Actual A] | ✅/⚠️/❌ |
| Trigger | [State B] | [Actual B] | ✅/⚠️/❌ |
| Growth | [State C] | [Actual C] | ✅/⚠️/❌ |
| Transformation | [State D] | [To be unfolded] | - |

**Growth Reasonableness Assessment**:
- ✅ Growth has trigger event
- ⚠️ Growth speed slightly fast (Span from Ch 3 to Ch 7 too large)
- ✅ Growth matches character personality

### Protagonist Consistency Check
- **Personality Consistency**:
  - ✅ Ch 1-5: Impulsive personality maintained consistently
  - ❌ Ch 6: Suddenly became calm in similar situation (Contradiction)

- **Ability Consistency**:
  - ✅ Combat power gradually increased, matches setting
  - ❌ Ch 7 used unlearned skill

- **Motivation Consistency**:
  - ✅ Core goal clear and consistent throughout

### Supporting Character Function Assessment
| Character | Planned Function | Actual Function | Realization |
|------|---------|---------|--------|
| Support A | Mentor Type | Mentor Type | 90% ✅ |
| Support B | Rival Type | Not fully reflected | 40% ⚠️ |
| Support C | Foil Type | Foil Type | 85% ✅ |

**Suggestions**:
- Increase confrontation scenes for Support B (Ch 8-10)
- Clarify motivation and stance of Support B

### Relationship Network Evolution
```
Chapter 1: Protagonist ←Hostile← Antagonist A
              ↓
            Mentor-Apprentice
              ↓
            Support A

Chapter 7: Protagonist ←Complex← Antagonist A
              ↓          ↑
            Mentor      Misunderstanding
              ↓          ↓
            Support A → Support B
```

**Relationship Evolution Reasonableness**: ✅ Meets expectation

**Character Score: [X]/10**
```

---

#### Special 4: Foreshadowing Analysis (--focus=foreshadow)

**Goal**: Check completeness of foreshadowing setup and payoff

```markdown
## Foreshadowing Special Analysis Report

### Read Foreshadowing Management Table from specification.md Section 5.4

### Setup Check
| ID | Planned Chapter | Actual Chapter | Setup Quality |
|--------|------------|------------|---------|
| F-001 | Ch 1 | Ch 1 | ✅ Natural, not abrupt |
| F-002 | Ch 3 | Ch 5 | ⚠️ Delayed 2 chapters, need to check subsequent impact |
| F-003 | Ch 5 | Not Setup | ❌ Missing |

### Payoff Check
| ID | Planned Payoff | Actual Payoff | Payoff Completeness |
|--------|------------|------------|-----------|
| F-001 | Ch 10 | Pending | - |
| F-002 | Ch 15 | Pending | - |

### Unplanned Foreshadowing
**Newly added foreshadowing in actual writing (not in specification)**:
1. Ch 2: Mysterious figure hint → ⚠️ Need to add payoff plan in specification
2. Ch 6: Ancient prophecy mention → ⚠️ Need to decide whether to payoff

### Density Assessment
- Average 1 foreshadowing every [X] chapters
- Suggested density: 1 every [Y] chapters (Based on genre standard)
- Evaluation: ✅ Compliant / ⚠️ Too many / ❌ Too few

### Risk Warning
- 🔴 Foreshadowing F-003 not setup, may affect plot of Ch 15
- 🟡 Added 2 new foreshadowings, need to supplement payoff plan

**Foreshadowing Management Score: [X]/10**
```

---

#### Special 5: Logic Analysis (--focus=logic)

**Goal**: Deep search for logic loopholes and contradictions

```markdown
## Logic Special Analysis Report

### Timeline Check
**Construct Complete Timeline**:
```
Absolute Time    Story Time   Chapter   Key Event
2020-01-01      Day 0        -       [Background]
2020-01-05      Day 4        Ch 1    Protagonist leaves home
2020-01-10      Day 9        Ch 3    Met mentor
2023-01-10      3 Years Later Ch 5    ⚠️ Contradicts Ch 7
2022-01-10      2 Years Later Ch 7    Character recalls "things from 3 years ago"
```

**Timeline Contradictions**:
- ❌ Ch 5 and Ch 7 time doesn't match (Found 1 place)
- Suggestion: Unify to "Two years later"

### Causal Logic Check
| Event A (Cause) | Event B (Result) | Logic Reasonableness |
|-------------|-------------|-----------|
| Ch 2 Protagonist trains | Ch 4 Strength increase | ✅ Reasonable |
| Ch 3 Treasure lost | Ch 6 Treasure appears | ❌ Not explained how recovered |
| Ch 5 Swears oath | Ch 7 Breaks oath | ⚠️ Missing psychological paving |

### Ability Consistency Check
| Chapter | Ability Setting | Contradiction? |
|------|---------|--------|
| Ch 2 | Protagonist knows no martial arts | - |
| Ch 4 | Protagonist learns basic swordsmanship | ✅ Reasonable transition |
| Ch 6 | Protagonist uses advanced swordsmanship | ❌ Too big leap, missing learning process |

### World View Consistency
- ✅ Magic rules consistent throughout
- ❌ Ch 3 mentions "Technology prohibited", Ch 8 high-tech weapon appears
- ⚠️ Social class setting has slight difference in Ch 5 and Ch 9

### Motivation Reasonableness
| Character | Behavior | Motivation Explanation | Reasonableness |
|------|------|---------|--------|
| Protagonist | Ch 5 Risks saving people | Sense of justice | ✅ Fits persona |
| Support A | Ch 7 Betrayal | Unexplained | ❌ Abrupt, missing paving |
| Antagonist | Ch 9 Spares protagonist | Appreciates talent | ⚠️ Slightly forced |

**Logic Strictness Score: [X]/10**
```

---

#### Special 6: Style Analysis (--focus=style)

**Goal**: Check writing style consistency, compare with style-reference.md

```markdown
## Style Special Analysis Report

### If style-reference.md exists (from /book-internalize)

**Read `memory/style-reference.md`, compare actual style**

### Vocabulary Consistency Check
**Reference Style Vocabulary Preference**:
- Target common modifiers: [List]
- Actual common modifiers: [List]
- Match Rate: [X]%

**Banned Word Check (AI Tone)**:
- ❌ Found use of "permeate" total [X] times (style-reference banned)
- ❌ Found use of "tottering" total [X] times (style-reference banned)
- Suggestion: Replace with common words of benchmark work

### Sentence Consistency Check
- Average Sentence Length: Actual [X] words vs Target [Y] words
- Paragraph Density: Actual [X] words/para vs Target [Y] words/para
- Evaluation: ✅ Compliant / ⚠️ Deviation large

### Description Ratio Check
| Type | Target Ratio | Actual Ratio | Deviation |
|------|---------|---------|------|
| Dialogue | 35% | 40% | +5% ⚠️ |
| Action | 40% | 30% | -10% ❌ |
| Description | 15% | 20% | +5% ⚠️ |
| Inner | 10% | 10% | 0% ✅ |

**Suggestion**: Increase action description ratio, decrease dialogue and description

### Narrative Style Consistency
- Perspective: ✅ Third person limited, consistent
- Language: ✅ Colloquial style, meets target
- Pacing: ⚠️ First 3 chapters meet "fast pace", Ch 4-7 slow
- Emotional Tone: ✅ Hot-blooded tone throughout

### Inter-chapter Style Comparison
| Chapter | Style Features | Similarity with Reference |
|------|---------|-----------------|
| Chapter 1 | Concise and powerful, dense verbs | 85% ✅ |
| Chapter 2 | Slightly wordy, too many modifiers | 60% ⚠️ |
| Chapter 3 | Return to concise style | 80% ✅ |

**Style Consistency Score: [X]/10**
**Suggestion**: Reference style of Ch 1 and Ch 3, revise Ch 2
```

---

### B6. Task Completion Audit

Check task execution status:

```markdown
## Task Completion

### Overall Progress
- Total Tasks: 28
- Completed: 12 (43%)
- In Progress: 2 (7%)
- Not Started: 14 (50%)

### Key Milestones
- [Milestone 1: First 5 Chapters Done] → ✅ Achieved
- [Milestone 2: Main Line to 50%] → ⚠️ Delayed (Planned Ch 10, Actual Ch 7 only 30%)
- [Milestone 3: First Volume End] → Pending

### Blockers and Risks
1. Chapter 5 task "Climax Scene" not executed as planned, affecting subsequent pacing
2. Antagonist character not yet appeared, may affect mid-term conflict design
```

### B7. Generate Improvement Suggestions

Provide specific suggestions based on analysis results:

```markdown
## Improvement Suggestions

### Urgent Fixes (P0)
1. **Timeline Contradiction**
   - Impact: Destroys reader trust, affects logic strictness
   - Suggestion: Unify time expression in Ch 3 and Ch 6, modify to "Two years ago"
   - Location: Chapter 3 Section 2, Chapter 6 Section 4

2. **Character Ability Contradiction**
   - Impact: Seriously affects character credibility
   - Suggestion: Add "learning martial arts" transition plot between Ch 4-5, or delete martial arts description in Ch 6
   - Location: Chapter 2 Section 5, Chapter 6 Section 3

### Optimization Suggestions (P1)
1. **Insufficient Suspense in Chapter 5**
   - Current: Chapter 5 ending flat, missing hook
   - Suggestion: Add an unexpected event or information at end to trigger reader expectation
   - Expected Effect: Improve reader retention

2. **Support B Function Not Reflected**
   - Current: Support B appeared but role unclear
   - Suggestion: Arrange key role for Support B in Ch 8-9, echoing previous paving
   - Expected Effect: Enhance presence of supporting character, enrich story layers

### Long-term Improvements (P2)
1. **World View Setting Revealed Early**
   - Reason: May affect mystery creation later
   - Plan: Assess whether to adjust subsequent revelation pacing, or add deeper settings
   - Timing: Decide before Chapter 10

**Priority Sorting**: P0-1 (Timeline) → P0-2 (Ability Contradiction) → P1-1 (Suspense) → P1-2 (Support Role)
```

### B8. Generate Verification Report

Create `stories/*/analysis-report.md`:

```markdown
# Work Analysis Report

## Abstract
- Analysis Date: 2025-10-01
- Analysis Range: Chapters 1-7
- Analysis Words: 45,230 words
- Overall Score: 7.5/10
- Suggested Action: Continue writing, batch revise first 7 chapters

## Core Indicators
| Dimension | Score | Explanation |
|------|------|------|
| Constitution Compliance | 8/10 | Values correct, style consistent, 1 place needs attention |
| Specification Compliance | 7/10 | P0 requirement coverage 67%, need to supplement antagonist scenes |
| Plan Execution | 8/10 | Overall compliant, local adjustments reasonable |
| Content Quality | 7.5/10 | 2 logic issues, 1 character contradiction need fix |
| Reader Experience | 8/10 | Pacing reasonable, highlights prominent, readability strong |

**Average Score: 7.7/10**

## Key Findings
1. ✅ Opening attraction strong, Chapter 1 hook design excellent
2. ✅ Father-son relationship evolution meets expectation, emotional layers rich
3. ⚠️ 2 logic contradictions exist, need fix
4. ⚠️ Chapter 5 suspense insufficient, affecting reader retention
5. ❌ P0 requirement "Antagonist Depth" not yet realized

## Next Steps
1. 🔴 **Fix Immediately**: Timeline contradiction, character ability contradiction (Est. 2 hours)
2. 🟡 **Optimize Soon**: Add suspense to Ch 5, arrange Support B scenes in Ch 8-9 (Est. 1 day)
3. 🟢 **Continue Writing**: Proceed with Ch 8-10 as planned, focus on supplementing antagonist scenes
4. 📅 **Plan Check**: Run `/analyze` again for stage verification after completing Ch 10
```

---

## Analysis Dimension Framework

### Seven Analysis Dimensions
1. **Compliance**: Meets constitution and specification
2. **Consistency**: Logic, character, world view
3. **Completeness**: Requirement coverage, task completion
4. **Quality**: Text, structure, pacing
5. **Innovation**: Highlights, features, breakthroughs
6. **Readability**: Fluency, attraction, resonance
7. **Feasibility**: Progress, resources, risks

## Scoring Standard

```text
10 points: Perfect, exceeds expectation
8-9 points: Excellent, minor flaws
6-7 points: Good, needs optimization
4-5 points: Pass, many issues
1-3 points: Poor, needs rewrite
```

## Usage Scenarios

### Scenario 1: Prepare to Start Writing

```bash
User: /tasks
AI: Generated 28 writing tasks

User: /analyze
AI: Detected no chapter content, executing Framework Consistency Analysis...

【Coverage Analysis】
⚠️ Specification requirement "Antagonist Setting" has no corresponding task
❌ Planned Chapters 10-12 missing task breakdown

【Consistency Check】
❌ Specification requires "Fast pace", but plan for first 5 chapters is slow

【Readiness Score】6/10
Suggestion: Fix above issues before starting writing
```

### Scenario 2: Completed Partial Chapters

```bash
User: /write (Completed Chapters 1-7)

User: /analyze
AI: Detected 7 completed chapters, executing Content Quality Analysis...

【Constitution Compliance】8/10 ✅
【Specification Compliance】7/10 ⚠️ P0 requirement coverage 67%
【Content Quality】7.5/10 ⚠️ 2 logic issues

【Improvement Suggestions】
P0: Fix timeline contradiction, character ability contradiction
P1: Add suspense to Ch 5

【Suggestion】: After fixing P0 issues, continue writing Ch 8-10
```

### Scenario 3: Manual Mode

```bash
User: /analyze --type=framework
AI: Forcing Framework Analysis Mode...

(Executes Framework Analysis even if chapter content exists)

User: /analyze --type=content
AI: Forcing Content Analysis Mode...

(Executes Content Analysis even if chapters less than 3)
```

### 🆕 Scenario 4: Specialized Analysis

```bash
# Opening Special Analysis (Check if first 3 chapters meet golden opening rules)
User: /analyze --focus=opening
AI: Executing Opening Special Analysis...

【Golden Rule Check】(Automatically reads golden-opening.md)
❌ Rule 1 Violated: Chapter 1 has 200 words static environmental description
⚠️ Rule 5 Delayed: Golden finger shown in Ch 4 (Suggested Ch 2-3)

【Opening Hook Assessment】
First Sentence Hook: Medium Strength
Chapter 1 Ending Hook: Strong

【Suggestion】: Delete opening environmental description, advance golden finger to Ch 3

---

# Pacing Special Analysis (Check satisfaction point distribution and conflict density)
User: /analyze --focus=pacing
AI: Executing Pacing Special Analysis...

【Pacing Parameters】(Automatically reads rhythm-config.json)
Target Satisfaction Interval: 5 Chapters
Actual Average Interval: 7 Chapters ⚠️ Too long

【Conflict Distribution】
Average Conflict Density: 1.2 times/chapter
Suggested Density: 2 times/chapter ❌ Insufficient

【Suggestion】: Add satisfaction point design in Chapters 5, 10, 15

---

# Logic Special Analysis (Deep search for logic loopholes)
User: /analyze --focus=logic
AI: Executing Logic Special Analysis...

【Timeline Contradiction】
❌ Ch 5 "3 years later" vs Ch 7 "2 years later"

【Ability Contradiction】
❌ Ch 2 "Knows no martial arts" → Ch 6 "Uses advanced swordsmanship" (Gap too big)

【Causal Logic】
❌ Ch 3 Treasure lost → Ch 6 Treasure appears (Not explained how recovered)

【Suggestion】: Fix above 3 logic contradictions

---

# Style Special Analysis (Compare style-reference.md)
User: /analyze --focus=style
AI: Executing Style Special Analysis...

【Vocabulary Consistency】(Automatically reads style-reference.md)
❌ Found banned word "permeate" total 12 times
⚠️ Actual avg sentence length 35 words vs Target 25 words (Too long)

【Description Ratio】
Dialogue: 40% (Target 35%) +5% ⚠️
Action: 30% (Target 40%) -10% ❌

【Suggestion】:
1. Replace banned words with benchmark work common words
2. Shorten sentences, increase short sentence ratio
3. Increase action description, decrease dialogue
```

## Relationship with Other Commands

```text
/constitution → Define creative principles
     ↓
/specify → Define story specifications
     ↓
/clarify → Clarify key decisions
     ↓
/plan → Develop creative plan
     ↓
/tasks → Breakdown execution tasks
     ↓
/analyze (Framework Mode) → Verify readiness
     ↓
/write → Execute chapter writing
     ↓
/analyze (Content Mode) → Verify quality consistency
     ↓
(Loop: Revise → Continue Writing → Analyze Again)
```

## Notes

### Intelligent but Controllable
- Auto mode covers 90% of usage scenarios
- Manual mode handles special needs
- User doesn't need to memorize complex rules

### 🆕 Specialized Analysis Usage Scenarios

**When to use Specialized Analysis?**

1. **--focus=opening**: Use immediately after completing first 3 chapters
   - Opening is key to reader retention
   - Golden opening rules have strict requirements
   - Early detection of issues costs less

2. **--focus=pacing**: Use every 10-15 chapters
   - Check if pacing meets expectation
   - Assess reasonableness of satisfaction/conflict distribution
   - Adjust pacing based on rhythm-config

3. **--focus=character**: Use after major turning points
   - After protagonist experiences major event
   - When supporting character appears or exits
   - When character relationship changes

4. **--focus=foreshadow**: Use after each volume completion
   - Check if foreshadowing missed
   - Assess foreshadowing setup quality
   - Plan payoff timing in advance

5. **--focus=logic**: Use after outline adjustment
   - After modifying important settings
   - After adjusting timeline
   - After adding/deleting chapter content

6. **--focus=style**: Use before batch revision
   - Compare style-reference to check consistency
   - Discover AI tone and banned words
   - Ensure style matches benchmark work

**Relationship between Specialized Analysis and Comprehensive Analysis**:
- **Comprehensive Analysis** (Default): Suitable for stage check (every 5-10 chapters)
- **Specialized Analysis** (--focus): Suitable for targeted optimization (when issues found)

**Suggested Workflow**:
1. Every 5-10 chapters completed → `/analyze` (Comprehensive Analysis)
2. Found opening issues → `/analyze --focus=opening`
3. Pacing feels off → `/analyze --focus=pacing`
4. Logic uncertain → `/analyze --focus=logic`
5. Check before revision → `/analyze --focus=style`

### Objective and Constructive
- Analyze based on data and standards
- Avoid subjective assumptions
- Provide specific executable suggestions

### Progressive Improvement
- Analysis is for improvement, not criticism
- Record results of each analysis
- Track improvement effects

### 🆕 Synergy with Other Functions

**Files automatically read by Specialized Analysis**:
- `spec/presets/golden-opening.md` → opening analysis
- `spec/presets/rhythm-config.json` → pacing analysis
- `memory/style-reference.md` → style analysis
- `stories/*/specification.md` → baseline for all analyses

**Advantages**:
- No need to manually specify reference files
- Automatically apply benchmark work standards
- Maintain analysis standard consistency

---

**Remember**: **One command, three modes (Framework/Content/Specialized), intelligent and precise. The purpose of analyze is to make the work better, whether before writing, after writing, or focusing on specific dimensions.**
