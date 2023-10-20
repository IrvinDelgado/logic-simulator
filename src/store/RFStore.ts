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
  Position,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialNodes: Node[] = [
  {
    id: "1",
    sourcePosition: Position.Right,
    type: "input",
    data: { label: "Input Node" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    sourcePosition: Position.Right,
    type: "input",
    data: { label: "Input Node" },
    position: { x: 0, y: 150 },
  },
  {
    id: "node-1",
    type: "AndGate",
    position: { x: 250, y: 75 },
    data: { a: false, b: false },
  },
  {
    id: "3",
    targetPosition: Position.Left,
    type: "output",
    data: { label: "Output Node" },
    style: { backgroundColor: "grey" },
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
          const nodeSource = get().nodes.find(
            (nd) => nd.id === connection.source
          );
          const nodeTarget = get().nodes.find(
            (nd) => nd.id === connection.target
          );
          if (
            connection.targetHandle &&
            nodeSource?.type === "input" &&
            nodeTarget?.type === "AndGate"
          ) {
            const findAndGateIdx = get().nodes.findIndex(
              (nd) => nd.id === nodeTarget.id
            );
            state.nodes[findAndGateIdx].data[connection.targetHandle] = true;
          }
          state.edges = addEdge(connection, get().edges);
        });
      },
    }))
  )
);

export default useStore;
