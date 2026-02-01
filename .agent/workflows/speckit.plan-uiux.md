---
description: 生成 UI/UX 設計計畫 - 基於 spec.md 、 plan.md 和 data-model.md 建立畫面佈局與互動設計文件
---

# /speckit.plan-uiux - UI/UX 設計計畫

## 用途

基於功能規格和資料模型生成 UI/UX 設計計畫 (`plan-uiux.md`)，定義六階段 UX 流程：

1. **預載階段** - 初始資料、預設狀態、Tabs
2. **載入階段** - 表格欄位、過濾器、搜尋
3. **載入完成** - 分頁、空資料處理
4. **新增功能** - 表單欄位、佈局、回應處理
5. **修改功能** - 編輯表單、回應處理
6. **刪除功能** - 確認流程、回應處理

## 執行步驟

### 1. 設定環境

```bash
# turbo
.specify/scripts/bash/check-prerequisites.sh --json
```

解析 FEATURE_DIR 和 AVAILABLE_DOCS 清單。

### 2. 載入必要文件

從 FEATURE_DIR 讀取：

- **必需**: `spec.md`（使用者故事、需求）
- **建議**: `data-model.md`（實體定義、欄位類型）
- **可選**: `plan.md`（技術堆疊參考）

### 3. 提取實體與欄位

1. 從 `data-model.md` 提取主要實體（Entity）
2. 建立欄位清單：
   - 欄位名稱
   - 資料類型
   - 是否必填
   - 關聯關係
3. 識別 ENUM 類型（用於 Select 選項）

### 4. 分析使用者故事

1. 從 `spec.md` 提取 User Stories
2. 識別 CRUD 操作需求：
   - 列表顯示 (Read)
   - 新增 (Create)
   - 修改 (Update)
   - 刪除 (Delete)
3. 識別過濾/搜尋需求
4. 識別分頁需求

### 5. 生成 plan-uiux.md

使用 `.specify/templates/plan-uiux-template.md` 結構填充：

#### 5.1 預載階段

- 列出需要預先取得的資料（下拉選項、配置等）
- 定義預設狀態值
- 配置 Tabs（如有）

#### 5.2 載入階段

- 從 `data-model.md` 欄位生成表格欄位定義
- 根據 ENUM 類型生成過濾器配置
- 配置搜尋欄位

#### 5.3 載入完成階段

- 設定分頁參數
- 定義空資料/錯誤處理 UI

#### 5.4 新增功能

- 從 `data-model.md` 生成表單欄位
- 根據欄位類型決定輸入元件
- 定義驗證規則
- 設計表單佈局（Grid）
- 定義 API 回應處理

#### 5.5 修改功能

- 標註可編輯/唯讀欄位
- 定義資料載入方式
- 制定表格開啟方式:側開
- 設計編輯表單佈局
- 定義 API 回應處理

#### 5.6 刪除功能

- 設計確認對話框
- 定義 API 回應處理

### 6. 生成元件清單

根據設計產出元件清單：

```
[Feature]Table.tsx      - 主表格元件
[Feature]CreateDialog.tsx - 新增對話框
[Feature]EditSlide.tsx    - 編輯側邊欄
[Feature]DeleteConfirm.tsx - 刪除確認
```

### 7. 生成 API Hooks 清單

```
useGet[Feature]s     - 列表查詢
useCreate[Feature]   - 新增
useUpdate[Feature]   - 修改
useDelete[Feature]   - 刪除
```

## 欄位類型對應

| data-model 類型 | UI 元件 | 說明 |
|----------------|---------|------|
| String | TextField | 文字輸入 |
| String (email) | TextField + email 驗證 | Email 輸入 |
| String (phone) | TextField + 格式驗證 | 電話輸入 |
| Int / Float | TextField type=number | 數字輸入 |
| Boolean | Switch / Checkbox | 布林值 |
| DateTime | DateTimePicker | 日期時間 |
| Date | DatePicker | 日期 |
| Enum | Select | 下拉選擇 |
| Relation (1:1) | Autocomplete | 關聯選擇 |
| Relation (1:N) | Autocomplete multiple | 多選關聯 |

## 輸出

- `plan-uiux.md` 路徑
- 表格欄位數量
- 表單欄位數量
- 識別的元件清單
- 識別的 API Hooks

## 最佳實踐參考

此 workflow 整合 `vercel-react-best-practices` 技能：

- `async-suspense-boundaries` - Loading 狀態處理
- `client-swr-dedup` - SWR 資料取得
- `rerender-transitions` - 表單提交狀態
- `bundle-dynamic-imports` - Dialog/SlidePanel 動態載入

## 下一步

- `/speckit.tasks` - 將 plan-uiux.md 轉換為可執行任務
- `/speckit.implement` - 開始實作 UI 元件
