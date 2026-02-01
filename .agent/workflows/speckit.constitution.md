---
description: 建立或更新專案憲章 - 從互動或提供的原則輸入，確保所有依賴模板保持同步
---

# /speckit.constitution - 憲章管理

## 用途

更新專案憲章 `.specify/memory/constitution.md`。此檔案是包含方括號佔位符標記的模板。您的工作是 (a) 收集/推導具體值，(b) 精確填寫模板，(c) 在依賴產出物間傳播任何修訂。

## 執行步驟

### 1. 載入現有憲章模板

讀取 `.specify/memory/constitution.md`

- 識別每個 `[ALL_CAPS_IDENTIFIER]` 形式的佔位符標記

**重要**: 使用者可能需要比模板中使用的更少或更多原則。如果指定了數量，請遵循。

### 2. 收集/推導佔位符值

- 如果使用者輸入（對話）提供了值，使用它
- 否則從現有 repo 上下文推斷（README、文件、先前憲章版本）
- 治理日期：
  - `RATIFICATION_DATE` 是原始採用日期（如未知則詢問或標記 TODO）
  - `LAST_AMENDED_DATE` 是今天（如有變更），否則保持之前的
- `CONSTITUTION_VERSION` 必須根據語義版本規則遞增：
  - MAJOR: 向後不相容的治理/原則移除或重新定義
  - MINOR: 新增原則/章節或實質擴展指導
  - PATCH: 澄清、措辭、錯字修正、非語義精修

### 3. 草擬更新的憲章內容

- 用具體文字替換每個佔位符（不留方括號標記）
- 保留標題層次結構
- 確保每個原則章節：簡潔名稱行、段落（或項目清單）捕捉不可協商規則、明確理由

### 4. 一致性傳播檢查清單

- 讀取 `.specify/templates/plan-template.md`，確保「憲章檢查」或規則與更新原則對齊
- 讀取 `.specify/templates/spec-template.md`，確保範圍/需求對齊
- 讀取 `.specify/templates/tasks-template.md`，確保任務分類反映新增或移除的原則驅動任務類型
- 讀取每個命令檔案以驗證無過時引用

### 5. 產生同步影響報告

在更新後於憲章檔案頂部作為 HTML 註解前置：

- 版本變更：舊 → 新
- 修改原則清單
- 新增章節
- 移除章節
- 需要更新的模板（✅ 已更新 / ⚠ 待處理）及檔案路徑

### 6. 最終輸出前驗證

- 無殘留未解釋的方括號標記
- 版本行與報告相符
- 日期 ISO 格式 YYYY-MM-DD
- 原則是宣言式、可測試的，無模糊語言

### 7. 寫入完成的憲章

寫回 `.specify/memory/constitution.md`（覆寫）

### 8. 輸出最終摘要

- 新版本和升級理由
- 任何標記需手動後續處理的檔案
- 建議的提交訊息（如：`docs: amend constitution to vX.Y.Z (principle additions + governance update)`）

## 格式與風格要求

- 使用與模板完全相同的 Markdown 標題（不降級/升級層級）
- 換行長理由以保持可讀性（理想 <100 字元）
- 章節間保持單一空白行
- 避免尾隨空白

## 下一步

- `/speckit.specify` - 基於更新憲章實作功能規格
