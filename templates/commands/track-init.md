---
name: track-init
description: Initialize tracking system, setting up tracking data based on story outline
allowed-tools: Read(//stories/**/specification.md), Read(stories/**/specification.md), Read(//stories/**/outline.md), Read(stories/**/outline.md), Read(//stories/**/creative-plan.md), Read(stories/**/creative-plan.md), Write(//spec/tracking/**), Write(spec/tracking/**), Bash(find:*), Bash(grep:*), Bash(wc:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/init-tracking.sh
  ps: .specify/scripts/powershell/init-tracking.ps1
---

# Initialize Tracking System

Initialize all tracking data files based on created story outline and chapter planning.

## Timing

Execute this command after completing `/story` and `/outline`, before starting to write.

## Initialization Process

1. **Read Basic Data**
   - Read `stories/*/story.md` to get story settings
   - Read `stories/*/outline.md` to get chapter planning
   - Read `.specify/config.json` to get writing method

2. **Initialize Tracking Files**

   **Important**: Prioritize reading clue management specifications from `specification.md` Chapter 5 to fill tracking files.

   Create or update `spec/tracking/plot-tracker.json`:
   - Read all clue definitions from `specification.md Section 5.1`
   - Read all intersections from `specification.md Section 5.3`
   - Read all foreshadowings from `specification.md Section 5.4`
   - Read chapter segment clue distribution from `creative-plan.md`
   - Set current state (assuming writing not yet started)

   **plot-tracker.json Structure**:
   ```json
   {
     "novel": "[Story Name read from specification.md]",
     "lastUpdated": "[YYYY-MM-DD]",
     "currentState": {
       "chapter": 0,
       "volume": 1,
       "mainPlotStage": "[Initial Stage]"
     },
     "plotlines": {
       "main": {
         "name": "[Main Line Name]",
         "status": "active",
         "currentNode": "[Start Point]",
         "completedNodes": [],
         "upcomingNodes": "[Read from intersections and chapter planning]"
       },
       "subplots": [
         {
           "id": "[Read from 5.1, e.g., PL-01]",
           "name": "[Clue Name]",
           "type": "[Main/Sub/Support]",
           "priority": "[P0/P1/P2]",
           "status": "[active/dormant]",
           "plannedStart": "[Start Chapter]",
           "plannedEnd": "[End Chapter]",
           "currentNode": "[Current Node]",
           "completedNodes": [],
           "upcomingNodes": "[Read from intersection table]",
           "intersectionsWith": "[Read related clues from 5.3 intersection table]",
           "activeChapters": "[Read from 5.2 pacing planning]"
         }
       ]
     },
     "foreshadowing": [
       {
         "id": "[Read from 5.4, e.g., F-001]",
         "content": "[Foreshadowing Content]",
         "planted": {"chapter": null, "description": "[Planting Description]"},
         "hints": [],
         "plannedReveal": {"chapter": "[Reveal Chapter]", "description": "[Reveal Method]"},
         "status": "planned",
         "importance": "[high/medium/low]",
         "relatedPlotlines": "[List of related clue IDs]"
       }
     ],
     "intersections": [
       {
         "id": "[Read from 5.3, e.g., X-001]",
         "chapter": "[Intersection Chapter]",
         "plotlines": "[List of involved clue IDs]",
         "content": "[Intersection Content]",
         "status": "upcoming",
         "impact": "[Expected Effect]"
       }
     ]
   }
   ```

   Create or update `spec/tracking/timeline.json`:
   - Set time nodes based on chapter planning
   - Mark important time events

   Create or update `spec/tracking/relationships.json`:
   - Extract initial relationships from character settings
   - Set faction groupings

   Create or update `spec/tracking/character-state.json`:
   - Initialize character states
   - Set starting positions

3. **Generate Tracking Report**
   Show initialization results, confirm tracking system is ready

## Intelligent Association

- Automatically set checkpoints based on writing method
- Hero's Journey: 12 stage tracking points
- Three-Act Structure: Three act turning points
- Seven-Point Structure: 7 key nodes

After tracking system initialization, subsequent writing will automatically update this data.
