import {
  AndGateIcon,
  LightBulbIcon,
  NotIcon,
  OnIcon,
  OrGateIcon,
  SevenSegmentDisplayIcon,
  XORGateIcon,
} from "../../assets/Icons";
import { NodeType } from "../../utils/types";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside className={styles.sideBar}>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.AND_GATE)}
        draggable
      >
        <AndGateIcon />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.OR_GATE)}
        draggable
      >
        <OrGateIcon />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.XOR_GATE)}
        draggable
      >
        <XORGateIcon />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.LIGHTBULB)}
        draggable
      >
        <LightBulbIcon />
      </div>
      <div onDragStart={(event) => onDragStart(event, NodeType.NOT)} draggable>
        <NotIcon />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.SWITCH)}
        draggable
      >
        <button className={`button`}></button>
      </div>
      <div onDragStart={(event) => onDragStart(event, NodeType.ON)} draggable>
        <OnIcon />
      </div>
      <div
        onDragStart={(event) =>
          onDragStart(event, NodeType.SEVEN_SEGMENT_DISPLAY)
        }
        draggable
      >
        <SevenSegmentDisplayIcon />
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.JKFlipFlop)}
        draggable
      >
        JK
      </div>
      <div
        onDragStart={(event) => onDragStart(event, NodeType.Clock)}
        draggable
      >
        CLK
      </div>
    </aside>
  );
};

export default SideBar;
