---
description: 執行實作計畫工作流程 - 使用計畫模板生成設計產出物
---

# /speckit.plan - 實作計畫建立

## 用途

基於功能規格建立技術實作計畫，包含研究、資料模型和 API 契約。

## 執行步驟

### 1. 設定環境

```bash
# turbo
.specify/scripts/bash/setup-plan.sh --json
```

解析 JSON 輸出取得：FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH

### 2. 載入上下文

- 讀取 `FEATURE_SPEC`（功能規格）
- 讀取 `.specify/memory/constitution.md`（憲章）
- 載入 `IMPL_PLAN` 模板

### 3. 執行計畫工作流程

1. 填寫技術上下文（未知項標記 "NEEDS CLARIFICATION"）
2. 填寫憲章檢查章節
3. 評估閘門（違規未說明則 ERROR）
4. **Phase 0**：生成 `research.md`（解決所有 NEEDS CLARIFICATION）
5. **Phase 1**：生成 `data-model.md`, `contracts/`, `quickstart.md`
6. **Phase 1**：更新 Agent 上下文

### Phase 0: 大綱與研究

1. 從技術上下文提取未知項：
   - 對於每個 NEEDS CLARIFICATION → 研究任務
   - 對於每個依賴項 → 最佳實踐任務
   - 對於每個整合 → 模式任務

2. 整合發現到 `research.md`：
   - 決策：[選擇了什麼]
   - 理由：[為何選擇]
   - 考慮的替代方案：[評估了什麼]

**輸出**: research.md（所有 NEEDS CLARIFICATION 已解決）

### Phase 1: 設計與契約

**前置條件**: `research.md` 已完成

1. 從功能規格提取實體 → `data-model.md`
2. 從功能需求生成 API 契約 → `/contracts/`
3. 更新 Agent 上下文：

   ```bash
   .specify/scripts/bash/update-agent-context.sh claude
   ```

**輸出**: data-model.md, /contracts/*, quickstart.md

### 4. 停止並報告

命令在 Phase 2 計畫後結束。報告分支、IMPL_PLAN 路徑和生成的產出物。

## 關鍵規則

- 使用絕對路徑
- 閘門失敗或未解決澄清時 ERROR

## 下一步

- `/speckit.tasks` - 分解計畫為任務
- `/speckit.checklist` - 建立檢查清單
