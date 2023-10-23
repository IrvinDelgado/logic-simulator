/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";
import { LightBulbOffIcon, LightBulbOnIcon } from "../assets/Icons";

function LightBulb({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: boolean;
}) {
  return (
    <div>
      {data.in ? <LightBulbOnIcon /> : <LightBulbOffIcon />}
      <Handle
        type="target"
        position={Position.Bottom}
        id="in"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default LightBulb;
