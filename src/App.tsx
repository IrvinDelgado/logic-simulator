/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import useStore, { RFState } from "./store/RFStore";

import AndGate from "./components/AndGate";
import LightBulb from "./components/LightBulb";
import On from "./components/On";

import "reactflow/dist/style.css";
import { useShallow } from "zustand/react/shallow";

const nodeTypes = { AndGate, LightBulb, On };
const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgesDeleted: state.onEdgesDeleted,
});
export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgesDeleted,
  } = useStore(useShallow(selector));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDeleted}
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
