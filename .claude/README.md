# .claude 系統索引

快速查找所有資源和文檔。

## 🚀 快速開始

- **[新手開始](GETTING_STARTED.md)** - 5 分鐘快速上手
- **[系統報告](SYSTEM_REPORT.md)** - 完整系統概覽和統計
- **[快速參考](memory/QUICKREF.md)** - 常用命令速查表

## 📋 完整指南

- **[使用指南](config/PROMPTS.md)** - 詳細的提示詞和工作流程
- **[系統架構](config/init.md)** - 系統設計和實現細節
- **[工作流説明](workflows/README.md)** - 工作流系統詳解

## 🗂️ 目錄導航

### 配置區 (.claude/config/)

| 檔案 | 用途 |
|-----|------|
| PROMPTS.md | 完整的提示詞指南和使用說明 |
| init.md | 系統架構和初始化流程 |
| schema.json | 記憶檔案的結構定義 |
| startup.js | Node.js 初始化腳本 |

**快速訪問**: `cat config/PROMPTS.md`

### 技能區 (.claude/skills/)

| 目錄 | 說明 |
|-----|------|
| find-skills/ | 技能發現和安裝 |
| [其他]/ | 添加新技能的位置 |

**掃描技能**: 初始化時自動掃描  
**添加技能**: 在此目錄中創建新的 [skill-name]/SKILL.md

### 工作流區 (.claude/workflows/)

| 檔案 | 用途 |
|-----|------|
| README.md | 工作流系統說明 |
| active-workflow.md | 工作流註冊表 |
| WORKFLOW-TEMPLATE.md | 工作流標準模板 |
| steps-template.json | 步驟配置模板 |
| [workflow-name]/ | 具體工作流位置 |

**查看工作流**: `cat workflows/active-workflow.md`  
**建立工作流**: 複製 WORKFLOW-TEMPLATE.md

### 記憶區 (.claude/memory/)

| 檔案 | 更新頻率 | 用途 |
|-----|---------|------|
| learned-skills.md | 掃描時 | 技能索引 |
| workflow-history.md | 工作流完成時 | 工作流執行歷史 |
| active-workflow-state.md | 實時 | 當前工作流狀態 |
| session-history.md | 任務完成時 | 任務完成記錄 |
| context-cache.md | 狀態改變時 | 工作上下文 |
| task-status.md | 任務改變時 | 任務追蹤 |
| discoveries.md | 發現時 | 解決方案和最佳實踐 |
| QUICKREF.md | 手動更新 | 快速參考卡 |

**查看所有記憶**: `ls -lh memory/`

## 💡 常用提示詞

### 系統初始化

```markdown
[系統初始化]

請立即執行以下步驟：
[參考 config/PROMPTS.md 第 XX 行]
```

### 執行工作流

```markdown
[執行工作流: workflow-name]

請執行此工作流：
[參考 config/PROMPTS.md 第 XX 行]
```

### 恢復工作流

```markdown
[恢復工作流: workflow-name]

此工作流之前被中斷，請從中斷處繼續：
[參考 config/PROMPTS.md 第 XX 行]
```

### 任務完成

```markdown
[任務完成]

請更新記憶文件：
[參考 config/PROMPTS.md 第 XX 行]
```

**完整提示詞**: 查看 [config/PROMPTS.md](config/PROMPTS.md)

## ⚙️ 環境配置

- **[.env](../.env)** - 環境變數配置（30+ 設置）
- **[.vscode/settings.json](../.vscode/settings.json)** - VS Code 設置建議

## 🔧 自動化

**啟動腳本**: [config/startup.js](config/startup.js)

運行初始化：
```bash
node config/startup.js
```

或從任意目錄：
```bash
node /Users/user/Dev/SEO-Skills/.claude/config/startup.js
```

## 📊 系統狀態

| 組件 | 狀態 | 檔案數 |
|-----|------|--------|
| 配置系統 | ✅ 完整 | 4 |
| 技能系統 | ✅ 完整 | 1+ |
| 工作流系統 | ✅ 完整 | 4+ |
| 記憶系統 | ✅ 完整 | 8 |
| 文檔系統 | ✅ 完整 | 4 |
| **總計** | ✅ **20+** | |

## 📈 版本信息

- **系統版本**: 1.0.0
- **構建日期**: 2026-02-01
- **最後更新**: 2026-02-01
- **狀態**: ✅ 完全就位

## 🎯 推薦閱讀順序

1. **[GETTING_STARTED.md](GETTING_STARTED.md)** (5 min) - 快速了解
2. **[memory/QUICKREF.md](memory/QUICKREF.md)** (3 min) - 常用命令
3. **[config/PROMPTS.md](config/PROMPTS.md)** (15 min) - 詳細指南
4. **[config/init.md](config/init.md)** (10 min) - 系統架構
5. **[workflows/README.md](workflows/README.md)** (8 min) - 工作流説明

**總時間**: 約 45 分鐘深度了解整個系統

## 🔗 相關檔案（在工作區根目錄）

- `.env` - 環境變數配置
- `.vscode/settings.json` - VS Code 設置
- `.claude/` - 本目錄（記憶系統）

## 📞 需要幫助？

| 問題 | 查看 |
|-----|------|
| 如何開始？ | [GETTING_STARTED.md](GETTING_STARTED.md) |
| 提示詞是什麼？ | [config/PROMPTS.md](config/PROMPTS.md) |
| 記憶檔案怎麼用？ | [config/init.md](config/init.md) |
| 工作流怎麼建立？ | [workflows/README.md](workflows/README.md) |
| 常用命令？ | [memory/QUICKREF.md](memory/QUICKREF.md) |
| 系統概覽？ | [SYSTEM_REPORT.md](SYSTEM_REPORT.md) |

## 🎉 準備好了嗎？

執行系統初始化：

```bash
node config/startup.js
```

或在 Claude Code 中使用初始化提示詞。

---

**快速導航**: [首頁](.) | [快速開始](GETTING_STARTED.md) | [完整指南](config/PROMPTS.md) | [系統報告](SYSTEM_REPORT.md)
