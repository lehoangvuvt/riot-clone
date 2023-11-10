"use client";

import styled from "styled-components";
import { SlideImage } from "../ChampionDetails/Carousel";
import { useEffect, useState } from "react";
import LeftArrow from "/public/assets/svg/leftArrow.svg";
import RightArrow from "/public/assets/svg/rightArrow.svg";
import Image from "next/image";
import { allImages } from "@/utils/images.utils";

const Container = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
  gap: 10px;
  scroll-snap-type: x mandatory;
  position: relative;
`;

const CarouselItem = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  color: white;
  text-align: center;
  scroll-snap-align: center;
  transform: scaleX(1) scaleY(0.9);
  transform-origin: bottom;
  filter: brightness(25%) grayscale(100%);
  position: relative;

  &.selected {
    transform: scaleX(1) scaleY(0.9);
    filter: brightness(25%) grayscale(100%);
    animation: selectedItemScale 0.25s ease 0.00001s forwards;
    z-index: 1;
    @keyframes selectedItemScale {
      from {
        transform: scaleX(0.95) scaleY(0.9);
        filter: brightness(25%) grayscale(100%);
      }
      to {
        transform: scaleX(1.35) scaleY(1);
        filter: brightness(105%) grayscale(0%);
      }
    }
  }
`;

const CarouseImage = styled.div<{ $bgImg: string }>`
  width: 100%;
  height: 55%;
  background-image: url("${(props) => props.$bgImg}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transform: scale(1) translateY(0px);
  margin-top: 0px;
  &.selected {
    height: 56.5%;
    transform: scale(1) translateY(0px);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
    animation: carouseImagecale 0.3s ease 0.01s forwards;
    @keyframes carouseImagecale {
      from {
        margin-top: 0px;
        transform: scale(1) translateY(0px);
      }
      to {
        margin-top: 12px;
        transform: scale(1.1) translateY(-15px);
      }
    }
  }
`;

const CarouselInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 40%;
  background: #705832;
  margin-left: 0%;
  bottom: 6.5%;

  clip-path: polygon(
    0 0,
    100% 0,
    100% 30%,
    100% 70%,
    100% 100%,
    0 100%,
    0% 70%,
    0% 30%
  );

  &.selected {
    bottom: 9%;
    clip-path: polygon(
      51% 0,
      51% 0,
      100% 17%,
      100% 75%,
      51% 100%,
      50% 100%,
      0 77%,
      0 16%
    );
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -2%;
    width: 104%;
    height: 99%;
    background: #111;

    clip-path: polygon(
      0 0,
      100% 0,
      100% 30%,
      100% 70%,
      100% 100%,
      0 100%,
      0% 70%,
      0% 30%
    );
  }

  &.selected {
    width: 76%;
    margin-left: 12%;
    &:after {
      height: 98%;
      clip-path: polygon(
        51% 0,
        51% 0,
        100% 17%,
        100% 75%,
        51% 100%,
        50% 100%,
        0 77%,
        0 16%
      );
    }
  }
`;

const CarouselController = styled.div`
  width: 134%;
  height: 100%;
  margin-left: -17%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  left: 0;
  top: 0;
  z-index: 20;
  display: flex;
  flex-flow: row wrap;
`;

const Button = styled.div`
  margin-bottom: 14.5%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  background: #111;
  color: white;
  border: 3px solid #937341;
  box-sizing: border-box;
  color: #937341;
  display: flex;
  align-items: center;
  filter: brightness(130%);
  justify-content: center;

  svg {
    transform: scale(1.5);
  }

  &:after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: transprent;
    border-radius: 50%;
    border: 1.5px solid #937341;
    z-index: -1;
    box-sizing: border-box;
    transform: scale(1.55);
    transition: all 0.2s ease;
  }

  &:hover {
    &:after {
      transform: scale(1.65);
      animation: buttonHoverAnim 0.25s linear infinite alternate;

      @keyframes buttonHoverAnim {
        from {
          transform: scale(1.55);
        }
        to {
          transform: scale(1.65);
        }
      }
    }
  }
`;

const CarouselContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  color: white;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  margin-left: 1%;

  img {
    margin-bottom: 20px;
  }

  span:nth-child(2) {
    color: #c4b998;
    text-transform: uppercase;
  }

  span:nth-child(3) {
    color: #937341;
    font-weight: 200;
    font-size: 26px;
    max-width: 20ch;
    text-transform: uppercase;
    line-height: 1.1;
    margin-top: 8px;
  }

  span:nth-child(4) {
    color: #c4b998;
    font-size: 11px;
    line-height: 1.4;
    font-weight: 300;
    max-width: 40ch;
    margin-top: 5px;
  }
`;

const InfiniteCarousel = ({
  data,
  width = "100%",
  height = "400px",
  style,
}: {
  data: SlideImage[];
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}) => {
  const [slideData, setSlideData] = useState<Array<SlideImage>>([]);
  const [lastIndex, setLastIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setSlideData([...data, ...data, ...data, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (slideData && slideData.length > 0) {
      setCurrentIndex(Math.ceil(slideData.length / 2) - 1);
      setLastIndex(Math.ceil(slideData.length / 2) - 1);
    }
  }, [slideData]);

  useEffect(() => {
    if (currentIndex !== -1) {
      setScrolling(true);
      if (
        currentIndex > Math.ceil(data.length / 2) + 1 &&
        currentIndex < slideData.length - 1
      ) {
        const sliderElem = document.getElementById("infinite-carousel-slider");
        if (sliderElem) {
          const widthPerItem = (sliderElem.clientWidth / 100) * 45 + 20;
          if (currentIndex !== Math.ceil(slideData.length / 2) - 1) {
            sliderElem.scrollTo({
              left: (currentIndex - 2) * widthPerItem,
              behavior: "smooth",
            });
          } else {
            if (Math.abs(lastIndex - currentIndex) == 1) {
              sliderElem.scrollTo({
                left: (currentIndex - 2) * widthPerItem,
                behavior: "smooth",
              });
            } else {
              sliderElem.scrollTo({
                left: (currentIndex - 2) * widthPerItem,
              });
            }
          }
        }
      } else {
        setCurrentIndex(Math.ceil(slideData.length / 2) - 1);
      }
    }
  }, [currentIndex]);

  const handleScrollEnd = () => {
    setScrolling(false);
  };

  useEffect(() => {
    const sliderElem = document.getElementById("infinite-carousel-slider");
    if (sliderElem) {
      sliderElem.addEventListener("scrollend", handleScrollEnd);

      return () => {
        sliderElem.removeEventListener("scrollend", handleScrollEnd);
      };
    }
  }, []);

  return (
    <Container width={width} height={height} style={style}>
      <CarouselContainer id="infinite-carousel-slider">
        {slideData.map((item, i) => (
          <CarouselItem
            className={i + 1 === currentIndex && !isScrolling ? "selected" : ""}
            key={item.url + "_" + i}
          >
            <CarouseImage
              className={
                i + 1 === currentIndex && !isScrolling ? "selected" : ""
              }
              $bgImg={item.url}
            />
            <CarouselInfo
              className={
                i + 1 === currentIndex && !isScrolling ? "selected" : ""
              }
            >
              <CarouselContent>
                {item.type === "story-preview" ? (
                  <Image
                    src={allImages.book}
                    width={20}
                    height={20}
                    alt="type-img"
                  />
                ) : (
                  <Image
                    src={allImages.helmet}
                    width={15}
                    height={30}
                    alt="type-img"
                  />
                )}
                <span
                  dangerouslySetInnerHTML={{ __html: item.subtitle ?? "" }}
                />
                <span dangerouslySetInnerHTML={{ __html: item.title ?? "" }} />
                <span
                  dangerouslySetInnerHTML={{ __html: item.description ?? "" }}
                />
              </CarouselContent>
            </CarouselInfo>
          </CarouselItem>
        ))}
      </CarouselContainer>
      <CarouselController>
        <Button
          onClick={() => {
            setLastIndex(currentIndex);
            setCurrentIndex(currentIndex - 1);
          }}
        >
          <LeftArrow />
        </Button>
        <Button
          onClick={() => {
            setLastIndex(currentIndex);
            setCurrentIndex(currentIndex + 1);
          }}
        >
          <RightArrow />
        </Button>
      </CarouselController>
    </Container>
  );
};

export default InfiniteCarousel;
