"use client";

import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLang } from "@/redux/slices/appSlice";
import {
  ArrowUpOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

import LinkItem, { LinkItemType } from "./LinkItem";
import SVGContainer from "../SVGContainer";
import BaseContainer from "../BaseContainer";

const Container = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #111;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-flow: row wrap;
`;

const LogoContainer = styled.div`
  height: 80px;
  width: 10%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 2.5px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 102;
`;

const BigMenuBlackBG = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  backdrop-filter: blur(4px) brightness(60%);
`;

const BigMenuContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  flex-flow: column wrap;
  animation: bigMenuAppear 0.2s ease;
  transform-origin: top;
  clip-path: polygon(100% 0, 100% 100%, 35% 100%, 0 100%, 0 0);

  @keyframes bigMenuAppear {
    0% {
      transform: scaleY(0);
      clip-path: polygon(100% 0, 100% 66%, 26% 100%, 0 69%, 0 0);
    }
    25% {
      transform: scaleY(0.5);
      clip-path: polygon(100% 0, 100% 66%, 26% 100%, 0 69%, 0 0);
    }
    50% {
      transform: scaleY(0.75);
      clip-path: polygon(100% 0, 100% 66%, 26% 100%, 0 69%, 0 0);
    }
    75% {
      transform: scaleY(1);
      clip-path: polygon(100% 0, 100% 66%, 26% 100%, 0 69%, 0 0);
    }
    100% {
      transform: scaleY(1);
      clip-path: polygon(100% 0, 100% 77%, 26% 100%, 0 78%, 0 0);
    }
  }
`;

const BigMenuContent = styled.div`
  width: 100%;
  height: 80%;
  color: black;
  top: 20%;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  animation: bigMenuContentAppear 1s ease 0.25s 1 normal forwards;
  @keyframes bigMenuContentAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LinksContainer = styled.div`
  height: 100%;
  width: 80%;
  margin-left: 150px;
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  padding-left: 10px;
`;

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [idleLogoColor, setIdleLogoMenu] = useState("white");
  const [isHoverLogo, setHoverLogo] = useState(false);
  const [isOpenBigMenu, setOpenBigMenu] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });

  const linkItems: LinkItemType[] = !isMobile
    ? [
        {
          title: "Game",
          pathName: "/game",
          dropDownItems: [],
        },
        { title: "Champions", pathName: "/champions", dropDownItems: [] },
        {
          title: "News",
          pathName: "/news",
          dropDownItems: [
            {
              pathName: "/all",
              title: "All",
            },
            {
              pathName: "/community",
              title: "Community",
            },
          ],
        },
        { title: "Patch notes", pathName: "/patch-notes", dropDownItems: [] },
        {
          title: "Discover",
          pathName: "/discover",
          dropDownItems: [
            {
              pathName: "/league-displays",
              title: "League Displays",
            },
            {
              pathName: "/riot-mobile",
              title: "Riot Mobile",
            },
          ],
        },
        {
          title: "Esports",
          pathName: "/esports",
          dropDownItems: [],
          icon: (
            <ArrowUpOutlined
              style={{
                marginLeft: "5px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                transform: "rotate(45deg)",
              }}
            />
          ),
        },
        {
          title: "Universe",
          pathName: "/universe",
          dropDownItems: [],
          icon: (
            <ArrowUpOutlined
              style={{
                marginLeft: "5px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                transform: "rotate(45deg)",
              }}
            />
          ),
        },
        { title: "Support", pathName: "/support", dropDownItems: [] },
      ]
    : [
        {
          title: "Game",
          pathName: "/game",
          dropDownItems: [],
        },
        { title: "Champions", pathName: "/champions", dropDownItems: [] },
        {
          title: "News",
          pathName: "/news",
          dropDownItems: [
            {
              pathName: "/all",
              title: "All",
            },
            {
              pathName: "/community",
              title: "Community",
            },
          ],
        },
        { title: "Patch notes", pathName: "/patch-notes", dropDownItems: [] },
        {
          title: "Discover",
          pathName: "/discover",
          dropDownItems: [
            {
              pathName: "/league-displays",
              title: "League Displays",
            },
            {
              pathName: "/riot-mobile",
              title: "Riot Mobile",
            },
          ],
        },
        { title: "Esports", pathName: "/esports", dropDownItems: [] },
        {
          title: "More",
          pathName: "/universe",
          dropDownItems: [
            { title: "Universe", pathName: "/universe" },
            {
              title: "Support",
              pathName: "/support",
            },
          ],
        },
      ];
  useEffect(() => {
    if (localStorage.getItem("LANG")) {
      dispatch(setLang(localStorage.getItem("LANG")));
    }
  }, []);

  useEffect(() => {
    if (isOpenBigMenu) {
      setIdleLogoMenu("black");
    } else {
      setIdleLogoMenu("white");
    }
  }, [isOpenBigMenu]);

  const handleClickLink = (pathName: string) => {
    router.push("/" + pathName);
  };

  return (
    <BaseContainer>
      <Container>
        <LogoContainer
          onClick={() => {
            setOpenBigMenu(!isOpenBigMenu);
          }}
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        >
          <SVGContainer
            width={"85px"}
            height={"80px"}
            style={{
              marginLeft: "20px",
              cursor: "default",
              pointerEvents: "none",
            }}
            key={isHoverLogo + "_"}
            fillColor={isHoverLogo ? "#DF2029" : idleLogoColor}
          />
          {isOpenBigMenu ? (
            <CaretUpOutlined
              style={{
                color: isHoverLogo ? "#DF2029" : "rgba(0,0,0,0.5)",
                fontSize: "12px",
              }}
            />
          ) : (
            <CaretDownOutlined
              style={{
                color: isHoverLogo ? "#DF2029" : "rgba(255,255,255,0.5)",
                fontSize: "12px",
              }}
            />
          )}
        </LogoContainer>

        <LinksContainer>
          {linkItems.map((item) => (
            <LinkItem data={item} key={item.pathName} />
          ))}
        </LinksContainer>

        {isOpenBigMenu && (
          <BigMenuBlackBG>
            <BigMenuContainer>
              <BigMenuContent></BigMenuContent>
            </BigMenuContainer>
          </BigMenuBlackBG>
        )}
      </Container>
    </BaseContainer>
  );
};

export default Header;
