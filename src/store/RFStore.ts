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
          const nodeTargetIdx = get().nodes.findIndex((nd) => nd.id === id);
          if (nodeTargetIdx > -1) {
            const nodeTarget = get().nodes[nodeTargetIdx];
            state.nodes[nodeTargetIdx].data = {
              ...nodeTarget.data,
              out: status,
            };
          }
          const edgeConnectionIdx = get().edges.findIndex(
            (edg) => edg.source === id
          );
          if (edgeConnectionIdx > -1) {
            const edgeConnection = get().edges[edgeConnectionIdx];
            const updatedConnection = {
              ...get().edges[edgeConnectionIdx],
              animated: status,
              style: { stroke: status ? "yellow" : "gray" },
            };
            state.edges[edgeConnectionIdx] = updatedConnection;
            const connectedNodeIdx = get().nodes.findIndex(
              (nd) => nd.id === edgeConnection?.target
            );
            if (connectedNodeIdx >= 0 && edgeConnection?.targetHandle) {
              state.nodes[connectedNodeIdx].data[edgeConnection.targetHandle] =
                status;
            }
          }
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
