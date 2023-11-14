"use client";

import { useState } from "react";
import RiotLogo from "/public/assets/svg/riotLogo.svg";

const SVGContainer = ({
  width = "50px",
  height = "50px",
  fillColor = "black",
  onHoverFillColor = "black",
  style,
}: {
  width?: string;
  height?: string;
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
