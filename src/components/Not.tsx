/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

function Not({
  id,
  isConnectable,
  data,
}: {
  id: string;
  isConnectable: boolean;
  data: any;
}) {
  const { toggleOut } = useStore(useShallow(selector));
  useEffect(() => {
    if (data.in === data.out) {
      toggleOut(id, !data.in);
    }
  });
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        isConnectable={isConnectable}
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
        <path
          fill="green"
          stroke="white"
          strokeWidth="2"
          d="M79.15691 25H95M29.043478 25h-24"
        />
        <path
          stroke="white"
          d="M28.96875 2.59375v44.8125l2.15625-1.0625 41.03125-20v-2.6875l-41.03125-20-2.15625-1.0625zm3 4.8125L68.09375 25l-36.125 17.59375V7.40625z"
          style={{ marker: "stroke", fill: "white", stroke: "white" }}
        />
        <path
          fill="none"
          stroke="white"
          strokeWidth="3"
          d="M79 25a4 4 0 1 1-8 0 4 4 0 1 1 8 0z"
          style={{ marker: "none" }}
        />
      </svg>
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Not;
