---
description: 執行實作計畫 - 處理並執行 tasks.md 中定義的所有任務
---

# /speckit.implement - 實作執行

## 用途

按照 tasks.md 中的任務計畫執行實作。

## 執行步驟

### 1. 設定環境

```bash
# turbo
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

### 2. 檢查檢查清單狀態

如果 `FEATURE_DIR/checklists/` 存在：

- 掃描所有檢查清單檔案
- 計算每個檢查清單的完成/未完成項目
- 建立狀態表：

| Checklist | Total | Completed | Incomplete | Status |
|-----------|-------|-----------|------------|--------|
| ux.md     | 12    | 12        | 0          | ✓ PASS |
| test.md   | 8     | 5         | 3          | ✗ FAIL |

- **如果任何檢查清單未完成**: 詢問使用者是否繼續
- **如果所有檢查清單完成**: 自動進入下一步

### 3. 載入並分析實作上下文

- **必需**: tasks.md（完整任務清單）, plan.md（技術堆疊、架構）
- **可選**: data-model.md, plan-uiux.md, contracts/, research.md, quickstart.md

### 4. 專案設定驗證

根據實際專案設定建立/驗證忽略檔案：

**偵測與建立邏輯**:

```bash
# turbo
git rev-parse --git-dir 2>/dev/null  # 檢查是否為 git repo
```

- Git repo → 建立/驗證 .gitignore
- Dockerfile 存在 → 建立/驗證 .dockerignore
- .eslintrc 存在 → 建立/驗證 .eslintignore
- .prettierrc 存在 → 建立/驗證 .prettierignore
- terraform 檔案存在 → 建立/驗證 .terraformignore

### 5. 解析 tasks.md 結構

提取：

- **任務階段**: Setup, Tests, Core, Integration, Polish
- **任務依賴**: 順序 vs 平行執行規則
- **任務詳情**: ID、描述、檔案路徑、平行標記 [P]

### 6. 執行實作

- **階段式執行**: 完成每個階段後再進入下一個
- **尊重依賴**: 順序任務按序執行，平行任務 [P] 可同時執行
- **遵循 TDD 方法**: 先執行測試任務，再執行對應實作任務
- **基於檔案協調**: 影響相同檔案的任務必須順序執行

### 7. 實作執行規則

1. **設定優先**: 初始化專案結構、依賴、配置
2. **測試先行**: 為契約、實體、整合場景撰寫測試
3. **核心開發**: 實作模型、服務、CLI 命令、端點
4. **整合工作**: 資料庫連接、中介軟體、日誌、外部服務
5. **精修與驗證**: 單元測試、效能優化、文件

### 8. 進度追蹤與錯誤處理

- 每完成一個任務後報告進度
- 如果任何非平行任務失敗，停止執行
- 對於平行任務 [P]，繼續成功的任務，報告失敗的
- **重要**: 完成的任務必須在 tasks 檔案中標記為 [X]

### 9. 完成驗證

- 驗證所有必需任務已完成
- 檢查實作的功能符合原始規格
- 驗證測試通過且覆蓋率符合要求
- 確認實作遵循技術計畫

## 注意

此命令假設 tasks.md 中存在完整的任務分解。如果任務不完整或缺失，建議先執行 `/speckit.tasks` 重新生成任務清單。
