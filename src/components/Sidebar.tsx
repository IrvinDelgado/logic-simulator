import { AndGateIcon, LightBulbIcon, NotIcon, OnIcon } from "../assets/Icons";

const SideBar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
      <div onDragStart={(event) => onDragStart(event, "AndGate")} draggable>
        <AndGateIcon />
      </div>
      <div onDragStart={(event) => onDragStart(event, "LightBulb")} draggable>
        <LightBulbIcon />
      </div>
      <div onDragStart={(event) => onDragStart(event, "Not")} draggable>
        <NotIcon />
      </div>
      <div onDragStart={(event) => onDragStart(event, "Switch")} draggable>
        <button className={`button`}></button>
      </div>
      <div onDragStart={(event) => onDragStart(event, "On")} draggable>
        <OnIcon />
      </div>
    </aside>
  );
};

export default SideBar;
