---
description: Execute chapter writing based on task list, automatically loading context and validation rules
argument-hint: [chapter number or task ID]
allowed-tools: Read(//**), Write(//stories/**/content/**), Bash(ls:*), Bash(find:*), Bash(wc:*), Bash(grep:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/check-writing-state.sh
  ps: .specify/scripts/powershell/check-writing-state.ps1
---

Execute chapter writing based on the seven-step methodology.
---

## Prerequisite Checks

1. Run script `{SCRIPT}` to check creative status

### Query Protocol (Mandatory Order)

⚠️ **Important**: Strictly follow the query order below to ensure context completeness and correct priority.

**Query Order**:
1. **Check First (Highest Priority)**:
   - `memory/constitution.md` (Creative Constitution - Highest Principle)
   - `memory/style-reference.md` (Style Reference - If generated via `/book-internalize`)

2. **Check Second (Spec and Plan)**:
   - `stories/*/specification.md` (Story Specification)
   - `stories/*/creative-plan.md` (Creative Plan)
   - `stories/*/tasks.md` (Current Tasks)

2.5. **Auto-Load Writing Style and Requirements (Based on Config)**:
   - Read YAML frontmatter of `specification.md`
   - Check if `writing-style` is configured
   - Check if `writing-requirements` is configured

   **If writing-style configured**, load corresponding style doc:
   ```yaml
   ---
   writing-style: natural-voice
   ---
   ```
   Read: `.claude/knowledge-base/styles/natural-voice.md`

   **If writing-requirements configured**, load corresponding requirement docs:
   ```yaml
   ---
   writing-requirements:
     - anti-ai-v4
     - fast-paced
   ---
   ```
   Read:
   - `.claude/knowledge-base/requirements/anti-ai-v4.md`
   - `.claude/knowledge-base/requirements/fast-paced.md`

   ⚠️ **Priority Note**:
   - Style docs (styles) have **higher** priority than old specs in spec/presets/
   - Requirement docs (requirements) are **additive** (all configured requirements apply)
   - If not configured, use default specs in spec/presets/

3. **Check Third (State and Data)**:
   - `spec/tracking/character-state.json` (Character State)
   - `spec/tracking/relationships.json` (Relationship Network)
   - `spec/tracking/plot-tracker.json` (Plot Tracker - If any)
   - `spec/tracking/validation-rules.json` (Validation Rules - If any)

4. **Check Fourth (Knowledge Base)**:
   - `spec/knowledge/` related files (World Building, Character Profiles, etc.)
   - `stories/*/content/` (Previous Content - Understand context)

5. **Check Fifth (Writing Specifications)**:
   - `memory/personal-voice.md` (Personal Voice - If any)
   - `spec/knowledge/natural-expression.md` (Natural Expression - If any)
   - `spec/knowledge/punctuation-personality.md` (Punctuation Personality - If any)
   - `spec/knowledge/detail-formulas.md` (Detail Formulas - If any)
   - `spec/presets/anti-ai-detection.md` (Anti-AI Detection Specs)

6. **Conditional Query (First 3 Chapters Only)**:
   - **If chapter number ≤ 3 or total words < 10000**, additionally query:
     - `spec/presets/golden-opening.md` (Golden Opening Rules)
     - Strictly follow the five major rules therein

### ⚠️ Mandatory Completion Confirmation (Key to Solving Focus Loss)

**Before starting to write, you must explicitly list the core files read**:

```markdown
📋 Pre-writing Checklist (Completed):

✓ 1. memory/constitution.md - Creative Constitution
✓ 2. memory/style-reference.md - Style Reference (If any)
✓ 3. stories/*/specification.md - Story Specification
✓ 4. stories/*/creative-plan.md - Creative Plan
✓ 5. stories/*/tasks.md - Current Tasks
✓ 6. spec/tracking/character-state.json - Character State
✓ 7. spec/tracking/relationships.json - Relationship Network
✓ 8. spec/tracking/plot-tracker.json - Plot Tracker (If any)
✓ 9. spec/tracking/validation-rules.json - Validation Rules (If any)

🎨 Writing Style and Requirements (Based on Config):
✓ Writing Style: [style-name] (If configured) or Not Configured
✓ Writing Requirements: [requirement-1, requirement-2, ...] (If configured) or Not Configured

📊 Context Load Status: ✅ Completed
```

**If any file does not exist or read fails, must explicitly state reason**.

**Style and Requirement Note**:
- If `writing-style` or `writing-requirements` configured in specification.md, must list specific loaded documents
- Example: "Writing Style: natural-voice", "Writing Requirements: anti-ai-v4, fast-paced"
- If not configured, mark "Not Configured" and use default specs

⚠️ **Do not skip this step**: This is the core mechanism to prevent AI from losing focus in long-form creation. Only after completing this confirmation can you proceed to the next writing step.

<!-- PLUGIN_HOOK: genre-knowledge-write -->
<!-- Plugin Enhancement Area: Style Application
     If you installed genre-knowledge plugin, insert style application enhancement prompts here
     Ref: "2.3 Enhance /write command" in plugins/genre-knowledge/README.md
-->

## Writing Execution Flow

### 1. Select Writing Task
Select writing task with status `pending` from `tasks.md`, mark as `in_progress`.

### 2. Verify Prerequisites
- Check if dependent tasks completed
- Verify if necessary settings ready
- Confirm if previous chapters completed

### 3. Pre-writing Reminders
**Reminders based on Constitution Principles**:
- Core value points
- Quality standard requirements
- Style consistency guidelines

**Reminders based on Specification Requirements**:
- P0 Must Include elements
- Target audience characteristics
- Content red line reminders

**Reminders based on Writing Style and Requirements (If Configured)**:
- Currently active writing style and its core principles
- Currently active writing requirements and key demands
- Explanation of combined effect of style and requirements
- Taboos and points needing special attention

**Example**:
```
🎨 Current Writing Configuration:
- Style: natural-voice
  - Colloquial priority, dialogue drives plot
  - Action > Psychology, Concrete > Abstract

- Requirements: anti-ai-v4 + fast-paced
  - 200+ banned words, adjective limit
  - At least 2 satisfaction points per chapter, tight pacing

Combined Effect: Natural fluent fast-paced page-turner
```

**Paragraph Format Specification (Important)**:
- ⛔ **Prohibit**: Using "One", "Two", "Three" etc. number markers for sections
- ✅ **Use**: Use two empty lines (one blank line) to separate scene transitions
- 📖 **Reason**: Number markers are too rigid, destroy reading immersion, do not fit web novel habits

**Anti-AI Detection Writing Specs (Based on Tencent Zhuque Standard)**:

⚠️ **Important Context**: AI coding tools use low temperature parameters, but traditional "compensation methods" (forcing detail stacking) lead to over-description, increasing AI characteristics. Following specs based on tested passing standards (AI density 0%).

### 📏 Paragraph Structure Specs (Critical) ⭐

**Single Sentence Paragraph Ratio**:
- ✅ **30%-50% of paragraphs should be single sentence**
- ✅ **Control each paragraph within 50-100 words**
- ✅ **Key info in independent paragraph**

**Example Contrast**:

❌ **AI Style** (Over-description, 95% AI density):
> The room was permeated with a musty smell, the only light source being the pale moonlight through the curtain gap. He groped along the wall, fingertips touching the cold stone wall, until his knee hit the table corner—a tottering wooden table, covered in dust.

✅ **Natural Style** (Concise restrained, 0% AI density):
> After the Yongjia chaos, the Central Plains were occupied by foreign tribes.
>
> Han gentry and commoners, except for a few unwilling to leave home, mostly crossed the river south.
>
> Wang Qiao recruited a hundred refugees over these years to farm for him.

### 🚫 Prohibited List (Anti-AI Tone)

1. **Prohibit Meaningless Stacking**
   - ❌ Don't force "3 senses"
   - ❌ Don't list emotional descriptions
   - ✅ One accurate detail beats three stacked ones

2. **Prohibit Flowery Metaphors**
   - ❌ "Tottering wooden table", "Air solidified"
   - ✅ Direct description: "An old wooden table", "Silence"

3. **Prohibit Over-dramatization**
   - ❌ "Before words fell, she turned and left. He rushed up to grab..."
   - ✅ Concise handling: "She turned and left. He chased up."

4. **Prohibit Explanatory Dialogue**
   - ❌ "I am angry because you didn't come yesterday"
   - ✅ "Where were you yesterday?" "...None of your business."

5. **Prohibit Direct Psychological Description**
   - ❌ "He thought secretly, this matter is not simple"
   - ✅ Hint through behavior: "He frowned tight."

### ✅ Natural Writing Principles

**1. Historical Line Drawing** (Ancient Background)
- State facts, no embellishment
- Example: "Over these years, Wang Qiao recruited a hundred refugees to farm for him."

**2. Colloquial Processing** (Dialogue)
- Add grammar errors, pauses, repetitions
- Example: "Most people went south" (Instead of formal "The majority of the population...")

**3. Short Sentence Rhythm** (Narrative)
- Single sentence 15-25 words
- Key info in independent paragraph

**4. Restrained Description** (Scene)
- 1-2 details per scene is enough
- ❌ Don't write: "The room was permeated with musty smell, walls cold, light dim..."
- ✅ Write: "The room was dark." (Enough)

### 📊 Self-Check Standards

Check after writing a paragraph:
- [ ] Is single sentence paragraph ratio 30%-50%?
- [ ] Is each paragraph 50-100 words?
- [ ] Are there AI high frequency words like "the only", "until", "permeate"?
- [ ] Is sensory detail stacking forced?
- [ ] Is dialogue too complete (missing pauses, errors)?
- [ ] Are metaphors too flowery?

**AI High Frequency Word Blacklist**:
- "The only", "Until", "Permeated with", "Tottering"
- "Air solidified", "Words not fallen", "Suddenly"
- "Couldn't help but", "Instantly", "Thought secretly"
- "Frowned", "Sighed"

**Replacement Strategy**:
| ❌ AI Word | ✅ Natural Replacement |
|---------|----------|
| Permeated with musty smell | Smelled musty |
| Only light source | Only a little light |
| Tottering wooden table | An old wooden table |
| He thought secretly | He thought / Delete |
| Words not fallen | Before he finished / Delete |

### 4. Real-time Assist Mode (Optional)

**If user encounters difficulty during writing**, such as:
- "Help me think what the protagonist should do"
- "How to develop the plot next?"
- "Give me a few options"

**You can proactively provide 2-3 action options**, e.g.:

> **Plot Development Suggestion**:
>
> **Option A (Active)**: Protagonist strikes directly, uses Golden Finger to crush opponent
> - Pro: Direct satisfaction, strong reader fulfillment
> - Risk: Protagonist might seem too powerful
>
> **Option B (Strategic)**: Protagonist hides strength, outsmarts opponent
> - Pro: Shows protagonist wisdom, adds suspense
> - Risk: Pacing might be slightly slow
>
> **Option C (Unexpected)**: Introduce new variable, interrupt current conflict
> - Pro: Adds complexity, introduces new clue
> - Risk: Reader might feel interrupted

**Then continue creating content based on user selection**.

⚠️ **Note**: This is assist mode, do not proactively provide options unless user explicitly requests help.

---

### 5. Create Content Based on Plan:
   - **Opening**: Attract reader, continue from previous text
   - **Development**: Advance plot, deepen character
   - **Twist**: Create conflict or suspense
   - **Closing**: Appropriate wrap-up, lead to next text

### 6. Quality Self-Check

**Constitution Compliance Check**:
- Fits core values
- Meets quality standards
- Maintains style consistency

**Specification Compliance Check**:
- Includes necessary elements
- Fits target positioning
- Observes constraints

**Plan Execution Check**:
- Follows chapter architecture
- Fits pacing design
- Meets word count requirement

**Format Specification Check**:
- ⚠️ Confirm no "One", "Two", "Three" number markers used
- ✅ Scene transition uses two empty lines
- ✅ Maintain natural fluent paragraph spacing

### 📊 Concretization Checklist (Key to De-AI) ⭐

After writing a paragraph, proactively identify and replace abstract expressions:

#### 🔍 Identify Abstract Expressions

**Time Abstract** ❌ → **Concrete** ✅
- "Recently" → "Last Wednesday afternoon"
- "Long ago" → "Autumn three years ago"
- "Not long ago" → "Yesterday morning at eight"
- "After a long time" → "Waited for two whole hours"

**Character Abstract** ❌ → **Concrete** ✅
- "Many people" → "At least 5 friends around me"
- "Some say" → "Uncle Li told me" / "Old Wang next door mentioned"
- "Everyone knows" → "Old people in the village say"
- "It is said" → "Heard Uncle Wang say privately"

**Quantity Abstract** ❌ → **Concrete** ✅
- "Effect very good" → "Harvested three more stone of grain than last time" / "Guests doubled compared to usual"
- "Very expensive" → "Spent three hundred on a meal"
- "Very far" → "Two hours drive"
- "A lot" → "At least twenty"

**Scene Abstract** ❌ → **Concrete** ✅
- "Room very messy" → "Clothes unwashed for three days piled on floor"
- "Weather very cold" → "White mist visible when breathing"
- "Very tired" → "Walked mountain road for five whole hours"
- "Atmosphere tense" → "No one spoke, only clock ticking heard"

#### 💡 Proactive Search Suggestions

**Consider using WebSearch to get real details when encountering**:
- Historical events: Search real dates, people, places
- Technical details: Search actual parameters, professional terms
- Geographic info: Search real place names, distances, landmarks
- Cultural customs: Search local dialects, customs, specialties
- Data support: Search real statistics, cases, news

**Search Formula**:
```
- "Ancient China [Dynasty] Official System"
- "[City Name] Special Dialect Words"
- "[Era] Real Historical Events"
- "[Industry] Professional Terminology"
```

#### ✅ Concretization Self-Check Questions

- [ ] Is time specific? (Avoid "recently", "long time")
- [ ] Is character source clear? (Avoid "someone", "everyone")
- [ ] Is quantity precise? (Avoid "many", "a lot")
- [ ] Are scene details visible? (Avoid "very xx" adjectives)
- [ ] Used real place names/person names/data?
- [ ] Does dialogue have specific content? (Avoid "he said a lot")

#### 📌 Concretization Notes

**Moderation Principle**:
- ✅ Key plot must be concrete: Twist, climax, foreshadowing
- ✅ Important details must be concrete: First impression, key props
- ⚠️ Minor info can be summarized: Transition paragraphs, background laying
- ❌ Avoid over-concretization: Trivial log, wordy

**Scene Adaptation**:
- Ancient Background: Historical line drawing, moderate concretization
- Modern Background: Life details, high concretization
- Fantasy Background: World setting, moderate concretization

**Example Contrast**:

❌ **Abstract Version** (AI Tone):
```
Recently many things happened in the city, everyone is discussing. Wang Qiang heard and was worried, decided to check the situation.
```

✅ **Concrete Version** (Realism):
```
Since last Wednesday, Aunt Li at the vegetable market has been saying something happened on East Street.

Wang Qiang listened for two days, couldn't help asking: "What exactly happened?"

"Someone died!" Aunt Li lowered her voice, "Heard it was Old Zhang who runs the supermarket..."

Wang Qiang's heart tightened. He knew Old Zhang, bought rice from him just last month.

He decided to go check this afternoon.
```

**Concretization Effect Contrast**:
- Time: Recently → Last Wednesday
- Place: City → East Street, Vegetable Market
- Character: Everyone → Aunt Li, Old Zhang
- Event: Many things → Someone died, supermarket owner
- Detail: Heard → Lowered voice, bought rice last month

### 7. Save and Update
- Save chapter content to `stories/*/content/`
- Update task status to `completed`
- Record completion time and word count

## Writing Points

- **Follow Constitution**: Always comply with creative principles
- **Meet Specification**: Ensure necessary elements included
- **Execute Plan**: Proceed according to technical scheme
- **Complete Tasks**: Systematically advance task list
- **Continuous Verification**: Periodically run `/analyze` to check

## Post-Completion Actions

### 8. Verify Word Count and Update Progress

**Word Count Note**:
- Use accurate word count method
- Exclude Markdown markers (`#`, `*`, `-` etc.)
- Only count actual content characters
- Word count requirement from `spec/tracking/validation-rules.json` (Default 2000-4000 words)

**Verification Method**:
Use provided script to verify chapter word count:
```bash
source scripts/bash/common.sh
count_chinese_words "stories/*/content/ChapterX.md"
```

⚠️ **Note**: Do not use `wc -w`, it is inaccurate for Chinese!

**Completion Report**:
```
✅ Chapter Writing Completed
- Saved: stories/*/content/ChapterX.md
- Actual Words: [X] words
- Requirement: 2000-4000 words
- Status: ✅ Compliant / ⚠️ Insufficient / ⚠️ Exceeded
- Task Status: Updated
```

### 9. Suggest Next Step
- Continue next writing task
- Run `/analyze` every 5 chapters for quality check
- Adjust plan timely if issues found

## Relationship with Methodology

```
/constitution → Provide creative principles
     ↓
/specify → Define story requirements
     ↓
/clarify → Clarify key decisions
     ↓
/plan → Formulate technical scheme
     ↓
/tasks → Breakdown execution tasks
     ↓
/write → [Current] Execute writing
     ↓
/analyze → Verify quality consistency
```

Remember: Writing is the execution layer, must strictly follow the specification and plan from above.
