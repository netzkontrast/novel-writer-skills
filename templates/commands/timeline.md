---
name: timeline
description: Manage and verify story timeline
argument-hint: [add | check | show | sync]
allowed-tools: Read(//spec/tracking/timeline.json), Read(spec/tracking/timeline.json), Write(//spec/tracking/timeline.json), Write(spec/tracking/timeline.json), Read(//stories/**/content/**), Read(stories/**/content/**), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/check-timeline.sh
  ps: .specify/scripts/powershell/check-timeline.ps1
---

# Timeline Management

Maintain the story timeline, ensuring temporal logic consistency.

## Features

1. **Time Tracking** - Track time points for each chapter
2. **Parallel Events** - Manage multi-thread plots happening simultaneously
3. **Historical Comparison** - Compare with real historical events (for historical novels)
4. **Logic Verification** - Check reasonableness of time spans

## Usage

Execute script {SCRIPT}, supporting the following operations:
- `add` - Add time node
- `check` - Verify time continuity
- `show` - Show timeline overview
- `sync` - Sync parallel events

## Timeline Data

Timeline information is stored in `spec/tracking/timeline.json`:
- In-story time (Year/Month/Day)
- Chapter correspondence
- Key event markers
- Time span calculation

## Output Example

```
📅 Story Timeline
━━━━━━━━━━━━━━━━━━━━
Current Time: Spring of 30th Year of Wanli

Chapter 1  | Winter of 29th Year of Wanli | Time Travel Event
Chapter 4  | 1st Month of 30th Year of Wanli | Go North for Exam
Chapter 6  | 2nd Month of 30th Year of Wanli | Metropolitan Exam
Chapter 8  | 3rd Month of 30th Year of Wanli | Palace Exam
Chapter 61 | 4th Month of 30th Year of Wanli | [To be written]

⏱️ Time Span: 5 months
🔄 Parallel Event: Japanese Invasion of Korea
```
