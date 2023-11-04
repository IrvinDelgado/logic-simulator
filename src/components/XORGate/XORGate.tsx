/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { XORGateIcon } from "../../assets/Icons";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

function XORGate({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: { a: boolean; b: boolean; out: boolean };
  isConnectable: boolean;
}) {
  const { toggleOut } = useStore(useShallow(selector));
  useEffect(() => {
    if (!(data.a && data.b) && (data.a || data.b) && !data.out) {
      toggleOut(id, true);
    }
    if (data.a && data.b && data.out) {
      toggleOut(id, false);
    }
    if (!data.a && !data.b && data.out) {
      toggleOut(id, false);
    }
  });
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 11, left: -2 }}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: 20, left: -2 }}
        isConnectable={isConnectable}
      />
      <XORGateIcon />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 15, right: -2 }}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default XORGate;
