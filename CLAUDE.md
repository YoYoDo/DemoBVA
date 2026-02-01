# CLAUDE.md - Claude Code 統一管理中樞

這是 Claude Code 與工作區所有系統的**統一管理和協調檔案**。

---

## 🎯 核心目的

統一管理 Claude Code 在此工作區的所有配置、記憶、技能和工作流，並明確定義不同系統之間的角色和差異。

---

## 📊 系統架構與角色分工

### **系統架構圖**

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│      CLAUDE.md (本文件)                                       │
│      統一管理中樞 & 系統協調                                    │
│                                                              │
│  • 定義所有系統的角色和差異化                                    │
│  • 指明進入點和導航路線                                         │
│  • 管理系統間的交互和同步                                        │
│                                                              │
└───────┬──────────────┬──────────────┬──────────────┬─────────┘
        │              │              │              │
 ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐ ┌─────▼─────┐
 │ .claude/    │ │ .gemini/  │ │ .agent/     │ │ .agents/  │
 │ Claude Code │ │ Gemini    │ │ Antigravity │ │ 通用代理   │
 │ 專用系統     │ │ 專用命令   │ │ 專用工作流   │ │ 系統      │
 └─────────────┘ └───────────┘ └─────────────┘ └───────────┘
```

---

## 📁 系統詳細對比

### **1. .claude/ 系統** 👈 您剛建立的

**定位**: Claude Code 專用記憶、工作流、命令和規範系統

**核心功能**:
- 記憶系統（8 個檔案）- 持久化知識和進度
- 工作流系統 - 預定義、可追蹤的工作流程
- 命令系統（.claude/commands/）- 預加載的 speckit 命令
- 規範系統（.specify/）- 項目規範和規格定義
- 技能索引 - 自動掃描和管理技能
- 自動化初始化 - 秒級恢復工作狀態

**啟動方式**:
```
提示詞: [系統初始化]
終端: node .claude/config/startup.js
VS Code: 配置任務自動運行
```

**文檔入口**:
- 快速開始: `.claude/START_HERE.md`
- 完整指南: `.claude/config/PROMPTS.md`
- 索引: `.claude/README.md`
- 命令列表: `.claude/commands/` (10+ speckit 命令)
- 規範指南: `.specify/` (項目規範和模板)

**特性**:
- ✅ Claude Code 專屬
- ✅ 智能上下文恢復
- ✅ 工作流進度追蹤
- ✅ 記憶自動持久化
- ✅ 環境變數驅動
- ✅ 預加載命令系統（10+ speckit 命令）
- ✅ 規範和規格管理

---

### **2. .agents/ 系統** 🤖

**定位**: 通用代理助手系統（與 AI 工具無關）

**核心功能**:
- 通用技能定義 - 描述代理應有的行為
- 通用記憶 - 事實、決策、會議記錄等
- 與具體 AI 工具無關

**啟動方式**:
```
命令: /load_context
作用: 加載 skills/ 和 memory/ 中的所有檔案
```

**文檔位置**:
- 說明: `.agents/README.md`

**特性**:
- ✅ 工具無關（可用於任何 AI）
- ✅ 簡單直接
- ✅ 手動加載
- ✅ 適合通用上下文

---

### **3. .gemini/ 系統** 🌟

**定位**: Google Gemini 專用命令系統

**核心功能**:
- Gemini 格式命令（TOML 格式）
- 與 `.claude/commands/` 功能對等
- 10 個 speckit 命令完整支援

**文檔位置**:
- 命令: `.gemini/commands/` (10 個 speckit 命令)

**特性**:
- ✅ Gemini 專用
- ✅ TOML 格式
- ✅ 與 Claude 命令功能對等
- ✅ 完整的 speckit 工作流

---

### **4. .agent/ 系統** 🚀

**定位**: Antigravity 專用工作流系統

**核心功能**:
- Antigravity 格式工作流
- 中文版命令定義
- 與 `.claude/commands/` 功能對等

**文檔位置**:
- 工作流: `.agent/workflows/` (11 個工作流)

**特性**:
- ✅ Antigravity 專用
- ✅ 中文指令
- ✅ Markdown 格式
- ✅ 包含 load_context 工作流

---

### **5. 潛在的 GEMINI.md 與 AGENTS.md**

**如果存在的目的**:

| 系統 | 用途 | 何時需要 |
|-----|------|---------|
| GEMINI.md | Google Gemini 專用配置 | 用 Gemini 時 |
| AGENTS.md | 代理特定配置 | 針對代理工具 |

**與 .agents/ 的關係**:
- `.agents/` = 通用代理系統（內容存儲）
- `AGENTS.md` = 代理系統的說明檔 (如需)
- `GEMINI.md` = Gemini 專用說明檔 (如需)

---

## 🔄 系統差異化總結

### **快速對比表**

| 特性 | .claude/ | .gemini/ | .agent/ | .agents/ |
|-----|---------|----------|---------|----------|
| **用途** | Claude Code 專用 | Gemini 專用 | Antigravity 專用 | 通用代理 |
| **格式** | Markdown | TOML | Markdown (中文) | Markdown |
| **命令數** | 10 speckit | 11 (含 load_context) | 11 workflows | 2 skills |
| **記憶系統** | ✅ 8 個檔案 | ✅ 共享記憶 | ✅ 共享記憶 | ✅ 共享 |
| **自動化** | ✅ 完全自動 | ✅ load_context | ⚠️ load_context | ⚠️ 手動 |
| **狀態** | ✅ 主要使用 | ✅ 完整 | ✅ 保留 | ⚠️ 輔助 |

---

## 🎯 何時使用哪個系統？

### **使用 .claude/ 當：**

```
• 在 Claude Code 中工作
• 需要自動初始化和上下文恢復
• 需要工作流進度追蹤
• 需要智能記憶管理
• 需要秒級恢復工作狀態
```

👉 **進入點**: `.claude/START_HERE.md`

### **使用 .agents/ 當：**

```
• 需要通用代理系統
• 使用多種 AI 工具
• 不需要工作流追蹤
• 簡單加載-使用模式
• 工具無關的需求
```

👉 **進入點**: `.agents/README.md`

### **使用 CLAUDE.md 當：**

```
• 需要理解系統架構
• 想協調多個系統
• 需要統一入口點
• 想搞清楚各系統差異
• 進行系統管理決策
```

👉 **進入點**: 就是本文件！

---

## 📋 建議的系統架構

### **方案 1: 當前架構（推薦）** ✅

```
工作區根目錄
├── CLAUDE.md              ← 統一管理檔（本文件）
├── .claude/               ← Claude Code 專用系統
│   ├── README.md
│   ├── config/
│   ├── workflows/         ← 工作流定義
│   ├── commands/          ← 預加載命令（10 speckit）
│   ├── skills/
│   └── memory/            ← 8 個記憶檔案
├── .gemini/               ← Gemini 專用系統
│   └── commands/          ← TOML 格式命令（10 speckit）
├── .agent/                ← Antigravity 專用系統
│   └── workflows/         ← 中文工作流（11 個）
├── .specify/              ← 項目規範和規格（共享）
│   ├── memory/            ← 規範知識庫
│   ├── scripts/           ← 規範腳本
│   └── templates/         ← 規範模板
├── .agents/               ← 通用代理系統（共享）
│   ├── README.md
│   ├── skills/
│   └── memory/
├── .env                   ← 統一環境配置（唯一配置來源）
└── .vscode/
    └── settings-guide.md  ← VS Code 配置說明（非實際配置）
```

**優點**:
- ✅ 清晰分離：Claude 專用 vs 通用代理
- ✅ 統一管理：CLAUDE.md 做協調中樞
- ✅ 易於維護：各系統獨立但關聯
- ✅ 最優實踐：經過驗證的設計

### **方案 2: 已實現的多工具架構** ✅

目前已支持多個 AI 工具：

```
工作區根目錄
├── CLAUDE.md          ← Claude Code 系統（本文件）
├── .claude/           ← Claude 專用（Markdown 命令）
├── .gemini/           ← Gemini 專用（TOML 命令）✅ 已實現
├── .agent/            ← Antigravity 專用（中文工作流）✅ 已實現
├── .agents/           ← 通用代理（共享記憶）
├── .specify/          ← 共享規範和模板
└── .env               ← 統一配置來源
```

---

## 🚀 立即開始指南

### **第一次使用此工作區**

1. **了解系統架構** → 閱讀本檔案 (CLAUDE.md)
2. **啟動 Claude 系統** → 進入 `.claude/START_HERE.md`
3. **加載通用記憶** → 執行 `/load_context` (如需)
4. **開始工作** → 使用提示詞或工作流

### **日常工作流**

```
每次打開工作區:
  ┌─ 執行 Claude 初始化 ────────┐
  │  提示詞: [系統初始化]        │
  │  或命令: node .claude/...  │
  └─────────────┬───────────────┘
                ▼
  自動預加載系統組件
  ├─ .claude/skills/ (所有技能)
  ├─ .claude/workflows/ (所有工作流)
  ├─ .claude/commands/ (10+ speckit 命令)
  ├─ .specify/ (項目規範和規格)
  └─ .claude/memory/ (8 個記憶檔案)
                ▼
  Claude Code 準備完全上下文
  ├─ 已加載所有技能
  ├─ 已加載所有命令和規範
  ├─ 已恢復工作狀態
  ├─ 已顯示待辦任務
  └─ 已加載發現和洞見
                ▼
  開始工作！
```

---

## 📖 完整導航地圖

### **從 CLAUDE.md 出發的導航**

```
CLAUDE.md (您在這裡)
├─ 想快速開始？
│  └─ 前往: .claude/START_HERE.md
├─ 想了解 Claude 系統？
│  └─ 前往: .claude/README.md
├─ 想學習提示詞用法？
│  └─ 前往: .claude/config/PROMPTS.md
├─ 想了解工作流？
│  └─ 前往: .claude/workflows/README.md
├─ 想查看快速參考？
│  └─ 前往: .claude/memory/QUICKREF.md
├─ 想了解代理系統？
│  └─ 前往: .agents/README.md
├─ 想了解系統架構？
│  └─ 前往: .claude/config/init.md
└─ 想看完整報告？
   └─ 前往: .claude/SYSTEM_REPORT.md
```

---

## 🔗 系統間協調

### **信息流向圖**

```
Claude Code 初始化
      ↓
  掃描 .claude/skills/
      ↓
  掃描 .claude/workflows/
      ↓
  預加載 .claude/commands/ (10+ speckit 命令)
      ↓
  預加載 .specify/ (項目規範和規格)
      ↓
  加載 .claude/memory/ (8 個檔案)
      ↓
  恢復完整上下文
      ↓
  可選: 加載 .agents/memory/ (/load_context)
      ↓
  準備就緒！ 所有命令和規範已可用
```

### **記憶和資源系統協調**

| 層級 | 位置 | 用途 | 更新頻率 | 預加載 |
|-----|------|------|---------|--------|
| **L1** | `.claude/memory/` | Claude 專用記憶 | 實時 | ✅ 自動 |
| **L2** | `.agents/memory/` | 通用記憶 | 手動 | ⚠️ 可選 |
| **L3** | `.claude/commands/` | 預定義命令（speckit） | 開發時 | ✅ 自動 |
| **L4** | `.specify/` | 項目規範和規格 | 開發時 | ✅ 自動 |
| **L5** | 工作流輸出 | 任務產物 | 任務完成時 | ✅ 自動 |

---

## 💡 最佳實踐

### **Do ✅**

```
✅ 將 Claude 專用的東西放在 .claude/
✅ 將預定義命令放在 .claude/commands/
✅ 將項目規範放在 .specify/
✅ 將通用的東西放在 .agents/
✅ 用 CLAUDE.md 協調和導航
✅ 定期更新記憶檔案
✅ 在工作流中記錄決策
✅ 使用提示詞執行標準操作
✅ 定期更新命令和規範
✅ 在命令和規範中記錄最佳實踐
```

### **Don't ❌**

```
❌ 不要混淆 .claude/ 和 .agents/ 用途
❌ 不要在 .agents/ 中放 Claude 特定代碼
❌ 不要手動修改初始化檔案
❌ 不要忽略更新記憶檔案
❌ 不要跳過初始化步驟
❌ 不要為每個 AI 工具建立獨立系統
❌ 不要在 .specify/ 之外放置規範文件
❌ 不要在 .claude/commands/ 之外放置 speckit 命令
❌ 不要直接修改 .env 和 .vscode/settings.json 的路徑配置
```

---

## 📈 系統成熟度

### **當前狀態**

| 系統 | 成熟度 | 文檔 | 命令數 | 狀態 | 推薦 |
|-----|--------|------|--------|------|------|
| .claude/ | ⭐⭐⭐⭐⭐ | 完整 | 10 | ✅ 主要 | ✅ Claude Code |
| .gemini/ | ⭐⭐⭐⭐⭐ | 完整 | 11 | ✅ 完整 | ✅ Gemini |
| .agent/ | ⭐⭐⭐⭐ | 完整 | 11 | ✅ 保留 | ✅ Antigravity |
| .specify/ | ⭐⭐⭐⭐⭐ | 完整 | - | ✅ 共享 | ✅ 所有工具 |
| .agents/ | ⭐⭐⭐ | 基礎 | 2 | ⚠️ 輔助 | ⚠️ 可選 |
| .env | ⭐⭐⭐⭐⭐ | 完整 | - | ✅ 唯一配置 | ✅ 必需 |
| CLAUDE.md | ⭐⭐⭐⭐⭐ | 完整 | - | ✅ 中樞 | ✅ 必讀 |

---

## 🎯 推薦行動計劃

### **第 1 步: 立即實施**

```bash
# ✅ 使用 Claude 系統（包含命令和規範預加載）
node .claude/config/startup.js

# 或在 Claude Code 中
[系統初始化]
```

自動預加載包括：
- ✅ .claude/skills/ (所有技能)
- ✅ .claude/workflows/ (所有工作流)
- ✅ .claude/commands/ (10+ speckit 命令) ⭐ NEW
- ✅ .specify/ (項目規範和規格) ⭐ NEW
- ✅ .claude/memory/ (8 個記憶檔案)

配置文件：

- ✅ `.env` - 統一配置來源（唯一）
- ✅ `.vscode/settings-guide.md` - 配置說明文檔（非實際配置）

### **第 2 步: 選擇對應工具**

| 使用工具 | 命令位置 | 格式 |
|---------|---------|------|
| Claude Code | `.claude/commands/` | Markdown |
| Gemini | `.gemini/commands/` | TOML |
| Antigravity | `.agent/workflows/` | Markdown (中文) |

### **第 3 步: 共享資源**

所有工具共享以下資源：

- `.specify/` - 規範模板和腳本
- `.agents/memory/` - 通用記憶（可選）
- `.env` - 環境配置

---

## 🎓 使用場景示例

### **場景 1: 純 Claude Code 用戶** 👤

```
只需要使用 Claude Code
    ↓
使用 .claude/ 系統
    ↓
初始化提示詞: [系統初始化]
    ↓
完成！
```

### **場景 2: 多 AI 工具用戶** 👥

```
使用 Claude, Gemini 等多個工具
    ↓
.claude/ ← Claude Code 專用
.gemini/ ← Gemini 專用 (如需)
.agents/ ← 通用代理系統
    ↓
通過 CLAUDE.md 統一協調
    ↓
完成！
```

### **場景 3: 團隊協作** 👥👥

```
團隊成員使用不同 AI 工具
    ↓
CLAUDE.md ← 統一規範
.agents/ ← 共享通用系統
.claude/ ← 個人 Claude 配置
.{tool-name}/ ← 其他工具配置
    ↓
通過 CLAUDE.md 協調
    ↓
完成！
```

---

## ❓ 常見問題

**Q: 我應該使用 .claude/ 還是 .agents/?**
A: 如果在 Claude Code 中工作，使用 .claude/。如果需要通用系統，用 .agents/。

**Q: .gemini/ 和 .agent/ 目錄是什麼？**
A: `.gemini/` 是 Gemini 專用命令（TOML 格式），`.agent/` 是 Antigravity 專用工作流（中文）。

**Q: 可以同時使用兩個系統嗎？**
A: 完全可以！.claude/ 和 .agents/ 是互補的，不衝突。

**Q: 如何在 CLAUDE.md 和 .claude/README.md 之間選擇？**
A: 
- CLAUDE.md = 架構和協調（您在這裡了解全貌）
- .claude/README.md = 操作和導航（您在那裡執行任務）

**Q: 記憶系統如何同步？**
A: 不需要同步！各系統獨立但組織化。Claude 用 .claude/memory/，通用代理用 .agents/memory/。

---

## 🔧 維護和更新

### **何時更新 CLAUDE.md**

- [ ] 添加新的 AI 工具支持
- [ ] 改變系統架構
- [ ] 添加新的最佳實踐
- [ ] 文檔改進

### **維護檢查清單**

```
□ 每月檢查導航是否正確
□ 確保所有鏈接有效
□ 更新系統成熟度評分
□ 添加新的使用場景（如有）
□ 審查最佳實踐
```

---

## 🌟 總結

### **本檔案的核心目的**

✅ **統一管理** - 一個檔案掌控所有系統  
✅ **明確差異** - 清楚每個系統的角色  
✅ **快速導航** - 快速找到你需要的  
✅ **系統協調** - 確保系統間和諧  
✅ **架構指導** - 為未來擴展提供路線圖  

### **記住**

```
.claude/  = Claude Code 專用（Markdown 命令）
.gemini/  = Gemini 專用（TOML 命令）
.agent/   = Antigravity 專用（中文工作流）
.agents/  = 通用代理系統（共享記憶）
.specify/ = 項目規範（共享模板和腳本）
.env      = 統一配置（唯一來源）
CLAUDE.md = 總指揮、協調中樞、架構藍圖
```

---

## 🚀 立即開始

### **馬上執行**

1. 閱讀本檔案 ✅ (你在做)
2. 前往 `.claude/START_HERE.md` 執行初始化
3. 執行初始化提示詞
4. 開始工作！

### **需要幫助？**

| 問題 | 答案 |
|-----|------|
| 如何開始？ | 前往 `.claude/START_HERE.md` |
| 如何執行工作流？ | 參考 `.claude/config/PROMPTS.md` |
| 快速命令？ | 查看 `.claude/memory/QUICKREF.md` |
| 系統架構？ | 閱讀 `.claude/config/init.md` |
| 其他問題？ | 查看本檔案相關部分 |

---

**版本**: 1.0.0  
**日期**: 2026-02-01  
**狀態**: ✅ 完整就位  
**維護**: 按需更新  

---

**🎯 現在就開始！前往 `.claude/START_HERE.md` 👈**
