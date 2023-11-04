export enum NodeType {
  AND_GATE = "AndGate",
  ON = "On",
  LIGHTBULB = "LightBulb",
  NOT = "Not",
  SWITCH = "Switch",
  SEVEN_SEGMENT_DISPLAY = "SevenSegmentDisplay",
  OR_GATE = "OrGate",
  XOR_GATE = "XORGate",
  JKFlipFlop = "JKFlipFlop",
}

export const initNodeData = (type: NodeType) => {
  switch (type) {
    case NodeType.AND_GATE:
    case NodeType.OR_GATE:
    case NodeType.XOR_GATE:
      return { a: false, b: false, out: false };
    case NodeType.ON:
      return { out: true };
    case NodeType.LIGHTBULB:
      return { in: false };
    case NodeType.NOT:
      return { in: false, out: true };
    case NodeType.SWITCH:
      return { out: false };
    case NodeType.SEVEN_SEGMENT_DISPLAY:
      return { a: false, b: false, c: false, d: false };
    case NodeType.JKFlipFlop:
      return { j: false, k: false, clk: false, q: false, qNot: false };
  }
};
