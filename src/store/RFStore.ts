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
    data: { a: false, b: false, out: false },
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
  onEdgesDeleted: (edgesDeleted: Edge[]) => void;
  onConnect: (connection: Connection) => void;
  toggleOut: (id: string, status: boolean) => void;
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
          const nodeSource = get().nodes.find(
            (nd) => nd.id === connection.source
          );
          if (connection.targetHandle && nodeTarget?.type === "AndGate") {
            const findAndGateIdx = get().nodes.findIndex(
              (nd) => nd.id === nodeTarget.id
            );
            const andGateData = { ...get().nodes[findAndGateIdx].data };
            andGateData[connection.targetHandle] = true;
            state.nodes[findAndGateIdx].data = andGateData;
          }
          if (nodeTarget?.type === "LightBulb" && nodeSource?.data.out) {
            const lightBulbIdx = get().nodes.findIndex(
              (nd) => nd.id === nodeTarget.id
            );
            if (lightBulbIdx > -1) {
              state.nodes[lightBulbIdx].data = { in: true };
            }
          }
          state.edges = addEdge(connection, get().edges);
        });
      },
      onEdgesDeleted: (edgesDeleted) => {
        set((state) => {
          for (const idx in edgesDeleted) {
            const edge = edgesDeleted[idx];
            const nodeTargetIdx = get().nodes.findIndex(
              (nds) => nds.id === edge.target
            );
            if (edge.targetHandle) {
              state.nodes[nodeTargetIdx].data[edge.targetHandle] = false;
            }
          }
        });
      },
      toggleOut: (id, status) => {
        set((state) => {
          const nodeTarget: Node | undefined = get().nodes.find(
            (nd) => nd.id === id
          );
          const nodeTargetIdx = get().nodes.findIndex((nd) => nd.id === id);
          if (nodeTarget) {
            state.nodes[nodeTargetIdx].data = {
              ...nodeTarget.data,
              out: status,
            };
          }
          const edgeConnection = get().edges.find((edg) => edg.source === id);
          const connectedNodeIdx = get().nodes.findIndex(
            (nd) => nd.id === edgeConnection?.target
          );
          if (connectedNodeIdx && edgeConnection?.targetHandle) {
            state.nodes[connectedNodeIdx].data[edgeConnection.targetHandle] =
              status;
          }
        });
      },
    }))
  )
);

export default useStore;
