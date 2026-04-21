import { Sidebar } from './features/workflow-designer/components/sidebar/Sidebar';
import { WorkflowCanvas } from './features/workflow-designer/components/canvas/WorkflowCanvas';
import { NodeInspector } from './features/workflow-designer/components/forms/NodeInspector';
import { SimulationPanel } from './features/workflow-designer/components/panel/SimulationPanel';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center text-white font-bold">
             HR
          </div>
          <span className="font-semibold text-lg text-gray-800 tracking-tight">Workflow Designer Pro</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col relative bg-gray-50">
          <WorkflowCanvas />
        </main>

        {/* Right Inspector Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col z-10 shadow-[-4px_0_15px_-4px_rgba(0,0,0,0.05)]">
          <NodeInspector />
        </aside>
      </div>

      {/* Bottom Panel */}
      <SimulationPanel />
    </div>
  );
}

export default App;
