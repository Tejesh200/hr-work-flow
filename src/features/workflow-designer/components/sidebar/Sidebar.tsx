import React from 'react';
import { NodeType } from '../../types/node.types';

const nodeDraggableTypes: { type: NodeType; label: string; icon: string; description: string }[] = [
  { type: 'start', label: 'Start Trigger', icon: '▶', description: 'Entry point for the workflow.' },
  { type: 'task', label: 'Manual Task', icon: '☐', description: 'Assigned to a human.' },
  { type: 'approval', label: 'Approval Gate', icon: '✓', description: 'Requires authorization.' },
  { type: 'automated', label: 'Automated Action', icon: '⚙', description: 'System executed step.' },
  { type: 'end', label: 'End Flow', icon: '■', description: 'Terminal state.' },
];

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="font-bold text-lg text-gray-900">HR Workflow</h1>
        <p className="text-xs text-gray-500 mt-1">Drag nodes to the canvas to build your process.</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
        {nodeDraggableTypes.map((node) => (
          <div
            key={node.type}
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
            className="group flex flex-col p-3 border border-gray-200 rounded-lg cursor-grab hover:border-primary-400 hover:bg-primary-50 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 font-medium text-gray-800 group-hover:text-primary-700">
              <span className="text-lg w-6 text-center">{node.icon}</span>
              {node.label}
            </div>
            <div className="text-xs text-gray-500 mt-1 pl-8">
              {node.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
