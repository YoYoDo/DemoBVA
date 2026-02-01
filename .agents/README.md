# Agent Skills & Memory System

This directory contains the "brain" of your agent assistant.

## Structure

- **.agents/skills/**: Place markdown files here that describe "skills" or persistent instructions for the agent.
  - Example: `coding_style.md`, `project_architecture.md`.
  - The agent will read these to understand *how* to behave.

- **.agents/memory/**: The agent (or you) can store memories here.
  - Example: `meeting_notes_2023-10.md`, `decision_records.md`.
  - These are facts or context the agent should know.

## How to Load

To load all these files into the agent's current context at the start of a session, use the slash command:

`/load_context`

This will trigger a workflow that reads all files in `skills` and `memory`.
