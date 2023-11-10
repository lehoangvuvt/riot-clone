"use client";

import styled from "styled-components";
import BaseContainer from "../BaseContainer";

const Container = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 80px;
`;

const ContentHolder = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseContainer>
      <Container>{children}</Container>
    </BaseContainer>
  );
};

export default ContentHolder;
