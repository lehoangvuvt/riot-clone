import styled from "styled-components";

const Container = styled.div<{ direction: string }>`
  writing-mode: ${(props) => props.direction};
  text-align: center;
  width: 100%;
  height: 100%;
`;

const VerticalRotateText = ({
  children,
  direction,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction: "vertical-rl" | "vertical-lr" | "horizontal-tb";
}) => {
  return (
    <Container direction={direction} style={style}>
      {children}
    </Container>
  );
};

export default VerticalRotateText;
