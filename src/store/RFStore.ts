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

const initialNodes: Node[] = [];

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onEdgesDeleted: (edgesDeleted: Edge[]) => void;
  onConnect: (connection: Connection) => void;
  toggleOut: (id: string, status: boolean) => void;
  addNode: (node: Node) => void;
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
          const nodeTargetIdx = get().nodes.findIndex(
            (nd) => nd.id === connection.target
          );
          const nodeSource = get().nodes.find(
            (nd) => nd.id === connection.source
          );
          let nodeSourceHandleState = false;
          if (
            nodeTargetIdx > -1 &&
            connection.targetHandle &&
            nodeSource &&
            connection.sourceHandle
          ) {
            nodeSourceHandleState = nodeSource.data[connection.sourceHandle];
            state.nodes[nodeTargetIdx].data[connection.targetHandle] =
              nodeSourceHandleState;
          }
          const animatedConnection = {
            ...connection,
            animated: nodeSourceHandleState,
            style: { stroke: nodeSourceHandleState ? "yellow" : "gray" },
          };
          state.edges = addEdge(animatedConnection, get().edges);
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
          // Update Current Node Out to new Status
          const nodeTargetIdx = get().nodes.findIndex((nd) => nd.id === id);
          if (nodeTargetIdx > -1) {
            const nodeTarget = get().nodes[nodeTargetIdx];
            state.nodes[nodeTargetIdx].data = {
              ...nodeTarget.data,
              out: status,
            };
          }
          // Update All Nodes based on Edges Source Node Output
          // 1. Get All Edges this Node is Connected to
          // 2. Update All the Nodes and Edges this Node is Connected to
          const connectedEdgesIdx: number[] = get().edges.reduce(
            (acc: number[], edg, idx) => {
              if (edg.source === id) {
                acc.push(idx);
              }
              return acc;
            },
            []
          );
          if (connectedEdgesIdx.length < 0) return;
          connectedEdgesIdx.forEach((edgeIdx) => {
            const connectedEdge = get().edges[edgeIdx];
            if (!connectedEdge.targetHandle) return;
            // For an edge to exist a Source and Target Node MUST exist
            const connectedNodeIdx = get().nodes.findIndex(
              (nd) => nd.id === connectedEdge.target
            );
            const updatedConnection = {
              ...connectedEdge,
              animated: status,
              style: { stroke: status ? "yellow" : "gray" },
            };
            state.edges[edgeIdx] = updatedConnection;
            state.nodes[connectedNodeIdx].data[connectedEdge.targetHandle] =
              status;
          });
        });
      },
      addNode: (node) => {
        set((state) => {
          state.nodes.push(node);
        });
      },
    }))
  )
);

export default useStore;
