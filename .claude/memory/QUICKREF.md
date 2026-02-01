# Claude Code 記憶系統 - 快速參考

## 🚀 快速開始

### 初次使用（複製粘貼）

```
[系統初始化]

請立即執行：
1. 掃描 .claude/skills/* 中的所有技能
2. 讀取 .claude/memory/learned-skills.md
3. 讀取 .claude/memory/context-cache.md
4. 讀取 .claude/memory/task-status.md（顯示待辦）
5. 讀取 .claude/memory/discoveries.md
6. 輸出精簡狀態報告（5-10行）

然後開始回應我的問題。
```

## 📁 文件速查表

| 文件 | 讀取 | 寫入 | 何時用 |
|------|------|------|--------|
| learned-skills.md | 初始化、查技能 | 新發現技能 | 了解可用功能 |
| context-cache.md | 初始化時 | 開始新工作 | 快速進入狀態 |
| task-status.md | 初始化、檢查進度 | 任務開始/完成 | 追蹤工作 |
| session-history.md | 查歷史、參考 | 完成任務後 | 回顧和學習 |
| discoveries.md | 遇到類似問題 | 發現解決方案 | 應用最佳實踐 |

## 📝 常用提示詞

### 初始化
```
[系統初始化]
掃描技能 + 恢復上下文 + 顯示待辦 → 準備就緒
```

### 更新進度
```
[任務進度更新]
已完成: [做了什麼]
更新: learned-skills.md, context-cache.md, task-status.md
```

### 查詢記憶
```
[查詢記憶]
從 discoveries.md 查 [問題]
從 learned-skills.md 查 [技能]
應用相關解決方案
```

## 🎯 工作流速查

1. **開始工作** → 初始化（1 分鐘）
2. **執行任務** → 完成工作（N 分鐘）
3. **任務完成** → 更新記憶（2-5 分鐘）
4. **遇到問題** → 查 discoveries.md（1 分鐘）
5. **發現解決方案** → 記錄到 discoveries.md（2 分鐘）

## 🔗 重要文件

- **完整指南**: [.claude/config/PROMPTS.md](../config/PROMPTS.md)
- **系統說明**: [.claude/config/init.md](../config/init.md)
- **架構定義**: [.claude/config/schema.json](../config/schema.json)
- **啟動腳本**: [.claude/config/startup.js](../config/startup.js)

## ⚡ 命令速查

```bash
# 查看已學習的技能
cat .claude/memory/learned-skills.md

# 查看當前任務
cat .claude/memory/task-status.md

# 查看工作上下文
cat .claude/memory/context-cache.md

# 查看過往發現
cat .claude/memory/discoveries.md

# 查看完整歷史
cat .claude/memory/session-history.md

# 運行初始化腳本
node .claude/config/startup.js /Users/user/Dev/SEO-Skills
```

## ✅ 檢查清單

系統已就位，確認：
- [ ] `.claude/config/` 包含所有配置文件
- [ ] `.claude/memory/` 包含所有記憶文件
- [ ] `.claude/skills/` 包含所有技能定義
- [ ] 下次初始化時使用提示詞模板
- [ ] 每次工作完成後更新記憶

## 💡 進階用法

### 自動化初始化
```bash
node .claude/config/startup.js
```

### 批量更新記憶
完成多個任務後：
1. 更新 session-history.md（記錄所有完成的任務）
2. 更新 context-cache.md（當前狀態）
3. 更新 discoveries.md（發現的模式）
4. 回顧 learned-skills.md（是否需要補充）

### 定期維護
- **每週**: 檢查 discoveries.md 是否有重複的問題
- **每月**: 歸檔舊的 session-history 條目
- **按需**: 更新 learned-skills.md 中的技能說明

---

**版本**: 1.0.0 | **日期**: 2026-02-01
