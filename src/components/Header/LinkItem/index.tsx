"use client";

import { ArrowUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $isContainDropDown: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relavite;
  color: white;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  .link-title {
    padding: 7px 15px;
    border-radius: 5px;
  }
  &:hover {
    .link-title {
      background: rgba(255, 255, 255, 0.15);
    }
    &:after {
      display: inline;
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 0;
    width: ${(props) => (props.$isContainDropDown ? "200px" : "100%")};
    height: 4px;
    background: #00aff0;
    border-radius: 5px;
    display: none;
  }
`;

const DropdownItemsContainer = styled.div`
  position: absolute;
  width: 200px;
  background: #292929;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  top: 66px;
  left: 0;
  display: flex;
  flex-flow: column wrap;
  padding: 20px 15px;
  box-sizing: border-box;
  gap: 10px;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  padding: 10px 10px;
  box-sizing: border-box;
  font-size: 12px;
  text-transform: none;
  font-weight: 400;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export type LinkItemType = {
  pathName: string;
  title: string;
  dropDownItems?: LinkItemType[];
  icon?: React.ReactNode;
};

const LinkItem = ({ data }: { data: LinkItemType }) => {
  const router = useRouter();
  const [isHover, setHover] = useState(false);

  const handleClick = () => {
    if (data.dropDownItems && data.dropDownItems.length > 0) return;
    router.push(data.pathName);
  };

  return (
    <Container
      $isContainDropDown={
        data.dropDownItems && data.dropDownItems.length > 0 ? true : false
      }
      onMouseEnter={() => {
        if (data.dropDownItems && data.dropDownItems.length > 0) {
          setHover(true);
        } else {
          return;
        }
      }}
      onMouseLeave={() => {
        if (data.dropDownItems && data.dropDownItems.length > 0) {
          setHover(false);
        } else {
          return;
        }
      }}
      onClick={() => handleClick()}
    >
      <span className="link-title">
        {data.title}
        {data.dropDownItems && data.dropDownItems.length > 0 && (
          <CaretDownOutlined
            style={{
              marginLeft: "5px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
            }}
          />
        )}
        {data.icon}
      </span>
      {isHover && data.dropDownItems && data.dropDownItems.length > 0 && (
        <DropdownItemsContainer>
          {data.dropDownItems.map((dItem) => (
            <DropdownItem
              key={dItem.pathName}
              onClick={() => router.push(dItem.pathName)}
            >
              {dItem.title}
            </DropdownItem>
          ))}
        </DropdownItemsContainer>
      )}
      {/* {data.dropDownItems &&
        data.dropDownItems.length > 0 &&
        data.dropDownItems.map((dItem) => (
          <p key={dItem.pathName}>{dItem.title}</p>
        ))} */}
    </Container>
  );
};

export default LinkItem;
