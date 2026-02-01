# Active Workflows

*Last Updated: 2026-02-01T00:00:00Z*

## Current Status

**Active Workflows**: 0  
**Registered Workflows**: 0  
**In Progress**: None  

## Available Workflows

| Name | Version | Status | Progress |
|------|---------|--------|----------|
| (無可用工作流，請添加第一個) | - | - | - |

## Recently Completed Workflows

無記錄

## Workflow Registry

### Format
```markdown
## [Workflow Name]
- **Version**: 1.0.0
- **Status**: available | in-progress | completed | archived
- **Path**: .claude/workflows/[workflow-name]
- **Estimated Duration**: XX minutes
- **Last Used**: YYYY-MM-DD
- **Progress**: 0% | 50% | 100%
```

## How to Add New Workflows

1. Create directory: `.claude/workflows/[workflow-name]/`
2. Add required files:
   - `WORKFLOW.md` - Workflow definition
   - `steps.json` - Step configuration
   - `checklist.md` - Completion checklist
3. Register here with status: `available`
4. Test and validate
5. Update progress as work proceeds

## Notes

新的工作流添加後，此檔案會自動更新。
