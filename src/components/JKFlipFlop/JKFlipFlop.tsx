import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { JKIcon } from "../../assets/Icons";

const selector = (state: RFState) => ({
  toggleOut: state.toggleOut,
});

type JKFlipFlopData = {
  j: boolean;
  k: boolean;
  clk: boolean;
  q: boolean;
  qNot: boolean;
  hasSet: boolean;
};
type JKFlipFlopType = {
  id: string;
  data: JKFlipFlopData;
  isConnectable: boolean;
};
function JKFlipFlop({ id, data, isConnectable }: JKFlipFlopType) {
  const { toggleOut } = useStore(useShallow(selector));

  useEffect(() => {
    if (!data.j && data.k && data.clk && !data.qNot) {
      toggleOut(id, true, {
        q: false,
        qNot: true,
      });
    }
    if (data.j && !data.k && data.clk && !data.q) {
      toggleOut(id, true, {
        q: true,
        qNot: false,
      });
    }
    if (data.j && data.k && data.clk && !data.hasSet && (data.q || data.qNot)) {
      toggleOut(id, true, {
        q: data.qNot,
        qNot: data.q,
        hasSet: true,
      });
    }
    if (data.j && data.k && data.clk && !data.hasSet && !data.q && !data.qNot) {
      toggleOut(id, true, {
        q: true,
        qNot: false,
        hasSet: true,
      });
    }
    if (data.j && data.k && !data.clk && data.hasSet) {
      toggleOut(id, true, {
        q: data.q,
        qNot: data.qNot,
        hasSet: false,
      });
    }
  });
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 15 }}
        id="j"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="k"
        style={{ top: 61 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="clk"
        style={{ top: 38 }}
        isConnectable={isConnectable}
      />
      <JKIcon />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 15 }}
        id="q"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 61 }}
        id="qNot"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default JKFlipFlop;
