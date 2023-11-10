"use client";

import { Palette } from "@/redux/slices/appSlice";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Container = styled.div<{ $palette: Palette }>`
  background: ${(props) => props.$palette.backgroundColor};
  color: ${(props) => props.$palette.color};
`;

const BaseContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const palette = useSelector((state: RootState) => state.app.theme.palette);
  return (
    <Container style={style} $palette={palette}>
      {children}
    </Container>
  );
};

export default BaseContainer;
