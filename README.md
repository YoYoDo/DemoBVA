# SpecSkills

> 整合 **Claude Code**、**Google Gemini CLI**、**Antigravity** 三大 AI 開發工具的統一工作流框架，搭配 [spec-kit](https://github.com/spec-kit) 增強 plan-uiux 架構。

---

## 目錄

- [起始設定（必讀）](#起始設定必讀)
- [工具比對總覽](#工具比對總覽)
- [一、預先載入設定](#一預先載入設定)
- [二、Find Skills 使用指南](#二find-skills-使用指南)
- [三、開發工作流 (Workflow)](#三開發工作流-workflow)
- [四、記憶系統使用指南](#四記憶系統使用指南)
- [專案結構](#專案結構)

---

## 起始設定（必讀）

### 專案初始化檢查清單

當您將此模板複製到新專案時，**必須修改以下檔案**以確保路徑正確：

| 檔案 | 需修改項目 | 範例 |
|------|-----------|------|
| `.env` | `WORKSPACE_ROOT` | `/Users/yourname/Dev/YourProject` |
| `.env` | `PROJECT_NAME` | `YourProject` |
| `.agents/memory/shared-context.md` | 專案資訊區塊 | 更新專案名稱和路徑 |

### 快速設定指令

```bash
# 1. 複製模板到新專案
git clone <spec-skills-template-url> YourProject
cd YourProject

# 2. 修改 .env 檔案
# 編輯以下兩行：
WORKSPACE_ROOT=/Users/yourname/Dev/YourProject
PROJECT_NAME=YourProject

# 3. 驗證設定
cat .env | grep -E "WORKSPACE_ROOT|PROJECT_NAME"

# 4. 初始化 Git（如需要）
git remote set-url origin <your-new-repo-url>
```

### .env 完整配置說明

```bash
# ===== 必須修改 =====
WORKSPACE_ROOT=/Users/yourname/Dev/YourProject  # ← 改成你的專案路徑
PROJECT_NAME=YourProject                         # ← 改成你的專案名稱
PROJECT_TYPE=ai-assistant                        # ← 依需求調整

# ===== 可保持預設 =====
CLAUDE_MEMORY_PATH=.claude/memory
CLAUDE_COMMANDS_PATH=.claude/commands
CLAUDE_SPECIFY_PATH=.specify
CLAUDE_WORKFLOWS_PATH=.claude/workflows
CLAUDE_SKILLS_PATH=.claude/skills
```

### 路徑錯誤的影響

| 錯誤類型 | 症狀 | 解決方式 |
|---------|------|---------|
| `WORKSPACE_ROOT` 錯誤 | 腳本找不到檔案、規格生成失敗 | 修正為正確的絕對路徑 |
| `PROJECT_NAME` 錯誤 | 記憶檔案引用錯誤專案 | 修正為正確的專案名稱 |
| 相對路徑遺漏 | 命令執行失敗 | 確保 `.specify/scripts/` 存在 |

---

## 工具比對總覽

### 三大工具快速比較

| 特性 | Claude Code | Gemini CLI | Antigravity |
|------|-------------|------------|-------------|
| **命令位置** | `.claude/commands/` | `.gemini/commands/` | `.agent/workflows/` |
| **檔案格式** | Markdown | TOML | Markdown (中文) |
| **命令數量** | 10 個 | 11 個 | 11 個 |
| **語言** | 英文 | 英文 | 中文 |
| **記憶系統** | 完整 (8 檔案) | 共享記憶 | 共享記憶 |
| **預載指令** | `[系統初始化]` | `/load_context` | `/load_context` |
| **特色** | 最完整功能 | TOML 結構化 + load_context | 中文友善 + load_context |

### 命令對照表

| 功能 | Claude Code | Gemini CLI | Antigravity |
|------|-------------|------------|-------------|
| 建立規格 | `/speckit.specify` | `speckit.specify` | `/speckit.specify` |
| 釐清問題 | `/speckit.clarify` | `speckit.clarify` | `/speckit.clarify` |
| 建立計畫 | `/speckit.plan` | `speckit.plan` | `/speckit.plan` |
| UI/UX 計畫 | `/speckit.plan-uiux` | `speckit.plan-uiux` | `/speckit.plan-uiux` |
| 生成任務 | `/speckit.tasks` | `speckit.tasks` | `/speckit.tasks` |
| 轉 Issues | `/speckit.taskstoissues` | `speckit.taskstoissues` | `/speckit.taskstoissues` |
| 執行實作 | `/speckit.implement` | `speckit.implement` | `/speckit.implement` |
| 產物分析 | `/speckit.analyze` | `speckit.analyze` | `/speckit.analyze` |
| 檢查清單 | `/speckit.checklist` | `speckit.checklist` | `/speckit.checklist` |
| 項目憲章 | `/speckit.constitution` | `speckit.constitution` | `/speckit.constitution` |
| 載入上下文 | `[系統初始化]` | `load_context` | `/load_context` |

---

## 一、預先載入設定

### Claude Code 預先載入

#### 方式 1: 提示詞初始化

```
你：[系統初始化]

Claude：載入記憶系統...
       ✓ 讀取 .claude/memory/ (8 個檔案)
       ✓ 讀取 .claude/commands/ (10 個命令)
       ✓ 讀取 .claude/skills/ (技能)
       ✓ 讀取 .specify/ (規範模板)
       系統就緒！
```

#### 方式 2: VSCode 自動初始化

在 `.vscode/tasks.json` 設定：

```json
{
  "version": "2.0.0",
  "tasks": [{
    "label": "Claude Code Init",
    "type": "shell",
    "command": "node .claude/config/startup.js",
    "runOptions": { "runOn": "folderOpen" }
  }]
}
```

#### 方式 3: 手動執行

```bash
node .claude/config/startup.js
```

---

### Gemini CLI 預先載入

#### 方式 1: 使用 /load_context 命令（推薦）

```
你：/load_context

Gemini：執行預加載層級 L1-L5...

L1: 基礎記憶系統
    ✓ 讀取 .env 配置
    ✓ 讀取 .agents/memory/*.md (3 個檔案)

L2: Gemini 命令系統
    ✓ 列出 .gemini/commands/*.toml (11 個命令)

L3: 規範系統
    ✓ 讀取 .specify/memory/*.md

L4: Claude 記憶（跨工具參考）
    ✓ 讀取 .claude/memory/discoveries.md
    ✓ 讀取 .claude/memory/learned-skills.md

L5: 專案狀態
    ✓ Git 分支狀態
    ✓ 現有規格目錄

上下文載入完成！
```

#### 方式 2: 快速載入指令

```bash
# 完整載入（推薦）
cat .env .agents/memory/*.md .specify/memory/*.md 2>/dev/null

# 最小載入
cat .agents/memory/shared-context.md .agents/memory/decisions.md
```

#### 方式 3: 透過 .gemini 設定

Gemini CLI 會自動讀取 `.gemini/commands/*.toml` 檔案（11 個命令）。

---

### Antigravity 預先載入

#### 方式 1: 使用 /load_context 命令

```
你：/load_context

Antigravity：執行預加載層級 L1-L5...

L1: 基礎記憶系統
    ✓ 讀取 .env 配置
    ✓ 讀取 .agents/skills/*.md
    ✓ 讀取 .agents/memory/*.md

L2: Claude 記憶系統
    ✓ 讀取 .claude/memory/*.md (8 個檔案)

L3: 命令系統
    ✓ 讀取 .claude/commands/*.md (10 個命令)

L4: 規範系統
    ✓ 讀取 .specify/memory/*.md
    ✓ 讀取 .specify/templates/*.md

L5: 工作流與技能
    ✓ 讀取 .claude/skills/**/*.md
    ✓ 讀取 .claude/workflows/*.md

上下文載入完成！
```

#### 方式 2: 使用 Turbo 模式

在 `.agent/workflows/load_context.md` 中，每個步驟都標記 `// turbo` 可加速執行：

```markdown
// turbo
`read_file(RelativePath='.env')`

// turbo
`find_by_name(SearchDirectory='.agents/skills', Pattern='**/*.md')`
```

### 預載入對照表

| 層級 | 內容 | Claude Code | Gemini CLI | Antigravity |
|------|------|-------------|------------|-------------|
| L1 | 基礎記憶 | 自動 | `/load_context` | `/load_context` |
| L2 | 專用命令 | 自動 | `/load_context` | `/load_context` |
| L3 | Speckit 命令 | 自動 | 自動 (TOML) | `/load_context` |
| L4 | 規範模板 | 自動 | `/load_context` | `/load_context` |
| L5 | 專案狀態 | 自動 | `/load_context` | `/load_context` |

---

## 二、Find Skills 使用指南

### 基本指令（所有工具通用）

```bash
# 搜尋技能
npx skills find [關鍵字]

# 安裝技能（全域）
npx skills add <owner/repo@skill> -g -y

# 檢查更新
npx skills check

# 更新所有技能
npx skills update
```

### 前端工程師常用 Skills

| 技能 | 搜尋指令 | 安裝指令 |
|------|---------|---------|
| React 最佳實踐 | `npx skills find react` | `npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y` |
| Next.js | `npx skills find nextjs` | 依搜尋結果安裝 |
| Tailwind CSS | `npx skills find tailwind` | 依搜尋結果安裝 |
| TypeScript | `npx skills find typescript` | 依搜尋結果安裝 |
| 測試 | `npx skills find testing react` | 依搜尋結果安裝 |

### 後端工程師常用 Skills

| 技能 | 搜尋指令 | 用途 |
|------|---------|------|
| API 設計 | `npx skills find api design` | RESTful/GraphQL |
| 資料庫 | `npx skills find database` | SQL/NoSQL 最佳實踐 |
| Docker | `npx skills find docker` | 容器化 |
| CI/CD | `npx skills find ci-cd` | 自動化部署 |
| 安全性 | `npx skills find security` | 安全最佳實踐 |

### 使用案例：跨工具安裝技能

#### Claude Code

```
你：幫我找 React 效能優化的技能

Claude：搜尋中...
       找到：vercel-labs/agent-skills@vercel-react-best-practices

       安裝指令：
       npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y

       要我幫你安裝嗎？

你：好

Claude：正在安裝...
       ✓ 技能已安裝到 .claude/skills/
       已更新 .claude/memory/learned-skills.md
```

#### Gemini CLI

```
你：搜尋 TypeScript 相關技能

Gemini：執行 npx skills find typescript...

       找到以下技能：
       1. typescript-best-practices
       2. typescript-strict-mode

       請選擇要安裝的技能編號。

你：1

Gemini：執行 npx skills add ... -g -y
       安裝完成！
```

#### Antigravity

```
你：/load_context 之後，幫我找測試相關技能

Antigravity：上下文已載入。搜尋技能中...

// turbo
`run_command(CommandLine="npx skills find testing", Cwd=".")`

找到：
- jest-testing-patterns
- playwright-e2e

要安裝哪個？
```

### 技能分類速查

| 類別 | 搜尋關鍵字 |
|------|-----------|
| Web 前端 | `react`, `vue`, `angular`, `nextjs`, `svelte` |
| 樣式 | `css`, `tailwind`, `styled-components`, `sass` |
| 測試 | `testing`, `jest`, `playwright`, `cypress`, `vitest` |
| 後端 | `nodejs`, `python`, `go`, `rust`, `java` |
| 資料庫 | `postgres`, `mongodb`, `redis`, `prisma` |
| DevOps | `docker`, `kubernetes`, `ci-cd`, `github-actions` |
| 文檔 | `docs`, `readme`, `changelog`, `storybook` |

---

## 三、開發工作流 (Workflow)

### 工作流總覽

```
需求 → 規格 → 釐清 → 計畫 → UI/UX → 任務 → 實作 → 分析
  │      │      │      │       │       │      │       │
  ▼      ▼      ▼      ▼       ▼       ▼      ▼       ▼
 構思  specify clarify plan  plan-   tasks implement analyze
                             uiux
```

### 工作流命令對照

#### Claude Code (.claude/commands/)

| 命令 | 用途 | 輸入 | 輸出 |
|------|------|------|------|
| `/speckit.specify` | 建立功能規格 | 自然語言需求 | `spec.md` |
| `/speckit.clarify` | 釐清規格問題 | `spec.md` | 更新的 `spec.md` |
| `/speckit.plan` | 建立技術計畫 | `spec.md` | `plan.md`, `data-model.md`, `research.md` |
| `/speckit.plan-uiux` | UI/UX 設計計畫 | `spec.md`, `plan.md` | `plan-uiux.md` |
| `/speckit.tasks` | 生成任務清單 | 設計文件 | `tasks.md` |
| `/speckit.taskstoissues` | 轉為 GitHub Issues | `tasks.md` | GitHub Issues |
| `/speckit.implement` | 執行實作 | `tasks.md` | 程式碼 |
| `/speckit.analyze` | 產物一致性分析 | 所有文件 | 分析報告 |
| `/speckit.checklist` | 生成檢查清單 | 需求 | 檢查清單 |
| `/speckit.constitution` | 項目憲章 | 原則 | `constitution.md` |

#### Gemini CLI (.gemini/commands/)

| 命令 | 格式特色 | 備註 |
|------|---------|------|
| `load_context` | TOML + L1-L5 層級 | 預載入所有上下文（共享記憶、命令、規範） |
| `speckit.specify` | TOML + handoffs | 支援自動接續到 plan 或 clarify |
| `speckit.plan` | TOML + handoffs | 可接續到 tasks 或 checklist |
| `speckit.plan-uiux` | TOML + handoffs | 可接續到 tasks 或 implement |

**Gemini TOML 格式範例：**

```toml
description = "Create or update the feature specification"

prompt = """
---
handoffs:
  - label: Build Technical Plan
    agent: speckit.plan
    prompt: Create a plan for the spec
  - label: Clarify Spec
    agent: speckit.clarify
    send: true
---
# 命令內容...
"""
```

#### Antigravity (.agent/workflows/)

| 命令 | 中文說明 | 特色 |
|------|---------|------|
| `/speckit.specify` | 建立功能規格 | 中文指令說明 |
| `/speckit.plan` | 實作計畫建立 | Phase 0/1 階段劃分 |
| `/speckit.plan-uiux` | UI/UX 設計計畫 | 六階段 UX 流程 |
| `/load_context` | 載入上下文 | L1-L5 層級預載 |

**Antigravity 格式範例：**

```markdown
---
description: 執行實作計畫工作流程 - 使用計畫模板生成設計產出物
---

# /speckit.plan - 實作計畫建立

## 用途
基於功能規格建立技術實作計畫，包含研究、資料模型和 API 契約。

## 執行步驟

### 1. 設定環境
\`\`\`bash
# turbo
.specify/scripts/bash/setup-plan.sh --json
\`\`\`
```

### 完整開發流程案例

#### 使用 Claude Code

```
# Step 1: 建立規格
你：/speckit.specify 用戶管理功能，包含 CRUD 和角色權限

Claude：執行 setup 腳本...
       生成 specs/user-management/spec.md

# Step 2: 釐清問題
你：/speckit.clarify

Claude：發現 5 個待釐清問題...

# Step 3: 建立計畫
你：/speckit.plan

Claude：Phase 0: 研究階段 → research.md
       Phase 1: 設計階段 → data-model.md, contracts/

# Step 4: UI/UX 設計
你：/speckit.plan-uiux

Claude：生成六階段 UX 流程 → plan-uiux.md

# Step 5: 生成任務
你：/speckit.tasks

Claude：生成 15 個有序任務 → tasks.md

# Step 6: 執行實作
你：/speckit.implement

Claude：Task 1/15: 建立 User 模型... ✓
```

#### 使用 Gemini CLI

```
# Step 1: 建立規格（使用 handoff 自動接續）
你：執行 speckit.specify 用戶管理功能

Gemini：生成 spec.md 完成

       可選的下一步：
       [1] Build Technical Plan (speckit.plan)
       [2] Clarify Spec (speckit.clarify)

       選擇編號或輸入其他指令：

你：1

Gemini：自動執行 speckit.plan...
```

#### 使用 Antigravity

```
# Step 0: 載入上下文
你：/load_context

Antigravity：L1-L5 載入完成！

# Step 1: 建立規格
你：/speckit.specify 用戶管理功能

Antigravity：
// turbo
執行 .specify/scripts/bash/setup-specify.sh --json

解析 JSON：FEATURE_DIR = specs/user-management
生成 spec.md 完成！

# Step 2: 建立計畫
你：/speckit.plan

Antigravity：
### Phase 0: 大綱與研究
- 對於每個 NEEDS CLARIFICATION → 研究任務
- 整合發現到 research.md

### Phase 1: 設計與契約
- 從功能規格提取實體 → data-model.md
- 生成 API 契約 → contracts/
```

### 重複修改與迭代

#### 情境 1: 需求變更

| 工具 | 操作方式 |
|------|---------|
| Claude Code | `/speckit.specify 更新：增加多租戶支援` → `/speckit.plan` |
| Gemini CLI | 重新執行 `speckit.specify` → 選擇 handoff 到 plan |
| Antigravity | `/speckit.specify 新增多租戶架構` → `/speckit.plan` |

#### 情境 2: 修改 UI 設計

```
# Claude Code
你：/speckit.plan-uiux 修改：列表改為卡片式佈局

# Gemini CLI
你：執行 speckit.plan-uiux，更新載入完成階段為卡片式

# Antigravity
你：/speckit.plan-uiux 列表顯示改為卡片式
```

#### 情境 3: 跳過特定任務

```
# 直接編輯 tasks.md，將不需要的任務標記為完成
# 或在執行時指定

# Claude Code
你：/speckit.implement 跳過測試相關任務

# Antigravity
你：/speckit.implement 先完成核心功能，跳過測試
```

---

## 四、記憶系統使用指南

### 記憶檔案結構

```
.claude/memory/           # Claude Code 專用（8 檔案）
├── active-workflow-state.md  # 當前工作流狀態
├── context-cache.md          # 工作上下文快取
├── discoveries.md            # 發現與洞見
├── learned-skills.md         # 已學習技能
├── QUICKREF.md              # 快速參考
├── session-history.md        # 會話歷史
├── task-status.md            # 任務狀態
└── workflow-history.md       # 工作流歷史

.agents/memory/           # 跨工具共享（3 檔案）
├── shared-context.md         # 共享上下文
├── decisions.md              # 架構決策
└── gemini_3_analysis.md      # Gemini 模型分析
```

### 記憶存入方式

#### Claude Code

```
# 方式 1: 自動存入（執行工作流後自動更新）
你：/speckit.plan
Claude：... (執行完成)
       已自動更新：
       - active-workflow-state.md
       - workflow-history.md

# 方式 2: 手動存入
你：請將「選擇 PostgreSQL 作為資料庫」記錄到 discoveries.md

Claude：已更新 .claude/memory/discoveries.md：
       ## 2026-02-01: 資料庫選擇
       **決策**: PostgreSQL
       **原因**: 團隊熟悉度高，支援 JSONB

# 方式 3: 提示詞存入
你：[記憶存入] 專案使用 Monorepo 架構，工具為 Turborepo

Claude：已記錄到 context-cache.md
```

#### Gemini CLI

```
# 方式 1: 寫入共享記憶
你：請將這個決策寫入 .agents/memory/decisions.md

Gemini：已更新 decisions.md：
       ## 2026-02-01: API 設計決策
       選擇 GraphQL 作為 API 層

# 方式 2: 更新 Gemini 分析
你：更新 gemini_3_analysis.md，記錄本次使用 Pro 模式的原因

Gemini：已更新分析記錄
```

#### Antigravity

```
# 方式 1: 透過 load_context 載入後寫入
你：/load_context
你：將「使用 Prisma ORM」記錄到共享記憶

Antigravity：
// turbo
`write_file(Path='.agents/memory/decisions.md', Content='...', Mode='append')`

已追加到 decisions.md

# 方式 2: 直接指定檔案
你：更新 .agents/memory/shared-context.md 的專案資訊

Antigravity：
// turbo
`read_file(RelativePath='.agents/memory/shared-context.md')`
// turbo
`write_file(Path='.agents/memory/shared-context.md', Content='...')`

已更新！
```

### 記憶取出方式

#### Claude Code

```
# 方式 1: 自動載入（初始化時）
你：[系統初始化]
Claude：載入 8 個記憶檔案...

# 方式 2: 查詢特定記憶
你：上次的資料庫決策是什麼？
Claude：（讀取 discoveries.md）
       根據記錄，選擇 PostgreSQL，原因是團隊熟悉度高。

# 方式 3: 列出所有記憶
你：顯示所有已學習的技能
Claude：（讀取 learned-skills.md）
       1. find-skills - 搜尋和安裝技能
```

#### Gemini CLI

```
# 方式 1: 讀取共享記憶
你：讀取 .agents/memory/shared-context.md

Gemini：專案資訊：
       - 名稱: SpecSkills
       - 類型: AI 輔助開發工具
       - 可用工具: Claude Code, Gemini, Antigravity

# 方式 2: 查詢決策記錄
你：查看 decisions.md 中的架構決策

Gemini：找到 2 個決策記錄：
       1. 2026-02-01: 多工具架構整合
       2. 2026-02-01: 配置統一化
```

#### Antigravity

```
# 方式 1: 使用 load_context 完整載入
你：/load_context

Antigravity：
L1: 讀取 .agents/memory/*.md
    - shared-context.md ✓
    - decisions.md ✓
    - gemini_3_analysis.md ✓

L2: 讀取 .claude/memory/*.md (8 檔案) ✓
...

# 方式 2: 單獨查詢
你：查看 learned-skills.md 的內容

Antigravity：
// turbo
`read_file(RelativePath='.claude/memory/learned-skills.md')`

已學習技能：
1. find-skills - 搜尋和安裝代理技能
```

### 跨工具記憶同步案例

```
# 場景：在 Claude Code 做了決策，需要讓 Gemini 和 Antigravity 也知道

# Step 1: Claude Code 記錄決策
你：[Claude Code] 我們決定使用 tRPC，請記錄

Claude：已寫入 .agents/memory/decisions.md（共享記憶）
       同時更新 .claude/memory/discoveries.md（Claude 專用）

# Step 2: Gemini CLI 讀取
你：[Gemini] 讀取共享記憶中的最新決策

Gemini：讀取 .agents/memory/decisions.md
       最新決策：使用 tRPC 作為 API 層
       決策日期：2026-02-01

# Step 3: Antigravity 讀取
你：[Antigravity] /load_context

Antigravity：L1 載入完成
       讀取到決策記錄：使用 tRPC
```

### 記憶系統對照表

| 功能 | Claude Code | Gemini CLI | Antigravity |
|------|-------------|------------|-------------|
| 自動存入 | ✅ 工作流完成後 | ❌ | ❌ |
| 手動存入 | ✅ 直接指示 | ✅ 直接指示 | ✅ write_file |
| 自動載入 | ✅ 初始化時 | ❌ | ✅ /load_context |
| 手動載入 | ✅ 查詢指示 | ✅ read 指示 | ✅ read_file |
| 專用記憶 | `.claude/memory/` | - | - |
| 共享記憶 | `.agents/memory/` | `.agents/memory/` | `.agents/memory/` |

---

## 專案結構

```
SpecSkills/
├── .claude/                 # Claude Code 專用
│   ├── commands/            # 10 個 speckit 命令 (Markdown)
│   ├── memory/              # 8 個記憶檔案
│   ├── skills/              # 技能定義
│   ├── workflows/           # 工作流模板
│   └── config/              # 配置檔案 (startup.js)
├── .gemini/                 # Gemini CLI 專用
│   └── commands/            # 11 個命令 (TOML)
│       └── load_context.toml # L1-L5 預載入
├── .agent/                  # Antigravity 專用
│   └── workflows/           # 11 個工作流 (中文 Markdown)
│       └── load_context.md  # L1-L5 預載入
├── .agents/                 # 通用代理系統（共享）
│   ├── memory/              # 共享記憶 (3 檔案)
│   └── skills/              # 通用技能
├── .specify/                # 規範系統（共享）
│   ├── templates/           # 文檔模板
│   ├── scripts/             # 自動化腳本
│   └── memory/              # 規範知識庫
├── .env                     # 統一環境配置 ⚠️ 需修改
├── .vscode/                 # VSCode 設定
│   └── settings-guide.md    # 設定說明
├── CLAUDE.md                # 系統管理中樞
└── README.md                # 本文件
```

---

## 相關資源

- [skills.sh](https://skills.sh/) - Skills 生態系統
- [spec-kit](https://github.com/spec-kit) - 規格工具包
- [Claude Code](https://claude.ai/claude-code) - Anthropic CLI
- [Gemini CLI](https://ai.google.dev/) - Google CLI
- [Antigravity](https://antigravity.dev/) - AI 開發助手

---

## 授權

MIT License

---

*最後更新: 2026-02-01*
