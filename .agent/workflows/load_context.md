---
description: Load all agent skills and memory files into context
---

1. Read all skills from `.agents/skills`:
   // turbo
   `find_by_name(SearchDirectory='/Users/user/Dev/SEO-Skills/.agents/skills', Pattern='**/*.md')`

2. For each skill file found, read its content. This allows the model to "learn" the skill.
   (The user or agent should manually read the files returned in step 1 using `view_file` or `read_url_content`. Alternatively, use a script to cat them all.)

   // turbo
   `run_command(CommandLine="cat /Users/user/Dev/SEO-Skills/.agents/skills/*.md", Cwd="/Users/user/Dev/SEO-Skills", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

3. Read all memory types from `.agents/memory`:
   // turbo
   `find_by_name(SearchDirectory='/Users/user/Dev/SEO-Skills/.agents/memory', Pattern='**/*.md')`

4. Read the memory contents:
   // turbo
   `run_command(CommandLine="cat /Users/user/Dev/SEO-Skills/.agents/memory/*.md", Cwd="/Users/user/Dev/SEO-Skills", SafeToAutoRun=true, WaitMsBeforeAsync=500)`
