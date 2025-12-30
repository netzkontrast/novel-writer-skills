---
description: Define story specifications, clarifying what to create
argument-hint: [story description]
allowed-tools: Read(//stories/**/specification.md), Read(stories/**/specification.md), Write(//stories/**/specification.md), Write(stories/**/specification.md), Read(//memory/constitution.md), Read(memory/constitution.md), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/specify-story.sh --json
  ps: .specify/scripts/powershell/specify-story.ps1 -Json
---

User Input: $ARGUMENTS

## Goal

Define the story like a Product Requirement Document (PRD), clarifying "What to create" rather than "How to create". Supports **Progressive Specification Definition**, from a single sentence to a full specification, step by step. Outputs specifications with `[Needs Clarification]` markers to leave room for subsequent clarification steps.

## Progressive Specification Levels

Automatically judge and generate corresponding level specifications based on user input detail:

**Level 1 - Logline**:
- Core idea within 30 words
- Example: "An amnesiac hacker discovers he lives in a virtual world"
- Applicable: Initial inspiration stage

**Level 2 - Premise**:
- Story summary of 100-200 words
- Includes: Protagonist, Conflict, Goal, Obstacle
- Applicable: Idea validation stage

**Level 3 - One-Page Spec**:
- Includes: Summary, Protagonist, Main Conflict, Three-Act Structure
- Simplified spec (about 500 words)
- Applicable: Rapid prototyping stage

**Level 4 - Full Specification**:
- Includes complete nine-chapter specification content
- Detailed clue management, success criteria, etc.
- Applicable: Formal creation preparation stage

## Execution Steps

### 0. Judge Specification Level

**Automatically judge level based on user input**:

```python
input_length = len($ARGUMENTS)
existing_spec = check_if_exists()

if existing_spec:
    # Existing spec, execute upgrade or modify
    level = get_current_level(existing_spec)
    action = "upgrade" or "modify"
elif input_length < 50:
    # One sentence input → Level 1
    target_level = 1
elif input_length < 300:
    # One paragraph input → Level 2
    target_level = 2
elif input_length < 1000:
    # Brief description → Level 3
    target_level = 3
else:
    # Detailed description → Level 4
    target_level = 4
```

**Decision Logic**:
- If specification file exists, ask user whether to "Upgrade Level" or "Modify Content"
- If new story, automatically select level based on input length
- After generating specification, prompt user how to expand to next level

### 1. Initialize Story Specification

Run `{SCRIPT}` to get path info:
- Parse JSON to get `STORY_NAME` and `SPEC_PATH`
- If new story, create specification file
- If exists, prepare to update or upgrade

### 2. Check Constitution Compliance

If `memory/constitution.md` exists:
- Load constitution principles
- Ensure specification complies with constitution values
- Reference relevant principles in specification

### 3. Create Story Specification Document

**Generate corresponding specification based on judged level**:

---

#### Level 1 Specification Template (Logline)

```markdown
# Story Specification

## Metadata
- Story Name: [Name]
- Version: 1.0.0-L1 (Logline)
- Creation Date: [YYYY-MM-DD]
- Current Level: Level 1
- Author: [Author Name]

## Logline

[Core idea within 30 words]

**Examples**:
- "An amnesiac hacker discovers he lives in a virtual world"
- "A high school student gains the ability to predict the future, but each use shortens his life"
- "A retired agent must complete an impossible mission to save his daughter"

## Core Element Identification

Based on this sentence, identify the following core elements:
- **Protagonist**: [Who]
- **Dilemma/Conflict**: [What problem faced]
- **Goal**: [What to achieve]
- **Obstacle/Cost**: [What hinders]

## Next Steps

✅ **Level 1 Specification Completed**

**Expansion Suggestions**:
1. Expand one sentence into a paragraph (100-200 words)
2. Run `/specify` command, input expanded paragraph
3. System will automatically upgrade to Level 2

**Expansion Hints**:
- Add protagonist's background and motivation
- Clarify cause of main conflict
- Hint at story direction and possible ending
```

---

#### Level 2 Specification Template (Premise)

```markdown
# Story Specification

## Metadata
- Story Name: [Name]
- Version: 1.1.0-L2 (Premise)
- Creation Date: [YYYY-MM-DD]
- Current Level: Level 2
- Author: [Author Name]

## Logline

[Inherit from Level 1, or extract new]

## Premise

[Story summary of 100-200 words, including protagonist, conflict, goal, obstacle]

**Example Structure**:
{Protagonist Background} in {Starting Situation}, discovers/encounters {Core Conflict}. To {Goal}, he/she must {Action}, but {Main Obstacle} makes {Difficulty/Cost}. Finally {Hint at Ending Direction}.

## Core Elements

### Protagonist Setting
- **Identity**: [Occupation/Age/Background]
- **Personality Traits**: [2-3 Keywords]
- **Core Desire**: [What they want]
- **Fatal Flaw**: [What hinders them]

### Core Conflict
- **External Conflict**: [Against what]
- **Internal Conflict**: [What inner struggle]
- **Conflict Cause**: [Why outbreak now]

### Story Direction
- **Start**: [Where story begins]
- **Midpoint**: [Expected turning point]
- **End**: [Possible ending direction]

## Preliminary Genre Positioning

- **Main Genre**: [Fantasy/Urban/Historical/Sci-Fi etc.]
- **Sub-genre**: [Specific genre]
- **Reference Work**: Similar to [Feature] of [Work Name]

## Next Steps

✅ **Level 2 Specification Completed**

**Expansion Suggestions**:
1. Expand premise into one-page outline (about 500 words)
2. Add three-act structure, main characters, key scenes
3. Run `/specify` command, input expanded content
4. System will automatically upgrade to Level 3

**Expansion Hints**:
- Clarify three-act structure boundaries
- Add 2-3 main supporting characters
- List 5-10 key scenes
- Think about basic world settings
```

---

#### Level 3 Specification Template (One-Page Spec)

```markdown
# Story Specification

## Metadata
- Story Name: [Name]
- Version: 1.2.0-L3 (One-Page)
- Creation Date: [YYYY-MM-DD]
- Current Level: Level 3
- Author: [Author Name]

## I. Story Core

### Logline
[Inherit from Level 1]

### Story Brief (100-200 words)
[Inherit from Level 2]

### Core Theme
- **Theme**: [e.g., "Growth", "Redemption", "Revenge"]
- **Emotional Core**: [What reader should feel]

## II. Main Characters (3-5 people)

### Protagonist
- **Name**: [Name]
- **Identity/Background**: [Brief]
- **Core Desire**: [What they want]
- **Character Arc**: From [State A] → Experience [Conflict] → Become [State B]

### Main Support 1
[Name, Function, Relationship with Protagonist]

### Main Support 2
[Name, Function, Relationship with Protagonist]

### Antagonist/Opposing Force
[Name/Faction, Motivation, Threat Level]

## III. Three-Act Structure

### Act 1: Setup (Est. 25%)
- **Start**: [Ordinary World]
- **Inciting Incident**: [Event breaking balance]
- **Decision**: [Protagonist decides to act]
- **Crossing Threshold**: [Leaving comfort zone]

### Act 2: Confrontation (Est. 50%)
- **First Half**: [Trials and failures]
- **Midpoint**: [Major twist/False victory or failure]
- **Second Half**: [Situation worsens/Dark moment]
- **Low Point**: [All seems lost]

### Act 3: Resolution (Est. 25%)
- **Epiphany**: [Protagonist awakening/growth]
- **Climax**: [Final battle/conflict]
- **Resolution**: [New balance state]

## IV. Key Scenes (5-10)

1. **[Scene 1 Name]**: [1-2 sentences description, emotional function]
2. **[Scene 2 Name]**: [Description]
3. **[Scene 3 Name]**: [Description]
4. ...

## V. Target Positioning

### Target Audience
- **Age Group**: [Range]
- **Genre Preference**: [Fantasy/Urban/Historical etc.]
- **Reading Scenario**: [Fragmented time/Deep reading]

### Market Positioning
- **Main Genre**: [Genre]
- **Sub-genre**: [Sub-genre]
- **Competitor Analysis**: Similar to [Feature] of [Work 1] + [Feature] of [Work 2]
- **Differentiation**: [Core selling point]

### Quantitative Goals
- **Target Word Count**: [30k/100k/500k]
- **Update Frequency**: [Daily/Weekly]
- **Completion Time**: [Estimated duration]

## VI. Next Steps

✅ **Level 3 Specification Completed**

**Expansion Suggestions**:
1. Expand one-page outline into full specification
2. Add detailed clue management specification (multi-thread, foreshadowing, intersection)
3. Add success criteria, constraints, risk assessment
4. Run `/specify` command, tell AI "Expand to full specification"
5. System will automatically upgrade to Level 4

**Expansion Hints**:
- Clarify multi-thread management strategy (if any)
- List all constraints and red lines
- Mark 5-10 decision points needing clarification
- Prepare reference materials and inspiration sources
```

---

#### Level 4 Specification Template (Full Specification)

Use complete nine-chapter specification structure (maintain original template):

```markdown
# Story Specification

## Metadata
- Story Name: [Name]
- Version: 1.0.0
- Creation Date: [YYYY-MM-DD]
- Status: Draft
- Author: [Author Name]

## I. Story Summary

### Logline (Elevator Pitch)
[Describe story core within 30 words]

### Story Brief (100-200 words)
[Expanded description, including main conflict and ending hint]

### Core Theme
- Theme: [e.g., "Growth", "Redemption", "Revenge"]
- Deeper Meaning: [What to express]
- Emotional Core: [What reader should feel]

## II. Target Positioning

### Target Audience Persona
- Age Group: [Needs Clarification: Specific age range]
- Gender Inclination: [Needs Clarification: Male/Female/General]
- Reading Level: [Needs Clarification: Beginner/Advanced/Veteran]
- Genre Preference: [Fantasy/Urban/Historical etc.]
- Reading Scenario: [Fragmented time/Deep reading]

### Market Positioning
- Main Genre: [Needs Clarification: Page-turner/Mystery/Romance/Serious Lit/Sci-Fi/Fantasy/History/Urban/Other]
- Sub-genre: [Specific genre, e.g., System/Honkaku Mystery/CEO Romance etc.]
- Genre Fusion: [If any, e.g., Mystery + Romance]
- Genre Tags: [Main Tag] + [Sub Tag]
- Competitor Analysis: Similar to [Feature] of [Work 1] + [Feature] of [Work 2]
- Differentiation: [Needs Clarification: What is core selling point]

## III. Success Criteria

### Quantitative Indicators
- Target Word Count: [Needs Clarification: 30k/100k/500k]
- Update Frequency: [Needs Clarification: Daily/Weekly/Monthly]
- Completion Time: [Estimated duration]
- Commercial Goal: [If applicable]

### Quality Standards
- Logic Consistency: [Must/Should] no obvious loopholes
- Character Fullness: Protagonist has [X] layers, Support has [Y] layers
- Plot Compactness: [Needs Clarification: Conflict every chapter/Allow transition chapters]
- Writing Level: [Needs Clarification: Easy to understand/Literary/Professional]

### Reader Feedback Indicators
- Target Score: [If applicable]
- Interaction Rate: [Comment/Favorite ratio]
- Completion Rate: [Expected reader completion]

## IV. Core Requirements

### Must Include (P0)
1. [Core Plot Element 1]
2. [Core Character Relationship]
3. [Core Conflict Setting]
4. [Necessary World Element]

### Should Include (P1)
1. [Elements Enhancing Experience]
2. [Content Deepening Theme]
3. [Sub-lines Enriching Characters]

### Can Include (P2)
1. [Icing on the Cake Content]
2. [Optional Sub-lines]
3. [Extra Easter Eggs]

## V. Clue Management Specification

> **Multi-Thread Management Note**: This chapter defines all story clues (main, sub) and their management strategies, solving problems like parallel advancement, intersection timing control, and consistency assurance after modification.

### 5.1 Clue Definition Table

Define basic info for all story clues:

| Clue ID | Clue Name | Type | Priority | Chapter Range | Core Conflict | Main Characters |
|-------|---------|------|--------|---------|---------|---------|
| PL-01 | [Clue 1 Name, e.g., "Family Line"] | Main/Sub/Support | P0/P1/P2 | [Start-End Chapter] | [Core Conflict of Clue] | [Main Characters Involved] |
| PL-02 | [Clue 2 Name, e.g., "Love Line"] | Main/Sub/Support | P0/P1/P2 | [Start-End Chapter] | [Core Conflict of Clue] | [Main Characters Involved] |

**Description**:
- Clue ID format: PL-XX (Abbr. of Plotline)
- Type: Main (Drives story), Sub (Enriches plot), Support (Serves main)
- Priority: P0 (Must), P1 (Important), P2 (Optional)

### 5.2 Clue Pacing Planning

Plan activity level of each clue in different stages:

| Clue ID | Volume 1 | Volume 2 | Volume 3 | Volume 4 |
|-------|--------|--------|--------|--------|
| PL-01 | ⭐⭐⭐ Active | ⭐⭐ Medium | ⭐ Background | ⭐⭐⭐ Active |
| PL-02 | ⭐⭐ Start | ⭐⭐⭐ Active | ⭐⭐⭐ Active | ⭐⭐ End |

**Description**:
- ⭐⭐⭐ Active: Focus of this volume, large space
- ⭐⭐ Medium: Normal progress, moderate space
- ⭐ Background: Occasionally mentioned, maintain presence
- ❌ Not Appeared: Clue not started

### 5.3 Clue Intersection Planning

Pre-plan intersection points between clues to avoid AI randomness:

| Intersection ID | Chapter | Involved Clues | Intersection Content | Expected Effect |
|---------|------|---------|---------|---------|
| X-001 | [Chapter No.] | PL-XX+PL-YY | [How two/more clues intersect, what happens] | [Impact on story and characters] |
| X-002 | [Chapter No.] | PL-XX+PL-YY+PL-ZZ | [Specific content of intersection] | [Expected effect] |

**Description**:
- Intersection ID format: X-XXX (First letter of Intersection)
- Involved Clues: List all clue IDs intersecting here
- Intersection Content: Specific plot or event
- Expected Effect: Emotional conflict, plot twist, character growth, etc.

### 5.4 Foreshadowing Management Table

Manage planting and revealing of all foreshadowing, ensuring no omissions:

| Foreshadowing ID | Plant Chapter | Involved Clues | Content | Reveal Chapter | Reveal Method |
|-------|---------|---------|---------|---------|---------|
| F-001 | [Chapter No.] | PL-XX | [What foreshadowing planted, specific content] | [Chapter No.] | [How revealed, through what event] |
| F-002 | [Chapter No.] | PL-XX+PL-YY | [Cross-clue foreshadowing content] | [Chapter No.] | [Reveal Method] |

**Description**:
- Foreshadowing ID format: F-XXX (First letter of Foreshadowing)
- Involved Clues: Clues related to foreshadowing, may cross multiple clues
- Plant and Reveal chapter numbers must be explicit to avoid forgetting

### 5.5 Clue Modification Decision Matrix

When needing to modify a clue, must assess impact via this flow:

**Modification Checklist**:
1. Check Section 5.2: In which volumes is this clue active? Does activity need adjustment?
2. Check Section 5.3: Which intersections does this clue involve? Does intersection timing need change?
3. Check Section 5.4: Which foreshadowings does this clue involve? Does planting/revealing need adjustment?
4. Check creative-plan.md: Which chapter segments need synchronous modification?
5. Check tasks.md: Which writing tasks need replanning?
6. Check plot-tracker.json: What is current progress, how to adjust subsequently?

**Example**: Assume modifying PL-03 (Love Line), advancing a character's appearance to Chapter 50 (originally planned Chapter 100):
- ✅ Intersection X-004 needs to be advanced or cancelled
- ✅ Active clues in Volume 2 chapter segments need adjustment
- ✅ "Involved Clues" field in related tasks needs update
- ✅ May affect reveal timing of foreshadowing F-002

### 5.6 Clue Consistency Principles

**Planning Principles**:
- Each clue must have clear beginning, development, twist, and end
- Main line occupies 40-60% of total space
- Sub-lines not exceed 2-3, avoid being too scattered
- Clue intersection should serve theme, not intersect for intersection's sake
- Clues dormant for long time (>20 chapters) must have reasonable reason

**Verification Standards**:
- [ ] All clues have clear conflicts and solutions
- [ ] Clue pacing distribution reasonable, no over-concentration or blank
- [ ] Intersection quantity moderate (Suggest 2-3 every 50 chapters)
- [ ] Foreshadowings have corresponding reveal plans
- [ ] Modification decision matrix actionable

## VI. Constraints

### Content Red Lines
- Absolutely Prohibited: [e.g., Illegal content]
- Need to Avoid: [e.g., Sensitive topics]
- Handle Carefully: [Needs Clarification: How to handle emotional relationships]

### Creative Constraints
- Knowledge Limit: [Needs Clarification: Whether professional knowledge needed]
- Time Limit: [Completion deadline]
- Resource Limit: [e.g., Reference materials needed]

### Technical Constraints
- Publishing Platform: [Needs Clarification: Web novel platform/Publishing/Self-media]
- Format Requirement: [Chapter length etc.]
- Update Requirement: [Fixed time etc.]

## VII. Risk Assessment

### Creative Risk
- Writing Difficulty: [Needs Clarification: Where is the challenge]
- Inspiration Exhaustion: [How to cope]
- Logic Loopholes: [Complexity assessment]
- Multi-thread Management: [Needs Clarification: Whether too many clues]

### Market Risk
- Homogeneity: [How to differentiate]
- Reader Acceptance: [Needs Clarification: Whether innovation excessive]
- Timeliness: [Whether subject will be outdated]

## VIII. Core Decision Points [Needs Clarification]

The following key decisions need to be clarified in `/clarify` stage:
1. [Decision 1: e.g., Protagonist personality hot-blooded or calm]
2. [Decision 2: e.g., Ending open or happy]
3. [Decision 3: e.g., Narrative single line or multi-line]
4. [Decision 4: e.g., Pacing fast or slow]
5. [Decision 5: e.g., Style relaxed or serious]

## IX. Verification Checklist

- [ ] Story summary clear and definite
- [ ] Target audience defined accurately
- [ ] Success criteria measurable
- [ ] Core requirements listed
- [ ] Clue management specification defined
- [ ] Constraints identified
- [ ] Risks assessed
- [ ] Key decision points marked

## Appendix: Reference Materials

### Inspiration Sources
- [Source 1]
- [Source 2]

### Reference Works
- [Work 1]: Refer to its [Feature]
- [Work 2]: Refer to its [Feature]

### Supplementary Explanation
[Other contents needing explanation]
```

### 4. Output Specification Based on Level

**Select corresponding template output based on level judged in Step 0**:

- **Level 1**: Output logline spec + core element identification + expansion guidance
- **Level 2**: Output premise spec + core elements + genre positioning + expansion guidance
- **Level 3**: Output one-page spec + three-act structure + key scenes + expansion guidance
- **Level 4**: Output full nine-chapter spec + `[Needs Clarification]` markers

**Post-output Hints**:

For Level 1-3, inform user upon completion:
```
✅ Level X Specification Completed!

**Current Progress**: Logline → Premise → One-Page → Full Spec
                  [=====---] (You are here)

**Next Step Options**:
1. Start creation directly using current specification (Suitable for rapid prototyping)
2. Expand to next level (More detailed planning)
3. Run `/clarify` to clarify current specification

**How to Expand**:
- Provide more detailed story description
- Run `/specify [detailed description]` again
- System will automatically upgrade to Level X+1
```

For Level 4, inform user upon completion:
```
✅ Full Specification Completed!

**Next Step**:
1. Run `/clarify` to clarify all [Needs Clarification] marked decision points
2. Or run `/plan` directly to start formulating creative plan
```

### 5. Mark Points Needing Clarification (Level 4 Only)

**Only in Level 4 Full Specification** mark all decision points needing further clarification:
- Use `[Needs Clarification: Specific Question]` format
- Ensure marking 5-10 key decision points
- These will be handled in `/clarify` step

**Level 1-3 do not need to mark clarification points**, as they are progressive clarification processes themselves

### 6. Version Management

**Progressive Version Number Rules**:

- **Level 1**: 1.0.0-L1 (Logline)
- **Level 2**: 1.1.0-L2 (Premise)
- **Level 3**: 1.2.0-L3 (One-Page)
- **Level 4**: 1.0.0 (Full Spec - Draft)
- **After Clarify**: 1.1.0 (Clarified)
- **After Plan**: 1.2.0 (Confirmed)
- **In Execution**: 2.0.0 (Execution)

**Upgrade Rules**:
- Level 1 → Level 2: Minor version +1
- Level 2 → Level 3: Minor version +1
- Level 3 → Level 4: Reset to 1.0.0 (Enter formal spec cycle)
- Level 4 subsequent modification: Follow original rules

### 7. Output and Save

- Save specification to `stories/[story-name]/specification.md`
- Output creation success message
- **Prompt next step based on level**:
  - Level 1-3: Hint how to expand to next level
  - Level 4: Hint to run `/clarify` to clarify key decisions

## Notes

### Value of Progressive Specification

**Why Progressive Specification?**
- ✅ **Lower Threshold**: Start from one sentence, no need to complete full spec at once
- ✅ **Rapid Validation**: Verify if idea is feasible before investing much effort
- ✅ **Natural Evolution**: Expand details naturally as thinking deepens
- ✅ **Avoid Over-planning**: Decide spec depth based on actual needs

**When to use which level?**
- **Level 1**: Inspiration stage, quickly record ideas
- **Level 2**: Validation stage, confirm if story is worth writing
- **Level 3**: Prototype stage, start writing quickly (Suitable for short, medium stories)
- **Level 4**: Formal stage, long novels or works needing detailed planning

### Focus on WHAT not HOW
- ✅ Correct: "Need an antagonist that readers hate to the bone"
- ❌ Wrong: "Antagonist appears in Chapter 3, using flashback technique"

### Keep Specification Flexible
- Leave room for clarification (Level 4)
- Don't determine details too early (Level 1-3)
- Mark all uncertain points (Level 4)

### Principles of Progressive Expansion
- **Inheritance**: Level N+1 should contain all content of Level N
- **Incrementality**: Only add necessary details each time
- **Reversibility**: Can go back to lower level to modify core elements
- **Jumpability**: Can jump directly from Level 1 to Level 4 (if already thought through)

### Relationship with Subsequent Steps
- **Level 1-3**: Can start writing directly (Suitable for exploratory creation)
- **Level 4**: Run `/clarify` to handle all `[Needs Clarification]` markers
- **After Clarify**: Run `/plan` to formulate creative plan
- **During Execution**: Run `/analyze` to verify if implementation meets specification

Remember: **Specification defines the goal, not the path. Progressive specification takes you from vague to clear, rather than demanding clarity from the start.**
