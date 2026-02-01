# Active Workflow State

*Last Updated: 2026-02-01T00:00:00Z*

## Current Status

**Active Workflow**: None  
**Status**: Idle  
**Progress**: 0%  
**Last Updated**: 2026-02-01T00:00:00Z  

## Workflow Information

### Active Workflow: None

無當前活躍的工作流。

## Workflow Execution Context

當工作流開始時，在此記錄執行上下文：

```markdown
## Active Workflow: [workflow-name]

- **Version**: 1.0.0
- **Started**: 2026-02-01T00:00:00Z
- **Status**: in-progress
- **Current Step**: 1/3
- **Progress**: 33%
- **Estimated Completion**: 2026-02-01T00:30:00Z
- **Context**:
  - 當前工作目錄: [path]
  - 相關文件: [files]
  - 環境變數: [env vars]
  - 工作流參數: [parameters]

## Step Progress

- [x] Step 1: Completed
- [ ] Step 2: In Progress
  - Current Task: [description]
  - Time Spent: XX minutes
- [ ] Step 3: Not Started
```

## Quick Resume Commands

工作流暫停或中斷時，使用以下提示詞恢復：

```markdown
[恢復工作流: workflow-name]

請從中斷處恢復此工作流：

1. 讀取 .claude/workflows/[workflow-name]/WORKFLOW.md
2. 查看 .claude/memory/active-workflow-state.md
3. 確認當前步驟和進度
4. 繼續執行從當前步驟
5. 更新此檔案的進度
```

## Notes

- 每當工作流狀態改變時更新此檔案
- 保存執行上下文便於恢復
- 工作流完成時更新到 workflow-history.md
