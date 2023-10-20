/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";

function AndGate({ isConnectable }: { data: any; isConnectable: boolean }) {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 15 }}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: 35 }}
        isConnectable={isConnectable}
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
        <path
          fill="none"
          stroke="white"
          strokeWidth="2"
          d="M70 25h25M31 15H5M32 35H5"
        />
        <path
          fill="white"
          stroke="white"
          strokeWidth="2"
          d="M30 5V45H50.47619c11.267908 0 20-9.000045 20-20s-8.732091-20-20-20H30zm2.857143 2.857143H50.47619c9.760663 0 16.666667 7.639955 16.666667 17.142857 0 9.502902-7.382195 17.142857-17.142857 17.142857H32.857143V7.857143z"
        />
      </svg>
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 25 }}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default AndGate;
