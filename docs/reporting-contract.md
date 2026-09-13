# Reporting contract

Every task is given in the same shape and every report comes back in the same shape. That way each week's result can be cited directly in section 5.5 and Appendix 2 without rewriting.

## What does a task state?

| Field | What it holds |
|---|---|
| **ID** | A short identifier, for example `D0`. |
| **Outcome** | One sentence describing the result, not the activity. |
| **Constraints** | What the work must respect, including anything in the [context brief](context-brief.md). |
| **Out of scope** | What is explicitly not to be done. |
| **Done when** | The condition that makes the task complete, checkable by someone else. |

```markdown
### <ID>. <title>

- **Outcome:**
- **Constraints:**
- **Out of scope:**
- **Done when:**
```

## What does a report state?

| Field | What it holds |
|---|---|
| **Done** | What was done, in the past tense, measured against the stated outcome. |
| **Evidence** | Commit hashes, test names, file paths, CI run identifiers. Anything a reader can open. |
| **Decided** | Choices the task didn't specify, with the reason for each. |
| **Refused** | Anything declined, and the constraint it would have broken. |
| **Failed or unresolved** | What didn't work or is still open, stated plainly. |
| **Feeds** | The report section the result supports, plus any figure or register entry it still owes. |

```markdown
### Report: <ID>

- **Done:**
- **Evidence:**
- **Decided:**
- **Refused:**
- **Failed or unresolved:**
- **Feeds:**
```

Write "None" in any field that's empty. Don't delete the field.

## What a report is not

It isn't an account of effort. Time spent, dead ends explored and how hard something was don't belong in it unless they changed the outcome.

If something wasn't done, the report says so and gives the reason. An inaccurate report costs more later than a missed task does.
