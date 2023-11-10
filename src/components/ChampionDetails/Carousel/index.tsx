"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  width: 100%;
  height: 800px;
  margin: 60px auto;
  position: relative;
  overflow: hidden;
`;

const ImageCover = styled.div<{ $imgSrc: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("${(props) => props.$imgSrc}");
  background-size: cover;
  background-position: center;
  animation: ImageCoverAppear 0.5s ease;
  @keyframes ImageCoverAppear {
    from {
      filter: blur(5px);
    }
    to {
      filter: blur(0px);
    }
  }
`;

const BlackCover = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 35%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;
  flex-flow: row wrap;
  display: flex;
  flex-flow: column wrap;
  padding: 0px 30px;
  box-sizing: border-box;
  gap: 20px;
  backdrop-filter: blur(5px);
`;

const BlackCoverTitle = styled.div`
  height: 17%;
  width: 100%;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: flex-end;
  font-size: 35px;
  padding-bottom: 20px;
  padding-left: 15%;
  box-sizing: border-box;
  font-style: italic;
  line-height: 34px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

const ImagesSlider = styled.div`
  left: 0;
  width: 100%;
  height: 78%;
  z-index: 99;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  gap: 40px;
  box-sizing: border-box;
  scroll-snap-type: y mandatory;
`;

const ImageItem = styled.div`
  width: 80%;
  margin-left: 20%;
  height: 100px;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
  opacity: 0.6;
  transition: all 0.2s ease;
  scroll-snap-align: start;
  &.selected {
    opacity: 1;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }
  &:hover {
    opacity: 1;
    div:nth-child(1) {
      transform: scale(1.1);
      &.selected {
        transform: scale(1.6);
      }
    }
  }
`;

const DivImage = styled.div<{ $imgSrc: string }>`
  width: 25%;
  height: 70%;
  background-image: url("${(props) => props.$imgSrc}");
  background-size: cover;
  background-position: center;
  transition: all 0.4s ease;
  &.selected {
    transform: scale(1.6);
    margin-top: 15px;
  }
`;

const ImageName = styled.div`
  width: 75%;
  height: 100%;
  color: white;
  padding-left: 40px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  font-size: 13px;
  align-items: center;
  padding-bottom: 10px;
  text-transform: uppercase;
`;

export type SlideImage = {
  url: string;
  name?: string;
  description?: string;
  subtitle?: string;
  title?:string;
  type?: string;
};

const Carousel = ({
  images,
  autoPlay = true,
  delayTime = 5000,
  title,
  hasTitle = false,
  style,
}: {
  images: SlideImage[];
  autoPlay?: boolean;
  delayTime?: number;
  title?: string;
  hasTitle?: boolean;
  style?: React.CSSProperties;
}) => {
  const autoScrollInterval = useRef<any>(null);
  const [isAutoPlay, setAutoPlay] = useState(autoPlay);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(images[0].url);
  const heightPerItem = 140;

  const scroll = (heightValToScroll: number) => {
    const scrollSlideElem = document.getElementById("Images-slider");
    if (scrollSlideElem) {
      scrollSlideElem.scrollTo({
        top: heightValToScroll,
        behavior: "smooth",
      });
    }
  };

  const setScrollData = (step: number) => {
    const heightValToScroll = step * heightPerItem;
    scroll(heightValToScroll);
  };

  useEffect(() => {
    if (currentIndex < images.length) {
      setScrollData(currentIndex);
      setCurrentImageUrl(images[currentIndex].url);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isAutoPlay) {
      autoScrollInterval.current = setInterval(() => {
        setCurrentIndex((oldVal) => oldVal + 1);
      }, delayTime);
    } else {
      if (autoScrollInterval && autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    }

    return () => {
      if (autoScrollInterval && autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [isAutoPlay, delayTime]);

  return (
    <CarouselContainer style={style}>
      <ImageCover key={currentImageUrl} $imgSrc={currentImageUrl} />
      {/* <BlurryImg key={currentImageUrl} $imgSrc={currentImageUrl} /> */}
      <BlackCover>
        {hasTitle && <BlackCoverTitle>{title}</BlackCoverTitle>}
        <ImagesSlider id="Images-slider">
          <ImageItem style={{ height: "40px" }} />
          {images.map((image, i) => (
            <ImageItem
              className={image.url === currentImageUrl ? "selected" : ""}
              onClick={() => {
                setAutoPlay(false);
                setCurrentIndex(i);
              }}
              key={image.url}
            >
              <DivImage
                className={currentImageUrl === image.url ? "selected" : ""}
                $imgSrc={image.url}
              />
              <ImageName>{image.name}</ImageName>
            </ImageItem>
          ))}
          <div style={{ width: "100%", height: heightPerItem * 4 + "px" }} />
        </ImagesSlider>
      </BlackCover>
    </CarouselContainer>
  );
};

export default Carousel;
