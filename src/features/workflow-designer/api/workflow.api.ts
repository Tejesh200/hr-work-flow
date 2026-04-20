import { AppNode } from '../store/workflow.store';
import { Edge } from '@xyflow/react';

export interface AutomationAction {
  id: string;
  label: string;
}

export interface SimulationLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export class MockApiService {
  static async getAutomations(): Promise<AutomationAction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'send_email', label: 'Send Welcome Email' },
          { id: 'create_jira', label: 'Create Jira Ticket' },
          { id: 'slack_msg', label: 'Notify Slack Channel' },
        ]);
      }, 500);
    });
  }

  // A completely mock execution that analyzes the DAG structurally
  static async simulateExecution(nodes: AppNode[], edges: Edge[]): Promise<SimulationLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const logs: SimulationLog[] = [];
        const addLog = (level: SimulationLog['level'], msg: string) => {
          logs.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            level,
            message: msg
          });
        };

        addLog('info', 'Analyzing Workflow Structure...');

        const startNodes = nodes.filter(n => n.data.type === 'start');
        if (startNodes.length === 0) {
          addLog('error', 'Validation Failed: Graph must contain at least one Start Node.');
          return resolve(logs);
        }
        if (startNodes.length > 1) {
          addLog('error', 'Validation Failed: Graph cannot contain multiple Start Nodes.');
          return resolve(logs);
        }

        const endNodes = nodes.filter(n => n.data.type === 'end');
        if (endNodes.length === 0) {
          addLog('warning', 'Notice: Flow appears open-ended (no End Node detected).');
        }

        addLog('success', `Graph Validated: ${nodes.length} nodes, ${edges.length} connections.`);

        // Mock traversing the primary connected path
        let currentNode = startNodes[0];
        let visited = new Set<string>();

        while (currentNode && !visited.has(currentNode.id)) {
          visited.add(currentNode.id);
          addLog('info', `Executing: [${currentNode.data.type.toUpperCase()}] ${currentNode.data.title}`);

          // Simulate processing time
          if (currentNode.data.type === 'automated') {
             addLog('success', `-> Automation Triggered: ${(currentNode.data as any).actionId || 'Unknown Action'}`);
          }

          // Find next
          const outEdges = edges.filter(e => e.source === currentNode.id);
          if (outEdges.length > 0) {
             const nextNode = nodes.find(n => n.id === outEdges[0].target); // simplistic path execution
             if (nextNode) {
               currentNode = nextNode;
             } else {
               break;
             }
          } else {
             break;
          }
        }

        if (currentNode?.data.type === 'end') {
          addLog('success', 'Workflow Execution Completed Successfully.');
        } else {
          addLog('info', 'Execution paths exhausted.');
        }

        resolve(logs);
      }, 1000);
    });
  }
}
