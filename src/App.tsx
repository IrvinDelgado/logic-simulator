/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
  addEdge,
  Node,
  Connection,
  Edge,
  BackgroundVariant,
  Position,
  NodeChange,
  EdgeChange,
} from "reactflow";

import AndGate from "./components/AndGate/AndGate";

import "reactflow/dist/style.css";

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

const nodeTypes = { AndGate: AndGate };

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const updateANDGate = (andGate: Node, handleId: string) => {
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === andGate.id) {
          nd.data[handleId] = true;
        }
        return nd;
      })
    );
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds: Edge[]) => {
        const nodeSource = nodes.find((nd) => nd.id === connection.source);
        const nodeTarget = nodes.find((nd) => nd.id === connection.target);
        if (
          connection.targetHandle &&
          nodeSource?.type === "input" &&
          nodeTarget?.type === "AndGate"
        ) {
          updateANDGate(nodeTarget, connection.targetHandle);
        }
        return addEdge(connection, eds);
      });
    },
    [setEdges, nodes]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView={true}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
