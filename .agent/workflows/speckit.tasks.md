---
description: 生成可執行的任務清單 - 基於設計產出物建立依賴排序的 tasks.md
---

# /speckit.tasks - 任務清單生成

## 用途

基於可用的設計產出物生成可執行、依賴排序的任務清單（tasks.md）。

## 執行步驟

### 1. 設定環境

```bash
# turbo
.specify/scripts/bash/check-prerequisites.sh --json
```

解析 FEATURE_DIR 和 AVAILABLE_DOCS 清單。

### 2. 載入設計文件

從 FEATURE_DIR 讀取：

- **必需**: plan.md（技術堆疊、函式庫、結構）, spec.md（使用者故事與優先級）
- **可選**: data-model.md（實體）, plan-uiux.md(使用界面及使用者體驗) , contracts/（API 端點）, research.md（決策）, quickstart.md（測試場景）

### 3. 執行任務生成工作流程

1. 載入 plan.md，提取技術堆疊、函式庫、專案結構
2. 載入 spec.md，提取使用者故事與優先級（P1, P2, P3...）
3. 如果 data-model.md 存在：提取實體並對應到使用者故事
4. 如果 plan-uiux.md 存在：比對data-model.md與plan-uiux.md的對應及畫面佈局，提升使用者故事使用體驗
5. 如果 contracts/ 存在：對應端點到使用者故事
6. 如果 research.md 存在：提取決策用於設定任務
7. 生成按使用者故事組織的任務
8. 生成依賴圖
9. 建立平行執行範例
10. 驗證任務完整性

### 4. 生成 tasks.md

使用 `.specify/templates/tasks-template.md` 結構：

- Phase 1: 設定任務（專案初始化）
- Phase 2: 基礎任務（阻塞先決條件）
- Phase 3: UI/UX 畫面佈局任務 (使用者操作體驗條件)
- Phase 4+: 每個使用者故事一個階段（按優先級排序）
- 最終 Phase: 專注每個使用者故事與使用者體驗的驗證，並精修與跨領域關注點

## 任務格式（必需）

每個任務**必須**嚴格遵循此格式：

```text
- [ ] [TaskID] [P?] [Story?] 描述與檔案路徑
```

**格式組成**:

1. **核取方塊**: 始終以 `- [ ]` 開頭
2. **任務 ID**: 順序編號（T001, T002, T003...）
3. **[P] 標記**: 僅當任務可平行執行時包含
4. **[Story] 標籤**: 使用者故事階段任務必需（[US1], [US2], [US3]...）
5. **描述**: 清晰動作與確切檔案路徑

**範例**:

- ✅ `- [ ] T001 Create project structure per implementation plan`
- ✅ `- [ ] T012 [P] [US1] Create User model in src/models/user.py`
- ❌ `- [ ] Create User model`（缺少 ID 和 Story 標籤）

## 任務組織

1. **從使用者故事**（主要組織）：每個使用者故事獨立一個階段
2. **從契約**：對應端點到服務的使用者故事
3. **從資料模型**：對應實體到需要它的使用者故事
4. **從設定/基礎設施**：共享基礎設施 → 設定階段
5. **從畫面欄位對應資料模型** : 做資料型態儲存前的檢查作業

## 5. 報告

輸出：

- tasks.md 路徑
- 總任務數
- 每個使用者故事任務數
- 畫面㯗位與資料欄位對應一致性
- 畫面㯗位儲存前的㯗位類型檢查
- 識別的平行機會
- 建議的 MVP 範圍

## 下一步

- `/speckit.analyze` - 分析一致性
- `/speckit.implement` - 開始實作
