import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "On",
    data: { out: true },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "On",
    data: { out: true },
    position: { x: 0, y: 150 },
  },
  {
    id: "node-1",
    type: "AndGate",
    position: { x: 250, y: 75 },
    data: { a: false, b: false, c: false },
  },
  {
    id: "3",
    type: "LightBulb",
    data: { in: false },
    position: { x: 450, y: 75 },
  },
];

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
};
const useStore = create<RFState>()(
  immer(
    devtools((set, get) => ({
      nodes: initialNodes,
      edges: [],
      onNodesChange: (changes: NodeChange[]) => {
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
        set((state: RFState) => {
          const nodeTarget = get().nodes.find(
            (nd) => nd.id === connection.target
          );
          if (connection.targetHandle && nodeTarget?.type === "AndGate") {
            const findAndGateIdx = get().nodes.findIndex(
              (nd) => nd.id === nodeTarget.id
            );
            const andGateData = { ...get().nodes[findAndGateIdx].data };
            andGateData[connection.targetHandle] = true;
            andGateData.a && andGateData.b
              ? (andGateData.c = true)
              : (andGateData.c = false);
            if (andGateData.c) {
              const andOutEdgeIdx = get().edges.findIndex(
                (edg) => edg.source === nodeTarget.id
              );
              const outEdge = get().edges[andOutEdgeIdx];
              if (outEdge) {
                const outNodeIdx = get().nodes.findIndex(
                  (nd) => nd.id === outEdge.target
                );
                if (outNodeIdx > -1) {
                  state.nodes[outNodeIdx].data = { in: true };
                }
              }
            }
            state.nodes[findAndGateIdx].data = andGateData;
          }
          state.edges = addEdge(connection, get().edges);
        });
      },
    }))
  )
);

export default useStore;
