/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../store/RFStore";
import { useShallow } from "zustand/react/shallow";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

function Switch({
  id,
  isConnectable,
  data,
}: {
  id: string;
  isConnectable: boolean;
  data: any;
}) {
  const { toggleOut } = useStore(useShallow(selector));
  const handleOnClick = () => {
    toggleOut(id, !data.out);
  };
  return (
    <div>
      <button
        onClick={() => handleOnClick()}
        className={`button ${data.out ? "onSwitch" : "offSwitch"}`}
      ></button>
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Switch;
