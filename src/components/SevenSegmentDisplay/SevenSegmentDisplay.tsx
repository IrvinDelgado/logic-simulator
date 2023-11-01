import { Handle, Position } from "reactflow";
import styles from "./SevenSegmentDisplay.module.css";

type SevenSegmentDisplayType = {
  isConnectable: boolean;
  data: {
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  };
};
const SevenSegmentDisplay = ({
  isConnectable,
  data,
}: SevenSegmentDisplayType) => {
  const { a, b, c, d } = data;
  const segmentA = () => {
    return !(
      (!a && !b && !c && d) ||
      (!a && b && !c && !d) ||
      (a && !b && c && d) ||
      (a && b && !c && d)
    );
  };
  const segmentB = () => {
    return !(
      (!a && b && !c && d) ||
      (!a && b && c && !d) ||
      (a && !b && c && d) ||
      (a && b && !c && !d) ||
      (a && b && c && !d) ||
      (a && b && c && d)
    );
  };
  const segmentC = () => {
    return !(
      (!a && !b && c && !d) ||
      (a && b && !c && !d) ||
      (a && b && c && !d) ||
      (a && b && c && d)
    );
  };
  const segmentD = () => {
    return !(
      (!a && !b && !c && d) ||
      (!a && b && !c && !d) ||
      (!a && b && c && d) ||
      (a && !b && !c && d) ||
      (a && !b && c && !d) ||
      (a && b && c && d)
    );
  };
  const segmentE = () => {
    return !(
      (!a && !b && !c && d) ||
      (!a && !b && c && d) ||
      (!a && b && !c && !d) ||
      (!a && b && !c && d) ||
      (!a && b && c && d) ||
      (a && !b && !c && d)
    );
  };
  const segmentF = () => {
    return !(
      (!a && !b && !c && d) ||
      (!a && !b && c && !d) ||
      (!a && !b && c && d) ||
      (!a && b && c && d) ||
      (a && b && !c && d)
    );
  };
  const segmentG = () => {
    return !(
      (!a && !b && !c && !d) ||
      (!a && !b && !c && d) ||
      (!a && b && c && d) ||
      (a && b && !c && !d)
    );
  };

  return (
    <div className={styles.container}>
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
        style={{ top: 100 }}
        id="b"
        isConnectable={isConnectable}
      />
      <svg width="50" height="110" stroke="white">
        <polygon
          fill={segmentA() ? "yellow" : "none"}
          points="10, 10 35, 10 40, 15 35, 20 10, 20 5, 15"
        />
        <polygon
          fill={segmentB() ? "yellow" : "none"}
          points="40, 20 45, 25 45, 50 40, 55 35, 50 35, 25"
        />
        <polygon
          fill={segmentC() ? "yellow" : "none"}
          points="40, 65 45, 70 45, 90 40, 95 35, 90 35, 70"
        />
        <polygon
          fill={segmentD() ? "yellow" : "none"}
          points="10, 95 35, 95 40, 100 35, 105 10, 105 5, 100"
        />
        <polygon
          fill={segmentE() ? "yellow" : "none"}
          points="5, 65 10, 70 10, 90 5, 95 0, 90 0, 70"
        />
        <polygon
          fill={segmentF() ? "yellow" : "none"}
          points="5, 20 10, 25 10, 50 5, 55 0, 50 0, 25"
        />
        <polygon
          fill={segmentG() ? "yellow" : "none"}
          points="10, 55 35, 55 40, 60 35, 65 10, 65 5, 60"
        />
      </svg>
      <Handle
        type="target"
        position={Position.Right}
        style={{ top: 15 }}
        id="c"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        style={{ top: 100 }}
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default SevenSegmentDisplay;
