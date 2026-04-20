import { useWorkflowStore } from '../../store/workflow.store';
import { NodeSchemas } from './schemas';
import { DynamicForm } from './DynamicForm';

export function NodeInspector() {
  const { nodes, activeNodeId, updateNodeData, removeNode } = useWorkflowStore();

  const activeNode = nodes.find(n => n.id === activeNodeId);

  if (!activeNode) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 p-6 text-center">
        Select a node on the canvas to configure its properties.
      </div>
    );
  }

  const schema = NodeSchemas[activeNode.data.type];

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Node Properties</h2>
        <button
          onClick={() => removeNode(activeNode.id)}
          className="text-red-500 hover:bg-red-50 p-2 rounded text-sm font-medium transition-colors"
          title="Delete Node"
        >
          Delete
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1">
        <div className="mb-6 rounded bg-primary-50 text-primary-800 p-3 text-xs border border-primary-100 flex items-center gap-2">
          <span className="font-bold uppercase">{activeNode.data.type} Node</span>
          <span className="text-gray-400">|</span>
          <span className="font-mono">{activeNode.id.split('-')[0]}</span>
        </div>

        <DynamicForm 
          schema={schema} 
          data={activeNode.data} 
          onChange={(key, value) => {
            updateNodeData(activeNode.id, { [key]: value });
          }}
        />
      </div>
    </div>
  );
}
