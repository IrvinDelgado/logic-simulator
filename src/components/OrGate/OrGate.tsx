/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { OrGateIcon } from "../../assets/Icons";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

function OrGate({
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
    if ((data.a || data.b) && !data.out) {
      toggleOut(id, true);
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
        style={{ top: 10, left: -4 }}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: 20, left: -4 }}
        isConnectable={isConnectable}
      />
      <OrGateIcon />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 15, right: -4 }}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default OrGate;
