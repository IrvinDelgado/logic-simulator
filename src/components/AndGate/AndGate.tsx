/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import AndGateSVG from "../../assets/Gates/and.svg";

function AndGate({ isConnectable }: { data: any; isConnectable: boolean }) {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 15 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: 35 }}
        isConnectable={isConnectable}
      />
      <img src={AndGateSVG} />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 25 }}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default AndGate;
