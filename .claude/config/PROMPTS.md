# Claude Code 記憶系統 - 使用指南

## 🎯 系統目標

建立一個自動化的記憶、技能和工作流系統，讓 Claude Code：
1. **快速載入** - 啟動時自動掃描和學習所有技能和工作流
2. **上下文恢復** - 恢復上次的工作狀態、進度和工作流
3. **持續學習** - 記錄發現和最佳實踐
4. **工作流支持** - 管理和執行預定義的工作流程
5. **效率優化** - 加速進入工作狀態，避免重複

## 📁 目錄結構

```
.claude/
├── skills/                    # 只讀技能庫
│   ├── find-skills/
│   │   └── SKILL.md
│   └── [其他技能]/
│
├── workflows/                 # 工作流定義和模板
│   ├── [workflow-name]/
│   │   ├── WORKFLOW.md
│   │   ├── steps.json
│   │   ├── checklist.md
│   │   └── templates/
│   ├── WORKFLOW-TEMPLATE.md   # 工作流模板
│   ├── steps-template.json
│   ├── README.md
│   └── active-workflow.md     # 工作流註冊表
│
├── memory/                    # 讀寫記憶區
│   ├── learned-skills.md      # ✓ 已發現的技能索引
│   ├── workflow-history.md    # ✓ 完成的工作流歷史
│   ├── active-workflow-state.md # ✓ 當前活躍工作流狀態
│   ├── session-history.md     # ○ 工作階段歷史
│   ├── context-cache.md       # ○ 上下文快取
│   ├── task-status.md         # ○ 任務追蹤
│   ├── discoveries.md         # ○ 發現和洞見
│   ├── QUICKREF.md            # 快速參考卡
│   └── .cache/                # 快取檔案（自動生成）
│
├── config/                    # 配置文件
│   ├── init.md                # 系統說明
│   ├── schema.json            # 記憶架構定義
│   ├── startup.js             # Node.js 初始化腳本
│   └── PROMPTS.md             # 本文件
│
└── .env                       # ⚙️ 環境變數配置
```

## 🚀 VS Code 集成方式

### 方式 1: 手動初始化（推薦）

每次開啟工作區時，在 Claude Code 的第一條消息中使用此提示詞：

```
[系統初始化]

請執行以下初始化步驟：

1. **掃描技能庫**
   - 列出 .claude/skills/ 中的所有技能
   - 為每個技能解析關鍵信息
   - 更新 .claude/memory/learned-skills.md

2. **掃描工作流庫**
   - 列出 .claude/workflows/ 中的所有工作流
   - 為每個工作流解析定義和步驟
   - 更新 .claude/workflows/active-workflow.md

3. **恢復工作狀態**
   - 讀取 .claude/memory/context-cache.md
   - 讀取 .claude/memory/task-status.md（顯示所有未完成任務）
   - 讀取 .claude/memory/active-workflow-state.md（檢查有無中斷的工作流）
   - 讀取 .claude/memory/session-history.md（顯示最近 3 項任務）

4. **準備工作**
   - 讀取 .claude/memory/discoveries.md（記住之前的解決方案）
   - 執行完初始化後，輸出一份精簡的狀態報告

格式要求：
- 技能列表：使用表格或列表
- 工作流列表：突出可執行的工作流
- 待辦任務：突出 high priority 任務
- 活躍工作流：如有則顯示進度
- 狀態報告：簡明扼要，不超過 15 行

初始化完成後，我會提出具體需求。
```

### 方式 2: 自動初始化（使用啟動腳本）

```bash
# 在 VS Code 終端運行
node .claude/config/startup.js /Users/user/Dev/SEO-Skills

# 或只運行當前目錄
node .claude/config/startup.js
```

### 方式 3: VS Code 任務自動執行

配置 `.vscode/tasks.json` 讓 VS Code 在打開工作區時自動運行初始化腳本。

初始化完成後，輸出一份簡短的狀態報告，然後開始回應我的問題。
```

### 方式 2: 自動初始化（使用啟動腳本）

```bash
# 在 VS Code 終端運行
node .claude/config/startup.js /Users/user/Dev/SEO-Skills

# 或只運行當前目錄
node .claude/config/startup.js
```

## 📝 記憶文件使用規範

### 1. learned-skills.md
**何時寫入**：每次發現新技能或更新現有技能
**何時讀取**：初始化時、用戶詢問可用技能時
**格式**：
```markdown
## [技能名稱]
- **描述**: 技能功能說明
- **路徑**: .claude/skills/[skill-name]
- **使用場景**: 何時使用此技能
- **發現時間**: YYYY-MM-DDTHH:mm:ssZ
```

### 2. workflow-history.md
**何時寫入**：每次工作流完成
**何時讀取**：查看過往的工作流執行記錄
**格式**：
```markdown
## [工作流名稱] - [日期]
- **版本**: 1.0.0
- **狀態**: ✅ 完成 / ⚠️ 有問題 / ❌ 失敗
- **耗時**: XX 分鐘
- **完成步驟**: N/M
- **輸出**: [輸出檔案清單]
- **遇到的問題**: [如有]
- **學到的東西**: [收穫]
- **相關任務**: [任務 ID]
- **後續步驟**: [下一步]
```

### 3. active-workflow-state.md
**何時寫入**：工作流開始、進度改變或完成時
**何時讀取**：初始化時、恢復中斷的工作流時
**內容**：
- 當前活躍的工作流名稱
- 當前執行的步驟
- 進度百分比
- 執行上下文和參數
- 預計完成時間

### 4. session-history.md
**何時寫入**：每次完成重要任務
**何時讀取**：需要了解工作歷史、前後文關聯時
**格式**：
```markdown
## [任務名稱] - [時間戳記]
- **狀態**: ✅ 完成 / ⏳ 進行中
- **做了什麼**: 任務描述
- **決策**: 做出的關鍵決策
- **結果**: 完成結果
- **相關文件**: 涉及的文件鏈接
```

### 5. context-cache.md
**何時寫入**：開始新工作、修改重要設置時實時更新
**何時讀取**：初始化時
**內容**：
- 當前工作焦點
- 重要變數和設置
- 最近編輯的文件
- 關鍵路徑和依賴

### 6. task-status.md
**何時寫入**：新增、更新或完成任務
**何時讀取**：初始化時、檢查進度時
**格式**：
```markdown
## [任務ID] - [任務名稱]
- **狀態**: not-started | in-progress | completed
- **優先級**: high | medium | low
- **截止日期**: YYYY-MM-DD 或 'ongoing'
- **進度**: 0% | 50% | 100%
- **後續步驟**: 需要做什麼
- **阻礙因素**: 如有任何卡點
```

### 7. discoveries.md
**何時寫入**：發現新的解決方案、優化、模式時立即記錄
**何時讀取**：遇到類似問題時
**格式**：
```markdown
## [發現標題]
- **分類**: performance | pattern | bug-fix | optimization
- **問題**: 原問題是什麼
- **解決方案**: 什麼方法有效
- **代碼示例**: [如適用]
- **適用範圍**: 何時使用
- **發現日期**: YYYY-MM-DDTHH:mm:ssZ
```

## 🔄 工作流程

### 初始化流程（每次啟動）
```
1. 掃描 .claude/skills/* → 發現所有可用技能
2. 掃描 .claude/workflows/* → 發現所有可用工作流
3. 更新 learned-skills.md → 索引所有技能
4. 更新 active-workflow.md → 註冊所有工作流
5. 讀取 context-cache.md → 恢復工作上下文
6. 讀取 active-workflow-state.md → 檢查有無中斷的工作流
7. 讀取 task-status.md → 顯示待辦任務
8. 讀取 discoveries.md → 加載之前的洞見
9. 輸出狀態報告 → 準備開始工作
```

### 工作流執行流程
```
1. 初始化
   ├─ 檢查工作流定義（WORKFLOW.md）
   ├─ 加載步驟配置（steps.json）
   └─ 驗證先決條件

2. 執行
   ├─ 按順序執行每個步驟
   ├─ 更新 active-workflow-state.md（進度追蹤）
   └─ 記錄工作流輸出

3. 驗證
   ├─ 檢查完成標準
   ├─ 驗證輸出檔案
   └─ 記錄結果

4. 完成
   ├─ 更新 workflow-history.md（工作流歷史）
   ├─ 更新 session-history.md（任務歷史）
   ├─ 更新 discoveries.md（如有新發現）
   └─ 清理工作區
```
```

### 任務完成流程
```
1. 執行任務並完成工作
2. 更新 session-history.md → 記錄完成的任務
3. 更新 context-cache.md → 更新當前狀態
4. 更新 task-status.md → 標記任務為完成
5. [如有發現] 更新 discoveries.md → 記錄洞見
```
### 工作流建立和執行流程
```
1. 建立新工作流
   ├─ 複製 WORKFLOW-TEMPLATE.md 到新目錄
   ├─ 複製 steps-template.json 到新目錄
   ├─ 編輯 WORKFLOW.md 定義工作流
   ├─ 編輯 steps.json 配置步驟
   ├─ 創建 checklist.md（檢查清單）
   └─ 在 .claude/workflows/active-workflow.md 註冊

2. 執行工作流
   ├─ 讀取工作流定義
   ├─ 驗證先決條件
   ├─ 執行每一步
   ├─ 更新 active-workflow-state.md（進度）
   └─ 完成後更新 workflow-history.md

3. 中斷並恢復
   ├─ 在 active-workflow-state.md 記錄暫停點
   ├─ 保存所有中間結果
   ├─ 下次使用恢復提示詞繼續
   └─ 完成後記錄到 workflow-history.md
```
### 問題發現流程
```
1. 遇到問題 → 分析原因
2. 找到解決方案 → 測試驗證
3. 記錄到 discoveries.md → 標記分類和日期
4. 在 learned-skills.md 中補充說明 → 如涉及特定技能
```

## 💡 提示語模板

### 初始化提示（複製使用）

```markdown
[系統初始化]

請立即執行以下步驟：

1. **掃描並學習所有技能**
   - 列出 .claude/skills/ 中的所有技能
   - 為每個技能解析關鍵信息
   - 已學習的技能更新到 learned-skills.md

2. **掃描並註冊所有工作流**
   - 列出 .claude/workflows/ 中的所有工作流
   - 為每個工作流解析定義
   - 將工作流註冊到 active-workflow.md

3. **恢復工作上下文**
   - 讀取 context-cache.md
   - 讀取 active-workflow-state.md（檢查有無中斷的工作流）
   - 讀取 task-status.md（顯示所有未完成任務）
   - 讀取 session-history.md（顯示最近 3 項任務）

4. **準備工作**
   - 讀取 discoveries.md（記住之前的解決方案）
   - 執行完初始化後，輸出一份精簡的狀態報告

格式要求：
- 技能列表：使用表格或列表
- 工作流列表：突出可執行的工作流
- 待辦任務：突出 high priority 任務
- 活躍工作流：如有則顯示進度
- 狀態報告：簡明扼要，不超過 15 行

初始化完成後，我會提出具體需求。
```

### 工作流執行提示

```markdown
[執行工作流: workflow-name]

請執行此工作流：

1. 讀取 .claude/workflows/[workflow-name]/WORKFLOW.md（工作流定義）
2. 加載 .claude/workflows/[workflow-name]/steps.json（步驟配置）
3. 驗證先決條件
4. 按順序執行每個步驟
5. 執行過程中更新 .claude/memory/active-workflow-state.md（進度追蹤）
6. 完成所有步驟後：
   - 驗證所有輸出
   - 更新 .claude/memory/workflow-history.md（記錄完成）
   - 更新 .claude/memory/session-history.md（任務記錄）
   - 如有新發現，記錄到 .claude/memory/discoveries.md

格式要求：
- 清晰顯示每個步驟的進度
- 遇到問題時詳細說明
- 完成時列出所有輸出物
```

### 工作流恢復提示

```markdown
[恢復工作流: workflow-name]

此工作流之前被中斷，請從中斷處繼續：

1. 查看 .claude/memory/active-workflow-state.md
2. 確認當前步驟和進度
3. 檢查已完成的步驟和輸出
4. 從當前步驟繼續執行
5. 完成後更新記憶文件

幫助：如果不確定當前狀態，列出狀態檔案中的信息。
```

### 任務完成提示

```markdown
[任務完成]

請更新記憶文件：

1. 將此任務記錄到 session-history.md
   - 任務名稱：[YOUR TASK]
   - 完成狀態：✅
   - 做了什麼：[SUMMARY]
   - 結果：[OUTCOME]

2. 更新 context-cache.md
   - 當前焦點：[NEXT FOCUS]
   - 最近編輯的文件：[FILES]

3. 更新 task-status.md
   - 標記此任務為 completed

[Optional] 如有發現新的解決方案或優化，記錄到 discoveries.md
```

### 查詢相關信息提示

```markdown
[查詢記憶]

請從記憶文件中查找：

1. 相關的技能信息
   - 查詢 learned-skills.md 中的 [KEYWORD]
   - 檢查是否有相關技能可用

2. 之前的解決方案
   - 查詢 discoveries.md 中的 [PROBLEM]
   - 適用的最佳實踐

3. 工作上下文
   - 檢查 context-cache.md 中的 [CONTEXT]
   - 參考 session-history.md 中的類似任務

然後根據記憶中的信息提供答案。
```

## 🔍 查看記憶的方式

### 查看已學習的技能
```bash
cat .claude/memory/learned-skills.md
```

### 查看當前任務狀態
```bash
cat .claude/memory/task-status.md
```

### 查看工作上下文
```bash
cat .claude/memory/context-cache.md
```

### 查看過往發現
```bash
cat .claude/memory/discoveries.md
```

### 查看完整歷史
```bash
cat .claude/memory/session-history.md
```

## ⚙️ 配置

### VS Code settings.json 推薦設置

```json
{
  "claude.memory.enabled": true,
  "claude.memory.autoSave": true,
  "claude.memory.savePath": ".claude/memory",
  "claude.skills.loadOnStartup": true,
  "claude.skills.scanPath": ".claude/skills"
}
```

### 環境變數

```bash
# .env 或 .envrc
CLAUDE_MEMORY_ENABLED=true
CLAUDE_MEMORY_PATH=.claude/memory
CLAUDE_SKILLS_PATH=.claude/skills
CLAUDE_AUTOLOAD=true
CLAUDE_AUTOSAVE=true
```

## 📊 數據流圖

```
┌─────────────────────────────────────────────────────┐
│            VS Code 啟動事件                          │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Claude Code 初始化    │
        └────────┬───────────────┘
                 │
    ┌────────────┼────────────┬──────────────┐
    ▼            ▼            ▼              ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│掃描技能 │ │恢復上下文│ │加載任務  │ │ 加載洞見     │
│庫      │ │         │ │狀態     │ │             │
└────┬────┘ └────┬────┘ └────┬────┘ └──────┬───────┘
     │           │           │            │
     └───────────┴───────────┴────────────┘
             │
             ▼
    ┌────────────────────┐
    │  輸出狀態報告      │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │  準備處理用戶請求  │
    └────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌──────────────┐
│ 執行任務    │  │ 完成時更新   │
│             │  │ 記憶文件     │
└─────────────┘  └──────────────┘
```

## ✅ 檢查清單

初始化完成後確認：

- [ ] `.claude/skills/` 中的所有技能已掃描
- [ ] `learned-skills.md` 已生成或更新
- [ ] `context-cache.md` 已恢復工作狀態
- [ ] `task-status.md` 中的待辦任務已顯示
- [ ] `discoveries.md` 已加載（如存在）
- [ ] `session-history.md` 已檢查（如存在）
- [ ] Claude Code 已準備好處理用戶請求

## 🔗 相關文件

- [init.md](init.md) - 系統架構詳細說明
- [schema.json](schema.json) - 記憶文件架構定義
- [startup.js](startup.js) - Node.js 初始化腳本

---

**版本**: 1.0.0  
**最後更新**: 2026-02-01  
**狀態**: ✅ 正式版本
