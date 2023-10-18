import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Connection,
  Edge,
  BackgroundVariant,
  Position,
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
    id: "node-1",
    type: "andGate",
    position: { x: 250, y: 0 },
    data: { value: 123 },
  },
  {
    id: "3",
    targetPosition: Position.Left,
    type: "output",
    data: { label: "Output Node" },
    position: { x: 450, y: 0 },
  },
];

// const initialEdges:Edge[] = [
//   { id: "e1-2", source: "1", target: "2", animated: false },
//   { id: "e2-3", source: "2", target: "3", animated: true },
// ];

const nodeTypes = { andGate: AndGate };

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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
