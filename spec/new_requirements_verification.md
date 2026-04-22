# Checklist: New Requirements Verification

**Purpose**: To validate that the latest requirements changes are clearly and consistently defined in the specification.
**Feature**: [spec/specify.md](../specify.md)
**Created**: 2026-03-02

## UI & Input Requirements

- [ ] Are the new premium options (30萬, 50萬) explicitly documented in the specification? [Completeness, Spec §3.2]
- [ ] Is the default value for '目標保費' clearly specified as 100萬? [Clarity, Spec §3.2]
- [ ] Does the specification explicitly state that the 'difference' column should be removed from the UI? [Completeness, Spec §3.3]

## Core Logic & Consistency

- [ ] Is the rule for Scenario B unambiguously defined as `8 ≤ NAV < 9`? [Clarity, Spec §3.1]
- [ ] Does the table header requirement for Scenario B (`8 ≤ NAV < 9`) match the core logic definition? [Consistency, Spec §3.1, §3.3]
- [ ] **[POTENTIAL CONFLICT]** Is the validation data label for Scenario B (`< 9`) consistent with the core logic rule (`8 ≤ NAV < 9`)? [Consistency, Spec §3.1, §6]

## Acceptance Criteria

- [ ] Are the acceptance criteria updated to reflect the removal of the 'difference' column and the new UI labels? [Measurability, Spec §7]

## Notes
- A potential inconsistency was found between the core logic definition for Scenario B and the label used in the validation data table. It is recommended to align these for clarity.