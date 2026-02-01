#!/usr/bin/env node

/**
 * Claude Code Initialization Script
 * Automatically loads skills, workflows and restores memory on VS Code startup
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

class ClaudeCodeInitializer {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot || process.env.WORKSPACE_ROOT || process.cwd();
    this.claudePath = path.join(this.workspaceRoot, '.claude');
    this.skillsPath = process.env.CLAUDE_SKILLS_PATH ? 
      path.join(this.workspaceRoot, process.env.CLAUDE_SKILLS_PATH) :
      path.join(this.claudePath, 'skills');
    this.memoryPath = process.env.CLAUDE_MEMORY_PATH ?
      path.join(this.workspaceRoot, process.env.CLAUDE_MEMORY_PATH) :
      path.join(this.claudePath, 'memory');
    this.workflowsPath = process.env.CLAUDE_WORKFLOWS_PATH ?
      path.join(this.workspaceRoot, process.env.CLAUDE_WORKFLOWS_PATH) :
      path.join(this.claudePath, 'workflows');
    this.timestamp = new Date().toISOString();
    this.config = {
      autoLoad: process.env.CLAUDE_AUTOLOAD === 'true',
      autoSave: process.env.CLAUDE_AUTOSAVE === 'true',
      verboseInit: process.env.CLAUDE_VERBOSE_INIT === 'true'
    };
  }

  /**
   * Main initialization function
   */
  async initialize() {
    console.log('🚀 Claude Code Initialization Started');
    console.log(`📍 Workspace: ${this.workspaceRoot}`);
    
    try {
      // Step 1: Verify directories
      this.ensureDirectories();
      console.log('✓ Directories verified');

      // Step 2: Load environment
      this.loadEnvironment();
      console.log('✓ Environment loaded');

      // Step 3: Scan and learn skills
      const skills = await this.scanSkills();
      console.log(`✓ Found ${skills.length} skill(s)`);

      // Step 4: Scan workflows
      const workflows = await this.scanWorkflows();
      console.log(`✓ Found ${workflows.length} workflow(s)`);

      // Step 5: Update learned skills memory
      await this.updateLearnedSkills(skills);
      console.log('✓ Updated learned skills index');

      // Step 6: Update workflows registry
      await this.updateWorkflowsRegistry(workflows);
      console.log('✓ Updated workflows registry');

      // Step 7: Restore context
      const context = await this.restoreContext();
      console.log('✓ Context restored');

      // Step 8: Check pending tasks
      const tasks = await this.checkPendingTasks();
      console.log(`✓ ${tasks.length} task(s) pending`);

      // Step 9: Check active workflow
      const activeWorkflow = await this.checkActiveWorkflow();
      if (activeWorkflow) {
        console.log(`⚡ Active workflow: ${activeWorkflow}`);
      }

      console.log('\n✨ Initialization Complete!');
      console.log('\n📊 Status:');
      this.printStatus(skills, workflows, tasks, activeWorkflow);

      return {
        success: true,
        skills: skills.length,
        workflows: workflows.length,
        pendingTasks: tasks.length,
        activeWorkflow: activeWorkflow || 'none',
        timestamp: this.timestamp
      };
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
      if (this.config.verboseInit) {
        console.error(error);
      }
      return { success: false, error: error.message };
    }
  }

      return {
        success: true,
        skills: skills.length,
        pendingTasks: tasks.length,
        timestamp: this.timestamp
      };
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Ensure all required directories exist
   */
  ensureDirectories() {
    [this.skillsPath, this.memoryPath, this.workflowsPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Load environment variables
   */
  loadEnvironment() {
    const envPath = path.join(this.workspaceRoot, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && !key.startsWith('#')) {
          const value = valueParts.join('=').trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      });
    }
  }

  /**
   * Scan all skills in .claude/skills/
   */
  async scanSkills() {
    const skills = [];

    if (!fs.existsSync(this.skillsPath)) {
      return skills;
    }

    const dirs = fs.readdirSync(this.skillsPath, { withFileTypes: true });

    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;

      const skillFile = path.join(this.skillsPath, dir.name, 'SKILL.md');
      
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, 'utf-8');
        const skill = this.parseSkill(dir.name, content);
        skills.push(skill);
      }
    }

    return skills;
  }

  /**
   * Parse SKILL.md file and extract metadata
   */
  parseSkill(skillName, content) {
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const metadata = {};

    if (frontmatterMatch) {
      const lines = frontmatterMatch[1].split('\n');
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });
    }

    // Extract description from content
    const descMatch = content.match(/# (.+)\n\n(.+)/);
    
    return {
      name: metadata.name || skillName,
      description: metadata.description || (descMatch ? descMatch[2] : ''),
      path: `.claude/skills/${skillName}`,
      filename: 'SKILL.md',
      discovered_at: this.timestamp,
      size: content.length
    };
  }

  /**
   * Scan all workflows in .claude/workflows/
   */
  async scanWorkflows() {
    const workflows = [];

    if (!fs.existsSync(this.workflowsPath)) {
      return workflows;
    }

    const dirs = fs.readdirSync(this.workflowsPath, { withFileTypes: true });

    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;
      
      // Skip template and utility files
      if (dir.name.startsWith('.') || dir.name === 'README.md') continue;

      const workflowFile = path.join(this.workflowsPath, dir.name, 'WORKFLOW.md');
      const stepsFile = path.join(this.workflowsPath, dir.name, 'steps.json');
      
      if (fs.existsSync(workflowFile)) {
        const content = fs.readFileSync(workflowFile, 'utf-8');
        const steps = fs.existsSync(stepsFile) ? 
          JSON.parse(fs.readFileSync(stepsFile, 'utf-8')) : null;
        
        const workflow = this.parseWorkflow(dir.name, content, steps);
        workflows.push(workflow);
      }
    }

    return workflows;
  }

  /**
   * Parse WORKFLOW.md and extract metadata
   */
  parseWorkflow(workflowName, content, steps) {
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const metadata = {};

    if (frontmatterMatch) {
      const lines = frontmatterMatch[1].split('\n');
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });
    }

    return {
      name: metadata.name || workflowName,
      version: metadata.version || '1.0.0',
      description: metadata.description || '',
      category: metadata.category || 'general',
      estimatedDuration: metadata.estimated_duration || 'variable',
      path: `.claude/workflows/${workflowName}`,
      discovered_at: this.timestamp,
      totalSteps: steps ? steps.total_steps : 0,
      status: 'available'
    };
  }

  /**
   * Update workflows registry
   */
  async updateWorkflowsRegistry(workflows) {
    const registryFile = path.join(this.workflowsPath, 'active-workflow.md');
    
    let content = '# Active Workflows\n\n';
    content += `*Last Updated: ${this.timestamp}*\n\n`;
    content += `## Registered Workflows\n\n`;
    content += `**Total**: ${workflows.length}\n\n`;

    if (workflows.length > 0) {
      content += '| Name | Version | Category | Status |\n';
      content += '|------|---------|----------|--------|\n';
      
      workflows.forEach(workflow => {
        content += `| ${workflow.name} | ${workflow.version} | ${workflow.category} | ${workflow.status} |\n`;
      });
    } else {
      content += '(No workflows registered yet)\n';
    }

    content += '\n## Workflow Details\n\n';
    workflows.forEach(workflow => {
      content += `### ${workflow.name} (v${workflow.version})\n`;
      content += `- **Path**: ${workflow.path}\n`;
      content += `- **Description**: ${workflow.description}\n`;
      content += `- **Category**: ${workflow.category}\n`;
      content += `- **Steps**: ${workflow.totalSteps}\n`;
      content += `- **Estimated Duration**: ${workflow.estimatedDuration}\n\n`;
    });

    fs.writeFileSync(registryFile, content);
  }
    const skillsFile = path.join(this.memoryPath, 'learned-skills.md');
    
    let content = '# Learned Skills\n\n';
    content += `*Last Updated: ${this.timestamp}*\n`;
    content += `*Total Skills: ${skills.length}*\n\n`;

    skills.forEach((skill, index) => {
      content += `## ${index + 1}. ${skill.name}\n`;
      content += `- **Description**: ${skill.description}\n`;
      content += `- **Path**: ${skill.path}\n`;
      content += `- **Discovered**: ${skill.discovered_at}\n`;
      content += `- **Size**: ${skill.size} bytes\n\n`;
    });

    fs.writeFileSync(skillsFile, content);
  }

  /**
   * Restore context from previous session
   */
  async restoreContext() {
    const cacheFile = path.join(this.memoryPath, 'context-cache.md');
    
    if (!fs.existsSync(cacheFile)) {
      // Create initial context cache
      const initialCache = `# Context Cache\n\n*Created: ${this.timestamp}*\n\n## Current Project State\nInitial state\n\n## Important Variables\nNone yet\n\n## Recently Edited Files\nNone yet\n\n## Current Directory\n${this.workspaceRoot}\n\n## Key Paths\n- Skills: .claude/skills/\n- Memory: .claude/memory/\n- Config: .claude/config/\n\n## Active Dependencies\nNone yet\n`;
      fs.writeFileSync(cacheFile, initialCache);
    }

    return fs.readFileSync(cacheFile, 'utf-8');
  }

  /**
   * Check and load pending tasks
   */
  async checkPendingTasks() {
    const tasksFile = path.join(this.memoryPath, 'task-status.md');
    
    if (!fs.existsSync(tasksFile)) {
      // Create initial task file
      const initialTasks = `# Task Status\n\n*Last Updated: ${this.timestamp}*\n\nNo tasks yet.\n`;
      fs.writeFileSync(tasksFile, initialTasks);
      return [];
    }

    const content = fs.readFileSync(tasksFile, 'utf-8');
    // Simple parsing - count non-completed tasks
    const taskMatches = content.match(/## \[.*?\]/g) || [];
    const incompleteTasks = taskMatches.filter(t => 
      !content.match(new RegExp(`${t}[\\s\\S]*?Status.*completed`, 'i'))
    );

    return incompleteTasks;
  }

  /**
   * Check active workflow
   */
  async checkActiveWorkflow() {
    const stateFile = path.join(this.memoryPath, 'active-workflow-state.md');
    
    if (!fs.existsSync(stateFile)) {
      return null;
    }

    const content = fs.readFileSync(stateFile, 'utf-8');
    const match = content.match(/## Active Workflow: (.+)/);
    return match ? match[1] : null;
  }

  /**
   * Print initialization status
   */
  printStatus(skills, workflows, tasks, activeWorkflow) {
    console.log(`  Skills: ${skills.length} available`);
    console.log(`  Workflows: ${workflows.length} registered`);
    console.log(`  Tasks: ${tasks.length} pending`);
    if (activeWorkflow && activeWorkflow !== 'none') {
      console.log(`  Active Workflow: ${activeWorkflow}`);
    }
    console.log('\n📁 Paths:');
    console.log(`  Skills: ${this.skillsPath}`);
    console.log(`  Memory: ${this.memoryPath}`);
    console.log(`  Workflows: ${this.workflowsPath}`);
  }
}

// Run initialization if this is main module
if (require.main === module) {
  const workspaceRoot = process.argv[2] || process.cwd();
  const initializer = new ClaudeCodeInitializer(workspaceRoot);
  
  initializer.initialize().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = ClaudeCodeInitializer;
