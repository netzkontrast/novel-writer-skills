---
description: Create or update the novel writing constitution, defining non-negotiable creative principles
argument-hint: [description of creative principles]
allowed-tools: Write(//memory/constitution.md), Write(memory/constitution.md), Read(//memory/**), Read(memory/**), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/constitution.sh
  ps: .specify/scripts/powershell/constitution.ps1
---

User Input: $ARGUMENTS

## Goal

Establish the core principles and values of novel creation, forming the "Constitution" document. These principles will guide all subsequent creative decisions.

## Execution Steps

### 1. Check Existing Documents

**First check if style reference document exists** (from `/book-internalize`):
```bash
test -f memory/style-reference.md && echo "exists" || echo "not-found"
```

- If exists, use Read tool to read `memory/style-reference.md`.
- Then tell user: "Detected that you have completed benchmark work analysis, I will draft the constitution referencing that style."

**Then check existing constitution**:
```bash
test -f memory/constitution.md && echo "exists" || echo "not-found"
```

- If exists (output "exists"), use Read tool to read `memory/constitution.md` and prepare for update.
- If not exists (output "not-found"), skip reading step and prepare to create new constitution directly.

### 2. Collect Creative Principles

Based on user input, collect principles in the following dimensions (ask or infer if not provided):

#### Core Values
- What core idea does the work convey?
- What are the absolute bottom lines that cannot be violated?
- What is the fundamental purpose of creation?

#### Quality Standards
- Logic consistency requirements
- Writing quality standards
- Update frequency commitment
- Completion guarantee

#### Creative Style Principles
- Narrative style (Concise/Flowery/Plain/Poetic)
- Pacing control (Fast/Slow/Balanced)
- Emotional tone (Hot-blooded/Deep/Relaxed/Serious)
- Language features (Archaic/Modern/Colloquial/Formal)

#### Content Principles
- Character Shaping Principles
  - Every character must have complete motivation
  - Character growth must be logical
  - Dialogue must match character identity
- Plot Design Principles
  - Conflict design principles
  - Turning point rationality requirements
  - Foreshadowing recovery principles
- World Building Principles
  - Setting self-consistency requirements
  - Detail authenticity standards
  - Cultural research requirements

#### Reader Orientation Principles
- Target audience positioning
- Reader experience guarantee
- Interaction feedback principles

#### Creative Discipline
- Daily writing norms
- Revision and refinement process
- Version management principles

### 3. Draft Constitution Document

Use the following template structure:

```markdown
# Novel Creation Constitution

## Metadata
- Version: [Version Number, e.g., 1.0.0]
- Creation Date: [YYYY-MM-DD]
- Last Revision: [YYYY-MM-DD]
- Author: [Author Name]
- Work: [Work Name or "General"]

## Preamble
[Explain why this constitution is needed and its binding force]

## Chapter 1: Core Values

### Principle 1: [Principle Name]
**Statement**: [Explicit statement of the principle]
**Reason**: [Why this principle is important]
**Execution**: [How to embody it in creation]

### Principle 2: [Principle Name]
[Same format as above]

## Chapter 2: Quality Standards

### Standard 1: Logic Consistency
**Requirement**: [Specific requirement]
**Verification Method**: [How to verify]
**Consequence of Violation**: [Must correct]

[More standards...]

## Chapter 3: Creative Style

### Style Principle 1: [Name]
**Definition**: [What is this style]
**Example**: [Specific example]
**Taboo**: [What absolutely not to do]

[More style principles...]

## Chapter 4: Content Norms

### Character Shaping Norms
[Specific norms content]

### Plot Design Norms
[Specific norms content]

### World Building Norms
[Specific norms content]

## Chapter 5: Reader Contract

### Commitment to Readers
- [Commitment 1]
- [Commitment 2]
- [Commitment 3]

### Bottom Line Guarantee
- [Guarantee 1]
- [Guarantee 2]

## Chapter 6: Revision Procedure

### Revision Trigger Conditions
- Major creative direction adjustment
- Accumulated reader feedback
- Personal growth and cognitive change

### Revision Process
1. Propose revision motion
2. Assess impact
3. Update version
4. Record changes

## Appendix: Version History
- v1.0.0 (Date): Initial version
- [Subsequent version records]
```

### 4. Version Management

- **Major Version**: Major principle change or deletion
- **Minor Version**: New principle or chapter added
- **Revision**: Wording optimization, clarification

### 5. Consistency Propagation

Check and update related files to maintain consistency:
- Reference constitution principles in subsequent commands
- Suggest updating creative philosophy section in README

### 6. Generate Impact Report

Output impact of constitution creation/update:
```markdown
## Constitution Impact Report
- Version: [Old Version] → [New Version]
- Added Principles: [List]
- Modified Principles: [List]
- Impact Scope:
  ✅ Specification definition must follow constitution
  ✅ Plan development must comply with principles
  ✅ Creative execution must observe norms
  ✅ Verification must check compliance
```

### 7. Output and Save

- Save constitution to `memory/constitution.md`
- Output creation/update success message
- Prompt next step: `/specify` to define story specifications

## Execution Principles

### Must Observe
- Principles must be verifiable, not too abstract
- Use explicit words like "Must", "Prohibit"
- Every principle must have a clear reason

### Should Include
- At least 3-5 core values
- Clear quality bottom lines
- Operable creative norms

### Avoid
- Vague slogans (e.g., "Pursue excellence")
- Unverifiable requirements
- Clauses that excessively restrict creativity

## Example Principles

**Good Principles**:
- "Major characters' actions must have a clear chain of motivation, no 'because plot requires it' actions allowed"
- "Every foreshadowing must be recovered or explained within a reasonable time (max 10 chapters)"
- "Never use modern internet slang to break immersion in ancient settings"

**Bad Principles**:
- "Write well" (Too vague)
- "Pursue artistry" (Unverifiable)
- "Satisfy readers" (Standard unclear)

## Subsequent Process

Once constitution is established, all subsequent creative steps must follow:
1. `/specify` - Specifications must comply with constitution values
2. `/plan` - Plans must follow constitution principles
3. `/write` - Creation must observe constitution norms
4. `/analyze` - Verification must check constitution compliance

Remember: **The Constitution is the highest guideline, but can also be revised with the times.**
