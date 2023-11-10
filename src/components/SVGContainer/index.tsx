"use client";

import { useState } from "react";
import RiotLogo from "/public/assets/svg/riotLogo.svg";

const SVGContainer = ({
  width = 50,
  height = 50,
  fillColor = "black",
  onHoverFillColor = "black",
  style,
}: {
  width?: number;
  height?: number;
  fillColor?: string;
  onHoverFillColor?: string;
  style?: React.CSSProperties;
}) => {
  const [currentFillColor, setCurrentFillColor] = useState(fillColor);

  return (
    <RiotLogo
      style={style}
      onMouseOver={() => setCurrentFillColor(onHoverFillColor)}
      onMouseLeave={() => setCurrentFillColor(fillColor)}
      width={width}
      height={height}
      fill={currentFillColor}
    />
  );
};

export default SVGContainer;
