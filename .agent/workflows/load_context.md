---
description: Load all agent skills, memories, and project configurations into context (Gemini 3.0 & Antigravity compatible)
---

## 預加載層級清單 (L1-L5)

按優先順序加載，使用相對路徑確保可移植性

### L1: 基礎記憶系統

1. [Optional] Read .env configuration:
   // turbo
   `read_file(RelativePath='.env')`

2. Read Agent Skills:
   // turbo
   `find_by_name(SearchDirectory='.agents/skills', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .agents/skills/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

3. Read Agent Memories:
   // turbo
   `find_by_name(SearchDirectory='.agents/memory', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .agents/memory/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

### L2: Claude 記憶系統 (Claude Code 專用)

4. Read Claude Memory Files (8 files):
   // turbo
   `find_by_name(SearchDirectory='.claude/memory', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .claude/memory/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

### L3: 命令系統 (Speckit Commands)

5. Load Claude Commands & Speckit Definitions:
   // turbo
   `find_by_name(SearchDirectory='.claude/commands', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .claude/commands/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

### L4: 規範系統 (Project Specifications)

6. Load Project Specifications & Standards:
   // turbo
   `find_by_name(SearchDirectory='.specify', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .specify/memory/*.md .specify/templates/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

### L5: 工作流與技能補充

7. Load Claude Skills & Workflows (補充性):
   // turbo
   `find_by_name(SearchDirectory='.claude/skills', Pattern='**/*.md')`
   // turbo
   `run_command(CommandLine="cat .claude/skills/**/*.md", Cwd=".", SafeToAutoRun=true, WaitMsBeforeAsync=500)`

8. Load Workflows (可選):
   // turbo
   `find_by_name(SearchDirectory='.claude/workflows', Pattern='**/*.md')`

---

## 配置引用

此檔案遵循 CLAUDE.md 中定義的預加載層級：

| 層級 | 位置 | 用途 | 本檔案對應步驟 |
|-----|------|------|--------------|
| **L1** | `.claude/memory/` | Claude 專用記憶 | 步驟 4 |
| **L2** | `.agents/memory/` | 通用記憶 | 步驟 3 |
| **L3** | `.claude/commands/` | Speckit 命令 | 步驟 5 |
| **L4** | `.specify/` | 項目規範 | 步驟 6 |
| **L5** | 工作流輸出 | 任務產物 | 步驟 7-8 |

---

## 使用說明

### Gemini 3.0 執行方式
在 Google Gemini 中執行此工作流，自動加載所有相對路徑的資源

### Antigravity 執行方式  
使用相對路徑 (`RelativePath` 而非 `AbsolutePath`)，確保在任何工作區都能正常運行

### 本地終端執行
```bash
# 在工作區根目錄執行，自動查找相對路徑的所有檔案
find . -type f -name "*.md" \( -path "./.agents/*" -o -path "./.claude/*" -o -path "./.specify/*" \)
```

---

## 版本追蹤

- **上次更新**: 2026-02-01
- **格式版本**: Gemini 3.0 & Antigravity compatible
- **路徑方式**: 相對路徑 (可移植)
- **參考**: CLAUDE.md (系統協調中樞)
