/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { NotIcon } from "../../assets/Icons";

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
        style={{ top: 15, left: -7 }}
        id="in"
        isConnectable={isConnectable}
      />
      <NotIcon />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 15, right: -7 }}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Not;
