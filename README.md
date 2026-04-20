# HR Workflow Designer Pro

A production-ready prototype for an HR Automated Workflow execution engine and designer built with React, Vite, Typescript, Zustand, and React Flow.

## Architecture

This project strictly follows a **Domain-Driven Design (DDD)** tailored for modern React:

- `src/features/workflow-designer/`: Encapsulates the entire domain logic.
- **Canvas (React Flow)**: Acts as a pure, controlled view layer for nodes.
- **Store (Zustand)**: Serves as the single source of truth for all DAG connections, decoupling state from the UI.
- **Forms Engine**: Exclusively schema-driven. Adding new Node Types requires declaring a new `FieldSchema` array, bypassing hardcoded React components.
- **Simulation Engine**: A mock API service that validates graph integrity using topological analysis and renders a real-time event log.

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start the dev server
npm run dev
\`\`\`

## Advanced Design Patterns Employed

- **Discriminated Unions**: Node configurations utilize strict TypeScript discriminated unions mapped against a literal `type`.
- **Polymorphic Rendering**: The `UniversalNode` component adapts structurally and aesthetically based purely on state properties, eliminating redundant node declarations.
- **Decoupled API Abstraction**: `SimulationPanel.tsx` hooks straight into `MockApiService`, isolating all backend interaction logic.

## Usage Guide
1. Drag predefined node templates from the left Sidebar into the interactive canvas.
2. Click any node to dynamically load its specific Form Schema in the Inspector panel.
3. Draw edge connections strictly proceeding from Start -> Action -> End.
4. Press **Run Simulation** to execute the acyclic graph traversal.
