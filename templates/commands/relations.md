---
name: relations
description: Manage and track character relationship changes
argument-hint: [update | show | history | check] [character] [relation] [target_character]
allowed-tools: Read(//spec/tracking/relationships.json), Read(spec/tracking/relationships.json), Write(//spec/tracking/relationships.json), Write(spec/tracking/relationships.json), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/manage-relations.sh
  ps: .specify/scripts/powershell/manage-relations.ps1
---

# Character Relationship Management

Track and manage character relationship dynamics, ensuring reasonable relationship development.

## Features

1. **Relationship Network** - Maintain relationship graph between characters
2. **Relationship Changes** - Record history of relationship evolution
3. **Faction Management** - Track opposition and cooperation between factions
4. **Emotion Tracking** - Manage emotional development between characters

## Usage

Execute script {SCRIPT} [Action] [Parameters]:
- `update` - Update character relationship
- `show` - Show relationship network
- `history` - View relationship change history
- `check` - Verify relationship logic

Example:
```
{SCRIPT} update Li_Zhongyong allies Shen_Yuqing --chapter 61 --note Helped when first entering Hanlin
# PowerShell:
{SCRIPT} -Command update -A Li_Zhongyong -Relation allies -B Shen_Yuqing -Chapter 61 -Note "Helped when first entering Hanlin"
```

## Data Storage

Relationship data is stored in `spec/tracking/relationships.json`:
```json
{
  "characters": {
    "Protagonist": {
      "Allies": ["CharacterA", "CharacterB"],
      "Enemies": ["CharacterC"],
      "Love Interest": ["CharacterD"],
      "Unknown": ["CharacterE"]
    }
  },
  "factions": {
    "Reformists": ["Protagonist", "CharacterA"],
    "Conservatives": ["CharacterC", "CharacterF"]
  }
}
```

## Output Example

```
👥 Character Relationship Network
━━━━━━━━━━━━━━━━━━━━
Protagonist: Li Zhongyong
├─ 💕 Love Interest: Shen Yuqing
├─ 🤝 Ally: Zhang Juzheng (Hidden)
├─ 📚 Mentor: Matteo Ricci
├─ ⚔️ Enemy: Shen Shixing Faction
└─ 👁️ Surveillance: Eastern Depot

Faction Opposition:
Reformists ←→ Conservatives
Donglin Party ←→ Eunuch Party

Recent Changes (Chapter 60):
- Shen Yuqing: Stranger → Mutual Attraction
- Zhang Juzheng: Unknown → Master-Apprentice Relationship
```
