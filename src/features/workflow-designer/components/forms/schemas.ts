import type { NodeType, FieldSchema } from '../../types/node.types';

export const NodeSchemas: Record<NodeType, FieldSchema[]> = {
  start: [
    { name: 'title', type: 'string', label: 'Node Title', required: true },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'metadata', type: 'textarea', label: 'Metadata (JSON)' },
  ],
  task: [
    { name: 'title', type: 'string', label: 'Task Title', required: true },
    { name: 'description', type: 'textarea', label: 'Instructions' },
    { name: 'assignee', type: 'string', label: 'Assignee Email/ID' },
    { name: 'dueDate', type: 'string', label: 'Due Date (e.g. +3d)' },
    { name: 'customFields', type: 'textarea', label: 'Custom Fields (JSON)' },
  ],
  approval: [
    { name: 'title', type: 'string', label: 'Approval Step Title', required: true },
    { name: 'description', type: 'textarea', label: 'Approval Context' },
    { name: 'approverRole', type: 'enum', label: 'Approver Role', options: [
      { label: 'Direct Manager', value: 'manager' },
      { label: 'HR Admin', value: 'hr_admin' },
      { label: 'Finance', value: 'finance' }
    ]},
    { name: 'autoApproveThreshold', type: 'number', label: 'Auto-Approve Amount ($)' },
  ],
  automated: [
    { name: 'title', type: 'string', label: 'Action Title', required: true },
    { name: 'actionId', type: 'enum', label: 'Action Integration', options: [
      { label: 'Send Email', value: 'send_email' },
      { label: 'Trigger Webhook', value: 'webhook' },
      { label: 'Update Database', value: 'db_update' },
    ]},
    { name: 'actionParams', type: 'textarea', label: 'Action Parameters (JSON)' },
  ],
  end: [
    { name: 'title', type: 'string', label: 'End State Title', required: true },
    { name: 'message', type: 'textarea', label: 'Completion Message' },
    { name: 'summaryFlag', type: 'boolean', label: 'Generate Summary Report?' },
  ]
};
