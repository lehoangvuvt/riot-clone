"use client";

import { styled } from "styled-components";
import BaseContainer from "../BaseContainer";

const Container = styled.div`
  width: 300px;
  height: 1000px;
  position: fixed;
  top: 60px;
  left: 0px;
  background: blue;
  z-index: 99;
`;

const Navigator = () => {
  return (
    <BaseContainer>
      <Container>Footer</Container>
    </BaseContainer>
  );
};

export default Navigator;
