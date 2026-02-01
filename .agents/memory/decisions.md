# Decisions - 架構決策記錄

此檔案記錄跨工具的重要架構決策。

---

## 2026-02-01: 多工具架構整合

### 決策

建立統一的多 AI 工具支援架構：

- `.claude/` - Claude Code 專用（Markdown）
- `.gemini/` - Gemini 專用（TOML）
- `.agent/` - Antigravity 專用（中文 Markdown）
- `.agents/` - 通用代理系統（共享）

### 原因

1. 不同 AI 工具有不同的配置格式需求
2. 需要保持功能對等性
3. 共享資源減少重複

### 結果

- 所有工具共享 `.specify/` 規範
- 所有工具共享 `.agents/memory/` 記憶
- 統一配置在 `.env`

---

## 2026-02-01: 配置統一化

### 決策

將所有配置統一到 `.env`，移除 `.vscode/settings.json` 的配置功能。

### 原因

1. 避免配置重複
2. 減少維護負擔
3. 單一事實來源

### 結果

- `.vscode/settings.json` 重命名為 `.vscode/settings-guide.md`
- 所有路徑配置在 `.env` 中定義

---

*新決策請追加到此檔案*
