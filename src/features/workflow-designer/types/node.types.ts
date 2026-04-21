export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData extends Record<string, unknown> {
  title: string;
  description?: string;
  type: NodeType;
}

export interface StartNodeData extends BaseNodeData {
  type: 'start';
  metadata: string; // Stored as a stringified JSON or plain text for simplicity in editing
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  assignee: string;
  dueDate: string;
  customFields: string; 
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  type: 'automated';
  actionId: string;
  actionParams: string; // JSON string for ease of editing in a generic text area
}

export interface EndNodeData extends BaseNodeData {
  type: 'end';
  message: string;
  summaryFlag: boolean;
}

export type NodeDataMap = {
  start: StartNodeData;
  task: TaskNodeData;
  approval: ApprovalNodeData;
  automated: AutomatedNodeData;
  end: EndNodeData;
};

// Generic union for state processing
export type AnyNodeData = NodeDataMap[NodeType];

export interface FieldSchema {
  name: string; // maps to keys in the NodeData block
  type: 'string' | 'number' | 'boolean' | 'enum' | 'textarea';
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}
