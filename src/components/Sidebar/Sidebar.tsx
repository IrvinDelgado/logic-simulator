import {
  AndGateIcon,
  LightBulbIcon,
  NotIcon,
  OnIcon,
  SevenSegmentDisplayIcon,
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
    </aside>
  );
};

export default SideBar;
