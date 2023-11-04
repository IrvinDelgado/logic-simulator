import { Handle, Position } from "reactflow";
import useStore, { RFState } from "../../store/RFStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

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
    if (data.j && data.k && data.clk && !data.hasSet) {
      toggleOut(id, true, {
        q: data.qNot,
        qNot: data.q,
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
        style={{ top: 35 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="clk"
        style={{ top: 25 }}
        isConnectable={isConnectable}
      />
      <div style={{ height: 100, width: 100 }}>JKFlipFlop</div>
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
        style={{ top: 25 }}
        id="qNot"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default JKFlipFlop;
