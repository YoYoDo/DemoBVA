# UI/UX Design Plan: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`
**Date**: [DATE]
**Status**: Draft
**Spec**: [link to spec.md]
**Data Model**: [link to data-model.md]

**Note**: This template is filled in by the `/speckit.plan-uiux` command. See `.agent/workflows/speckit.plan-uiux.md` for the execution workflow.

---

## 1️⃣ 預載階段 (Pre-Load)

<!--
  PURPOSE: Define data and state that must be ready BEFORE the UI renders.
  This ensures fast initial paint and proper user experience.
-->

### 初始資料需求

| 資料項目 | 來源 API/Endpoint | 用途 | 快取策略 |
|---------|------------------|------|---------|
| [item] | GET /api/[endpoint] | [purpose] | SWR / Static / None |

### 預設狀態

| 狀態名稱 | 初始值 | TypeScript 類型 | 說明 |
|---------|-------|----------------|------|
| activeTab | 0 | number | 預設 Tab 索引 |
| pageSize | 10 | number | 每頁筆數 |
| search | '' | string | 搜尋關鍵字 |
| filters | {} | FilterState | 過濾條件 |

### Tabs 配置 (如適用)

| Tab 名稱 | 路由/Query | 資料過濾條件 | Icon |
|---------|-----------|-------------|------|
| 全部 | ?tab=all | - | - |
| [Tab1] | ?tab=[value] | { status: '[value]' } | [IconName] |

---

## 2️⃣ 載入階段 (Loading)

<!--
  PURPOSE: Define the initial UI structure and loading behavior.
  Reference: vercel-react-best-practices → async-suspense-boundaries
-->

### 初始 Tab 設定

- **預設 Tab**: [Tab 名稱]
- **Tab 切換觸發**: URL Query / State
- **Loading 狀態 UI**: Skeleton / Spinner / None

### 表格欄位定義

<!--
  Map fields from data-model.md to UI columns.
  Include display component for proper rendering.
-->

| 欄位名稱 | DB 欄位路徑 | TypeScript 類型 | 顯示元件 | 寬度 | 排序 | 可見 |
|---------|------------|----------------|---------|------|------|------|
| [UI Label] | entity.field | string | Typography | auto | ✓ | ✓ |
| [UI Label] | entity.field | EntityStatus | Dot + Text | 100px | ✓ | ✓ |
| [UI Label] | entity.field | Date | formatDate() | 150px | ✓ | ✓ |
| 操作 | - | - | ActionButtons | 100px | ✗ | ✓ |

### 過濾與搜尋功能

| 過濾器名稱 | 元件類型 | 選項來源 | 預設值 | Query Param |
|-----------|---------|---------|-------|-------------|
| 搜尋 | TextField | - | '' | ?search= |
| [Filter1] | Select | ENUM: [EnumName] | '' | ?[param]= |
| [Filter2] | DateRangePicker | - | null | ?from=&to= |

---

## 3️⃣ 載入完成階段 (Loaded)

<!--
  PURPOSE: Define behavior after data is successfully fetched.
  Handle empty states and error states gracefully.
-->

### 資料載入策略

| 設定項 | 值 | 說明 |
|-------|---|------|
| 初始載入 | ☑️ 自動 / ☐ 手動 | 頁面載入時是否自動取得資料 |
| 資料取得 Hook | useGet[Feature]s() | SWR hook 名稱 |
| 刷新觸發 | mutate() | 資料更新後刷新方式 |

### 空資料處理

```
┌─────────────────────────────────────┐
│                                     │
│         [Empty State Icon]          │
│                                     │
│      尚未有任何[Entity]記錄          │
│                                     │
│         [新增第一筆資料]             │
│                                     │
└─────────────────────────────────────┘
```

### 錯誤處理

| 錯誤類型 | 處理方式 |
|---------|---------|
| 網路錯誤 | Alert + Retry 按鈕 |
| 權限錯誤 (403) | 顯示無權限提示 |
| 服務錯誤 (500) | Toast 通知 + 錯誤訊息 |

### 分頁設定

| 設定項 | 值 | 說明 |
|-------|---|------|
| 每頁筆數選項 | [10, 25, 50, 100] | - |
| 預設每頁筆數 | 10 | - |
| 分頁元件位置 | 表格底部 | TablePagination |
| 總筆數顯示 | ✓ | - |

---

## 4️⃣ 新增功能 (Create)

<!--
  PURPOSE: Define the create/add flow for new records.
  Reference: vercel-react-best-practices → rerender-transitions
-->

### 觸發方式

| 設定項 | 值 |
|-------|---|
| 按鈕位置 | 頁面右上角 / 表格上方 |
| 按鈕文字 | 新增[Entity] |
| 按鈕圖示 | Add / Plus |
| 開啟方式 | Dialog / SlidePanel / FullPage |

### 表單欄位配置

<!--
  Map fields from data-model.md to form inputs.
  Specify validation rules for each field.
-->

| 欄位名稱 | DB 欄位 | 類型 | 必填 | 驗證規則 | Grid 佈局 |
|---------|--------|------|------|---------|----------|
| [Label] | field | TextField | ✓ | required, maxLength(100) | xs=12 md=6 |
| [Label] | field | TextField | ✓ | required, email | xs=12 md=6 |
| [Label] | field | Select | ✓ | required | xs=12 |
| [Label] | field | DatePicker | ✗ | - | xs=12 md=6 |

### 表單佈局

```
┌─────────────────────────────────────┐
│ [Header: 新增 {Entity}]              │
├─────────────────────────────────────┤
│                                     │
│ ┌───────────┐ ┌───────────┐        │
│ │ Field 1   │ │ Field 2   │        │
│ └───────────┘ └───────────┘        │
│                                     │
│ ┌─────────────────────────┐        │
│ │ Field 3 (full width)    │        │
│ └─────────────────────────┘        │
│                                     │
│ ┌─────────────────────────┐        │
│ │ Field 4 (Select)        │        │
│ └─────────────────────────┘        │
│                                     │
├─────────────────────────────────────┤
│              [取消] [確認新增]        │
└─────────────────────────────────────┘
```

### 回應處理

| 回應狀態 | HTTP Code | 處理方式 |
|---------|-----------|---------|
| 成功 | 201 | ① 關閉表單 ② Toast 成功通知 ③ 刷新列表 (mutate) |
| 驗證錯誤 | 400 | 顯示欄位錯誤訊息 (setError) |
| 重複資料 | 409 | Toast 提示資料已存在 |
| 服務錯誤 | 500 | Toast 錯誤通知 |

### Loading 狀態

- **提交按鈕**: 顯示 Spinner + 禁用
- **表單欄位**: 禁用所有輸入

---

## 5️⃣ 修改功能 (Update)

<!--
  PURPOSE: Define the edit/update flow for existing records.
  Consider optimistic updates for better UX.
-->

### 觸發方式

| 設定項 | 值 |
|-------|---|
| 按鈕位置 | 表格行 Action 欄 |
| 按鈕圖示 | Edit |
| 開啟方式 | SlidePanel (推薦) / Dialog |
| 選中資料傳遞 | State / URL Param |

### 資料載入

| 設定項 | 值 |
|-------|---|
| 資料來源 | 列表選中資料 / API 重新取得 |
| 欄位預填 | ✓ |
| 載入中 UI | Skeleton |

### 表單欄位配置

<!--
  Some fields may be read-only in edit mode.
  Mark editable status clearly.
-->

| 欄位名稱 | DB 欄位 | 類型 | 可編輯 | 驗證規則 |
|---------|--------|------|-------|---------|
| [Label] | field | TextField | ✗ (唯讀) | - |
| [Label] | field | TextField | ✓ | required |
| [Label] | field | Select | ✓ | required |

### 表單佈局

```
┌─────────────────────────────────────┐
│ [Header: 編輯 {Entity}]         [X] │
├─────────────────────────────────────┤
│                                     │
│ ID: {entity.id} (唯讀)              │
│                                     │
│ ┌─────────────────────────┐        │
│ │ Field 1 (editable)      │        │
│ └─────────────────────────┘        │
│                                     │
│ ┌─────────────────────────┐        │
│ │ Field 2 (Select)        │        │
│ └─────────────────────────┘        │
│                                     │
├─────────────────────────────────────┤
│              [取消] [儲存變更]        │
└─────────────────────────────────────┘
```

### 回應處理

| 回應狀態 | HTTP Code | 處理方式 |
|---------|-----------|---------|
| 成功 | 200 | ① 關閉表單 ② Toast 成功通知 ③ 原地刷新資料 |
| 驗證錯誤 | 400 | 顯示欄位錯誤訊息 |
| 資料衝突 | 409 | 顯示資料已變更提示，提供重載選項 |
| 找不到 | 404 | Toast 提示資料不存在，刷新列表 |

---

## 6️⃣ 刪除功能 (Delete)

<!--
  PURPOSE: Define the delete flow with proper confirmation.
  Consider soft delete vs hard delete implications.
-->

### 觸發方式

| 設定項 | 值 |
|-------|---|
| 按鈕位置 | 表格行 Action 欄 |
| 按鈕圖示 | Trash |
| 確認方式 | Confirm Dialog |
| 批次刪除 | ✓ / ✗ |

### 確認流程

```
┌─────────────────────────────────────┐
│ ⚠️ 確認刪除                          │
├─────────────────────────────────────┤
│                                     │
│ 確定要刪除{Entity}「{name}」嗎？      │
│                                     │
│ 此操作無法復原。                      │
│                                     │
├─────────────────────────────────────┤
│              [取消] [確認刪除]        │
└─────────────────────────────────────┘
```

### 回應處理

| 回應狀態 | HTTP Code | 處理方式 |
|---------|-----------|---------|
| 成功 | 200/204 | ① 關閉 Dialog ② Toast 成功通知 ③ 從列表移除 |
| 權限錯誤 | 403 | Toast 提示無權限刪除 |
| 關聯錯誤 | 409 | 顯示無法刪除原因（有關聯資料） |
| 找不到 | 404 | Toast 提示資料不存在，刷新列表 |

---

## 📊 資料表格欄位對應表

<!--
  This section maps data-model.md entities to UI components.
  Fill this based on the entity definition in data-model.md.
-->

**來源**: data-model.md → Entity: [EntityName]

| UI 欄位名稱 | DB 欄位路徑 | TypeScript Type | 顯示元件 | 格式化函數 |
|------------|------------|-----------------|---------|-----------|
| [Label] | entity.field | string | Typography | - |
| [Label] | entity.status | EntityStatus | Dot + Text | statusLabel() |
| [Label] | entity.created_at | Date | Typography | formatDate() |

---

## 🎨 元件清單

<!--
  List all UI components needed for this feature.
  This helps generate accurate tasks in tasks.md.
-->

| 元件名稱 | 路徑 | 類型 | 依賴 |
|---------|------|------|------|
| [Feature]Table | src/sections/[feature]/[Feature]Table.tsx | Table View | - |
| [Feature]CreateDialog | src/views/[feature]/[Feature]CreateDialog.tsx | Dialog | - |
| [Feature]EditSlide | src/views/[feature]/[Feature]EditSlide.tsx | Slide Panel | - |
| [Feature]DeleteConfirm | src/views/[feature]/[Feature]DeleteConfirm.tsx | Dialog | - |

---

## 🔌 API Hooks

<!--
  List all data fetching hooks needed.
  Reference: vercel-react-best-practices → client-swr-dedup
-->

| Hook 名稱 | 路徑 | 用途 | 方法 |
|----------|------|------|------|
| useGet[Feature]s | src/api/[feature].ts | 取得列表 | GET |
| useCreate[Feature] | src/api/[feature].ts | 新增 | POST |
| useUpdate[Feature] | src/api/[feature].ts | 修改 | PUT/PATCH |
| useDelete[Feature] | src/api/[feature].ts | 刪除 | DELETE |

---

## ✅ Checklist

- [ ] 所有表格欄位已對應至 data-model.md
- [ ] 所有必填欄位已標註驗證規則
- [ ] 所有 API 回應狀態已定義處理方式
- [ ] Loading 與 Error 狀態 UI 已定義
- [ ] 元件命名遵循專案慣例
