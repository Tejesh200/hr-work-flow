import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from '@xyflow/react';
import type { AnyNodeData, NodeType } from '../types/node.types';
import { v4 as uuidv4 } from 'uuid';

export type AppNode = Node<AnyNodeData>;

interface WorkflowState {
  nodes: AppNode[];
  edges: Edge[];
  activeNodeId: string | null;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<AnyNodeData>) => void;
  removeNode: (id: string) => void;
  setActiveNode: (id: string | null) => void;
}

const getDefaultData = (type: NodeType): AnyNodeData => {
  const base = { title: `New ${type} node`, type };
  switch (type) {
    case 'start':
      return { ...base, type: 'start', metadata: '{}' };
    case 'task':
      return { ...base, type: 'task', assignee: '', dueDate: '', customFields: '' };
    case 'approval':
      return { ...base, type: 'approval', approverRole: '', autoApproveThreshold: 0 };
    case 'automated':
      return { ...base, type: 'automated', actionId: '', actionParams: '{}' };
    case 'end':
      return { ...base, type: 'end', message: '', summaryFlag: false };
    default:
      return base as any;
  }
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  activeNodeId: null,

  onNodesChange: (changes: NodeChange<AppNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (type: NodeType, position: { x: number; y: number }) => {
    const newNode: AppNode = {
      id: uuidv4(),
      type: 'universal', // All map to our UniversalNode React component
      position,
      data: getDefaultData(type),
    };

    set({
      nodes: [...get().nodes, newNode],
      activeNodeId: newNode.id,
    });
  },

  updateNodeData: (id: string, data: Partial<AnyNodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } as AnyNodeData } : node
      ),
    }));
  },

  removeNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      activeNodeId: get().activeNodeId === id ? null : get().activeNodeId,
    });
  },

  setActiveNode: (id: string | null) => {
    set({ activeNodeId: id });
  },
}));
