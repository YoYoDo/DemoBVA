# Workflow 工作流系統

## 工作流架構

```
.claude/workflows/
├── [workflow-name]/
│   ├── WORKFLOW.md          # 工作流定義和說明
│   ├── steps.json           # 工作流步驟配置
│   ├── context.md           # 工作流特定的上下文
│   ├── checklist.md         # 工作流檢查清單
│   └── templates/           # 可複用的模板
│       ├── template-1.md
│       └── template-2.md
│
└── active-workflow.md       # 當前活躍的工作流追蹤
```

## 工作流的用途

工作流是**預定義的、可重複執行的工作流程**，包括：

1. **開發工作流** - 功能開發的標準流程
2. **測試工作流** - 測試和驗證流程
3. **發布工作流** - 代碼發布和部署流程
4. **調查工作流** - 問題診斷和根本原因分析
5. **優化工作流** - 性能和效率改進

## 工作流 vs 任務

| 維度 | 工作流 | 任務 |
|------|--------|------|
| **定義** | 預定義的可重複流程 | 特定的一次性工作 |
| **結構** | 包含多個步驟和檢查點 | 通常是單一的工作項 |
| **重用** | 可多次使用 | 完成後結束 |
| **模板** | 有標準模板 | 無固定模板 |
| **檢查清單** | 有詳細檢查清單 | 無特定檢查清單 |

## 工作流檔案格式

### WORKFLOW.md（工作流定義）

```markdown
---
name: [工作流名稱]
version: 1.0.0
description: [簡介]
category: [類別]
estimated_duration: [預計耗時]
---

# [工作流名稱]

## 目標
[此工作流的主要目標]

## 先決條件
- [必要的環境或狀態]
- [必要的技能或工具]

## 工作流步驟
### 第 1 步：[步驟名稱]
[步驟說明]

### 第 2 步：[步驟名稱]
[步驟說明]

## 檢查點
- [ ] 完成條件 1
- [ ] 完成條件 2

## 常見問題
**Q: [問題]**
A: [答案]

## 相關資源
- [資源 1]
- [資源 2]
```

### steps.json（步驟配置）

```json
{
  "workflow_name": "[工作流名稱]",
  "total_steps": 3,
  "steps": [
    {
      "id": 1,
      "name": "步驟名稱",
      "description": "步驟說明",
      "estimated_time_minutes": 10,
      "required_files": ["檔案路徑"],
      "commands": ["命令1", "命令2"],
      "outputs": ["輸出檔案"],
      "success_criteria": ["成功標準"]
    }
  ]
}
```

## 工作流生命週期

```
1. 初始化
   ├─ 檢查先決條件
   ├─ 準備環境
   └─ 加載工作流上下文

2. 執行
   ├─ 第 1 步
   ├─ 第 2 步
   └─ 第 N 步

3. 驗證
   ├─ 檢查完成標準
   ├─ 驗證輸出
   └─ 記錄結果

4. 清理
   ├─ 保存工作流狀態
   ├─ 更新記憶系統
   └─ 生成報告
```

## 與記憶系統的集成

工作流與記憶系統的關係：

```
.claude/
├── workflows/           ← 工作流定義和模板
│   ├── [workflow-name]/
│   └── active-workflow.md
│
├── memory/             ← 工作流執行記錄
│   ├── workflow-history.md      # 新增：工作流執行歷史
│   ├── active-workflow-state.md # 新增：當前工作流狀態
│   └── ...其他記憶檔案
│
└── config/            ← 工作流配置
    └── ...配置檔案
```

## VS Code 集成提示

在 VS Code settings.json 中添加：

```json
{
  "claude.workflows.enabled": true,
  "claude.workflows.path": ".claude/workflows",
  "claude.workflows.autoload": true,
  "claude.workflows.validateOnStart": true,
  "claude.workflows.showProgress": true
}
```

## 快速開始

### 建立新的工作流

1. 在 `.claude/workflows/` 中建立新目錄
2. 添加 `WORKFLOW.md`、`steps.json` 和 `checklist.md`
3. 測試工作流並記錄結果
4. 在 `active-workflow.md` 中註冊工作流

### 執行工作流

使用初始化提示詞：

```
[工作流執行]

請執行工作流: [workflow-name]

1. 從 .claude/workflows/[workflow-name]/WORKFLOW.md 讀取定義
2. 按 steps.json 執行每個步驟
3. 完成時更新 .claude/memory/active-workflow-state.md
4. 記錄結果到 .claude/memory/workflow-history.md
```

## 最佳實踐

1. **一致的命名** - 使用 kebab-case（小寫 + 連字符）
2. **詳細的說明** - 每個步驟都要清楚説明
3. **明確的成功標準** - 定義如何判斷完成
4. **模板複用** - 提供可複用的模板
5. **定期更新** - 根據執行經驗改進工作流
6. **版本控制** - 追蹤工作流版本變化

## 版本管理

工作流版本格式：MAJOR.MINOR.PATCH

- **MAJOR** - 大的流程改變
- **MINOR** - 新增步驟或檢查點
- **PATCH** - 文字改進或小修復

例如：
```
version: 1.0.0  # 初始版本
version: 1.1.0  # 新增驗證步驟
version: 1.1.1  # 文字更正
version: 2.0.0  # 完全重構
```
