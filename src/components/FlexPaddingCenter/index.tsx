"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $gap: number; $paddingLeftPixel: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: ${(props) => props.$gap}px;
  box-sizing: border-box;
  padding-left: ${(props) => props.$paddingLeftPixel}px;
`;

const FlexPaddingCenter = ({
  children,
  style,
  gap = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  gap?: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paddingLeftPixel, setPaddingLeftPixel] = useState(0);

  useEffect(() => {
    let prevWidth = 0;
    if (containerRef && containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.borderBoxSize?.[0].inlineSize;
          if (typeof width === "number" && width !== prevWidth) {
            prevWidth = width;
            if (containerRef && containerRef.current) {
              if (containerRef.current.firstElementChild) {
                const childWidthPlusGap =
                  containerRef.current.firstElementChild.clientWidth + gap;
                const containerWidth = containerRef.current.clientWidth;
                const percentageChildToContainerWidth =
                  (childWidthPlusGap / containerWidth) * 100;
                const totalChildElemPerRow = Math.floor(
                  100 / percentageChildToContainerWidth
                );
                const totalChildWithPerRowWithGap =
                  totalChildElemPerRow * childWidthPlusGap - gap;
                const widthForTotalPadding =
                  containerWidth - totalChildWithPerRowWithGap;
                const paddingLeftPixel = widthForTotalPadding / 2;
                if (
                  totalChildWithPerRowWithGap + widthForTotalPadding <=
                  containerWidth
                ) {
                  setPaddingLeftPixel(paddingLeftPixel);
                }
              }
            }
          }
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [children]);

  return (
    <Container
      ref={containerRef}
      id="container"
      $gap={gap}
      $paddingLeftPixel={paddingLeftPixel}
      style={style}
    >
      {children}
    </Container>
  );
};

export default FlexPaddingCenter;
