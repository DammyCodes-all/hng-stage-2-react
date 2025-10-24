// BgCircle.tsx
import React from "react";

interface BgCircleProps {
  size?: number; // circle diameter in pixels
  color?: string; // e.g. "#2563eb" or "rgba(37,99,235,0.2)"
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  blur?: boolean;
  opacity?: number;
}

const BgCircle: React.FC<BgCircleProps> = ({
  size = 200,
  color = "rgba(37,99,235,0.15)", // soft blue by default
  top,
  left,
  right,
  bottom,
  blur = false,
  opacity = 1,
}) => {
  return (
    <div
      className="absolute rounded-full pointer-events-none -z-20"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        left,
        right,
        bottom,
        opacity,
        filter: blur ? "blur(20px)" : "none",
        zIndex: 0,
      }}
    />
  );
};

export default BgCircle;
