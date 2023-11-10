import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
`;

const Item = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
  &:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2.5px;
    background: #937341;
    bottom: 0;
    transition: all 0.2s ease;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.8);
    &:after {
      width: 25%;
    }
  }
  &.selected {
    color: rgba(0, 0, 0, 1);
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2.5px;
      background: #937341;
      bottom: 0;
    }
  }
`;

export type TabItem = {
  title: string;
  key: string;
};

const Tabs = ({
  data,
  selectedValue,
  style,
  onClicKTabItem,
}: {
  data: Array<TabItem>;
  selectedValue: TabItem;
  style?: React.CSSProperties;
  onClicKTabItem: (tabItem: TabItem) => void;
}) => {
  return (
    <Container style={style}>
      {data.map((tabItem) => (
        <Item
          onClick={() => onClicKTabItem(tabItem)}
          className={selectedValue.key === tabItem.key ? "selected" : ""}
          key={tabItem.key}
        >
          {tabItem.title}
        </Item>
      ))}
    </Container>
  );
};

export default Tabs;
