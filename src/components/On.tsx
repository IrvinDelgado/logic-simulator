/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import { OnIcon } from "../assets/Icons";

function On({ isConnectable }: { isConnectable: boolean }) {
  return (
    <div>
      <OnIcon />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default On;
