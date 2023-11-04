import { useEffect } from "react";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { Handle, Position } from "reactflow";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

const SECOND = 1000;

type ClockData = {
  out: boolean;
};
type ClockType = {
  id: string;
  isConnectable: boolean;
  data: ClockData;
};
function Clock({ id, isConnectable, data }: ClockType) {
  const { toggleOut } = useStore(useShallow(selector));

  useEffect(() => {
    const timer = setInterval(() => {
      toggleOut(id, !data.out);
    }, SECOND);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <div
        style={{ height: 50, width: 50, color: data.out ? "yellow" : "gray" }}
      >
        CLK
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Clock;
