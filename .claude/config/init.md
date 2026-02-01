# Claude Code 初始化系統

## 系統架構

```
.claude/
├── skills/              # 技能庫（只讀）
│   └── */
│       └── SKILL.md
├── memory/              # 記憶存儲（讀寫）
│   ├── learned-skills.md    # 已學習的技能索引
│   ├── session-history.md   # 當前工作階段歷史
│   ├── context-cache.md     # 重要上下文快取
│   ├── task-status.md       # 進行中的任務狀態
│   └── discoveries.md       # 發現和洞見
└── config/              # 配置文件
    ├── init.md          # 本文件
    ├── startup.js       # VS Code 啟動腳本
    └── schema.json      # 記憶架構定義
```

## 初始化流程

1. **啟動時讀取**：自動掃描 `skills/` 中的所有技能
2. **學習技能**：解析每個 SKILL.md 檔案，提取關鍵信息
3. **更新記憶**：將發現的技能和上下文存到 `memory/` 中
4. **恢復上下文**：讀取上次的記憶，迅速進入工作狀態

## 記憶文件說明

### learned-skills.md
- **用途**：存儲已學習的所有技能索引
- **更新**：每次掃描時更新
- **內容**：技能名稱、描述、路徑、使用場景

### session-history.md
- **用途**：當前工作階段的歷史記錄
- **更新**：每次任務完成時更新
- **內容**：完成的任務、決策、發現

### context-cache.md
- **用途**：快速恢復工作上下文
- **更新**：任務進行中時更新
- **內容**：當前工作狀態、重要參數、相關路徑

### task-status.md
- **用途**：追蹤進行中的任務
- **更新**：實時更新
- **內容**：任務名稱、狀態、優先級、預期完成時間

### discoveries.md
- **用途**：記錄有用的發現和洞見
- **更新**：發現時立即更新
- **內容**：問題解決方案、最佳實踐、效率改進

## 使用指南

### 對 Claude Code 的提示語

在 VS Code 啟動或開始新任務時，Claude Code 應該：

```
請在開始前執行以下初始化：
1. 掃描 .claude/skills/* 中的所有技能
2. 從 .claude/memory/learned-skills.md 讀取已知技能
3. 從 .claude/memory/context-cache.md 恢復工作上下文
4. 從 .claude/memory/task-status.md 檢查待處理任務

然後才開始回應用戶請求。
```

### 更新記憶的最佳實踐

1. **每次完成任務後**：更新 session-history.md
2. **發現新的優化方法**：立即記錄到 discoveries.md
3. **開始新工作**：更新 context-cache.md 和 task-status.md
4. **定期檢查**：確保記憶文件保持最新

## 環境變數

建議在 .env 或 VS Code settings.json 中添加：

```json
{
  "claude.memory.enabled": true,
  "claude.memory.path": ".claude/memory",
  "claude.skills.path": ".claude/skills",
  "claude.autoload": true,
  "claude.autosave": true
}
```
