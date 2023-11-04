import { useEffect } from "react";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { Handle, Position } from "reactflow";
import { ClockIcon } from "../../assets/Icons";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

const SECOND = 500;

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
      <ClockIcon textColor={data.out ? "yellow" : "gray"} />
      <Handle
        type="source"
        style={{ top: 16 }}
        position={Position.Right}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Clock;
