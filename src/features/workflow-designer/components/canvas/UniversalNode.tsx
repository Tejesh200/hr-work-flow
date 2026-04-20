import { Handle, Position, NodeProps } from '@xyflow/react';
import { AppNode } from '../../store/workflow.store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const themeMap: Record<AppNode['data']['type'], string> = {
  start: 'border-node-start',
  task: 'border-node-task',
  approval: 'border-node-approval',
  automated: 'border-node-automated',
  end: 'border-node-end',
};

const iconMap: Record<AppNode['data']['type'], string> = {
  start: '▶',
  task: '☐',
  approval: '✓',
  automated: '⚙',
  end: '■',
};

export function UniversalNode({ id, data, selected }: NodeProps<AppNode>) {
  const isStart = data.type === 'start';
  const isEnd = data.type === 'end';
  
  return (
    <div
      className={cn(
        'min-w-[180px] bg-white rounded-xl shadow-md border-2 transition-all p-3',
        themeMap[data.type],
        selected ? 'ring-4 ring-primary-100 shadow-xl scale-[1.02]' : 'hover:shadow-lg'
      )}
    >
      {!isStart && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 border-2 border-gray-400 bg-gray-50 top-[-8px]"
        />
      )}
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span>{iconMap[data.type]}</span>
            {data.type}
          </span>
        </div>
        
        <div className="font-medium text-gray-900 leading-tight">
          {data.title || 'Untitled Node'}
        </div>
        
        {data.description && (
          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}

        {/* Dynamic sub-content based on type */}
        {data.type === 'task' && data.assignee && (
          <div className="text-[10px] bg-gray-100 px-2 py-1 rounded mt-2 truncate">
            👤 {data.assignee}
          </div>
        )}
        
         {data.type === 'approval' && data.approverRole && (
          <div className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded mt-2 truncate">
            Role: {data.approverRole}
          </div>
        )}
      </div>

      {!isEnd && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 border-2 border-gray-400 bg-gray-50 bottom-[-8px]"
        />
      )}
    </div>
  );
}
