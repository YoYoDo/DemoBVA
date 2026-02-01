# Shared Context - 跨工具共享上下文

此檔案為所有 AI 工具共享的上下文記憶。

---

## 項目資訊

- **項目名稱**: SpecSkills
- **項目類型**: AI 輔助開發工具
- **工作區路徑**: `/Users/user/Dev/SpecSkills`

---

## 可用的 AI 工具系統

| 工具 | 目錄 | 格式 | 命令數 | 預載指令 |
|------|------|------|--------|----------|
| Claude Code | `.claude/commands/` | Markdown | 10 | `[系統初始化]` |
| Gemini | `.gemini/commands/` | TOML | 11 | `/load_context` |
| Antigravity | `.agent/workflows/` | Markdown (中文) | 11 | `/load_context` |

---

## Speckit 命令列表

所有工具共享相同的 speckit 工作流：

1. `speckit.specify` - 建立功能規格
2. `speckit.clarify` - 釐清規格問題
3. `speckit.plan` - 建立實作計畫
4. `speckit.plan-uiux` - UI/UX 設計計畫
5. `speckit.tasks` - 生成任務清單
6. `speckit.taskstoissues` - 轉換為 GitHub Issues
7. `speckit.implement` - 執行實作
8. `speckit.analyze` - 跨產物分析
9. `speckit.checklist` - 生成檢查清單
10. `speckit.constitution` - 項目憲章
11. `load_context` - 預載入上下文（Gemini/Antigravity）

---

## 共享資源

- `.specify/` - 規範模板和腳本
- `.specify/templates/` - 文檔模板
- `.specify/scripts/` - 自動化腳本
- `.specify/memory/` - 規範知識庫

---

## 配置

統一配置來源：`.env`

---

*最後更新: 2026-02-01*
