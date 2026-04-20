import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflow.store';
import { MockApiService, SimulationLog } from '../../api/workflow.api';
import { cn } from '../canvas/UniversalNode';

export function SimulationPanel() {
  const { nodes, edges } = useWorkflowStore();
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSimulate = async () => {
    setIsRunning(true);
    setLogs([]);
    try {
      const results = await MockApiService.simulateExecution(nodes, edges);
      // stagger rendering for effect
      for (let i = 0; i < results.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        setLogs(prev => [...prev, results[i]]);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-64 border-t border-gray-200 bg-gray-900 flex flex-col font-mono text-sm shadow-inner z-10 relative">
      <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-black/50">
        <div className="text-gray-300 font-semibold flex items-center gap-2">
          <span>Simulation Engine</span>
          {isRunning && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
        </div>
        <button
          onClick={handleSimulate}
          disabled={isRunning || nodes.length === 0}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-1.5 rounded disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Running...' : 'Run Simulation'}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {logs.length === 0 && !isRunning && (
          <div className="text-gray-600 italic">Press Run to execute the workflow DAG...</div>
        )}
        {logs.map(log => (
          <div key={log.id} className="flex gap-3 text-gray-300">
            <span className="text-gray-500 whitespace-nowrap">
              [{new Date(log.timestamp).toLocaleTimeString()}]
            </span>
            <span className={cn(
              log.level === 'error' && 'text-red-400',
              log.level === 'warning' && 'text-amber-400',
              log.level === 'success' && 'text-green-400',
              log.level === 'info' && 'text-blue-300',
            )}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
