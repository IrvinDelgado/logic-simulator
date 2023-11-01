/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowInstance,
} from "reactflow";
import useStore, { RFState } from "./store/RFStore";

import AndGate from "./components/AndGate/AndGate";
import LightBulb from "./components/LightBulb/LightBulb";
import On from "./components/On/On";
import Switch from "./components/Switch/Switch";
import Not from "./components/Not/Not";
import SevenSegmentDisplay from "./components/SevenSegmentDisplay/SevenSegmentDisplay";

import "reactflow/dist/style.css";
import { useShallow } from "zustand/react/shallow";
import SideBar from "./components/Sidebar/Sidebar";
import { useCallback, useRef, useState } from "react";
import { NodeType, initNodeData } from "./utils/types";

const nodeTypes = { AndGate, LightBulb, On, Switch, Not, SevenSegmentDisplay };
const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgesDeleted: state.onEdgesDeleted,
  addNode: state.addNode,
});

let id = 0;
const getId = () => `node_${id++}`;

export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgesDeleted,
    addNode,
  } = useStore(useShallow(selector));
  const reactFlowWrapperRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;
      const reactFlowBounds =
        reactFlowWrapperRef.current?.getBoundingClientRect();

      if (!nodeType || !reactFlowBounds || !reactFlowInstance) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: initNodeData(nodeType),
      };
      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="logicFlow">
      <SideBar />
      <div className="reactFlowWrapper" ref={reactFlowWrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={setReactFlowInstance}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgesDelete={onEdgesDeleted}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView={true}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
