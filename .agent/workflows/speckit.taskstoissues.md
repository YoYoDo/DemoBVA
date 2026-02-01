---
description: 將任務轉換為 GitHub Issues - 基於設計產出物建立可執行、依賴排序的 GitHub Issues
---

# /speckit.taskstoissues - 任務轉 GitHub Issues

## 用途

將現有任務轉換為可執行、依賴排序的 GitHub Issues。

## 執行步驟

### 1. 設定環境

```bash
# turbo
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

解析 FEATURE_DIR 和 AVAILABLE_DOCS 清單。

### 2. 提取任務路徑

從執行的腳本中提取 **tasks** 的路徑。

### 3. 取得 Git Remote

```bash
# turbo
git config --get remote.origin.url
```

> ⚠️ **警告**: 僅在 Remote 是 GitHub URL 時才繼續下一步

### 4. 建立 GitHub Issues

對於任務清單中的每個任務，使用 GitHub MCP 伺服器在對應 Git remote 的儲存庫中建立新 Issue。

> 🚨 **警告**: 在任何情況下都**不得**在與 remote URL 不符的儲存庫中建立 Issues

## 安全檢查

1. 驗證 remote URL 是有效的 GitHub URL
2. 確認目標儲存庫與本地 git remote 相符
3. 僅在確認相符後才開始建立 Issues

## Issue 格式建議

每個 Issue 應包含：

- 標題: 來自任務描述
- 內文: 包含任務詳情、檔案路徑、依賴資訊
- 標籤: 根據任務類型（如 `setup`, `feature`, `test`）
- 里程碑: 根據 Phase（如果適用）
