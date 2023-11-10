"use client";

import Carousel, { SlideImage } from "@/components/ChampionDetails/Carousel";
import SpellsSelector from "@/components/ChampionDetails/SpellsSelector";
import VerticalRotateText from "@/components/VerticalRotateText";
import imageService from "@/services/imageService";
import videoService from "@/services/videoService";
import { ChampDetails } from "@/types/api.types";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;

const SectionContainer = styled.div<{ $bgColor: string; $textColor: string }>`
  width: 100%;
  background: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  display: flex;
  flex-flow: row wrap;
  position: relative;
`;

const SectionLeft = styled.div`
  width: 10%;
`;

const SectionCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const SectionRight = styled.div`
  width: 10%;
`;

const ChampionInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  padding-top: 40px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
`;
const Title = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  display: flex;

  flex-flow: column wrap;
  p {
    font-size: 40px;
    line-height: 0px;
  }
  p:nth-child(1) {
    font-weight: 400;
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    font-weight: 700;
  }
`;

const GeneralInfo = styled.div`
  width: 80%;
  height: 200px;
  border: 0.5px solid rgba(255, 255, 255, 0.4);
  margin: auto;
  top: -10px;
  position: relative;
  z-index: 100;
`;

const Video = styled.video`
  width: 70%;
  animation: videoAppear 0.25s ease;
  position: relative;
  @keyframes videoAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const VideoBorder = styled.div`
  width: 70%;
  height: 400px;
  position: absolute;
  background: none;
  top: -15px;
  left: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const TrailerContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  background: transaprent;
  position: absolute;
  height: 50px;
  width: 50px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayNowBtn = styled.div`
  background: rgb(19, 216, 246);
  color: black;
  font-weight: 700;
  font-size: 12px;
  padding: 20px 45px;
  letter-spacing: 0.5px;
  cursor: pointer;
  filter: brightness(95%);
  position: relative;
  transition: filter 0.25s ease;
  &:hover {
    filter: brightness(110%);
  }
`;

const BackgroundImageCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(10px) brightness(40%);
`;

const ChampDetailsClient = ({
  champDetails,
}: {
  champDetails: ChampDetails;
}) => {
  const [currentSpell, setCurrentSpell] = useState("P1");

  const getId = (key: string) => {
    if (key.length < 3) {
      return `00${key}`;
    } else {
      return `0${key}`;
    }
  };

  const handleSetCurrentSpell = (spellId: string, spellIndex: number) => {
    let currentSpell = "P1";
    switch (spellIndex) {
      case 0:
        currentSpell = "P1";
        break;
      case 1:
        currentSpell = "Q1";
        break;
      case 2:
        currentSpell = "W1";
        break;
      case 3:
        currentSpell = "E1";
        break;
      case 4:
        currentSpell = "R1";
        break;
    }
    setCurrentSpell(currentSpell);
  };

  const skinsToImagesAdapter = (): SlideImage[] => {
    const slideImgs: SlideImage[] = [];
    champDetails.skins.forEach((skin) => {
      const url = imageService.getChampionSkinURL(champDetails.id, skin.id);
      const name = skin.name === "default" ? champDetails.name : skin.name;
      slideImgs.push({ name, url });
    });
    return slideImgs;
  };

  return (
    <Container>
      <SectionContainer id="my-section" $bgColor="black" $textColor="white">
        <BackgroundImageCover>
          <Image
            alt="background-cover-image"
            objectFit="cover"
            fill
            src={imageService.getChampionSkinURL(
              champDetails.id,
              champDetails.skins[0].id
            )}
          />
        </BackgroundImageCover>
        <SectionLeft>
          <VerticalRotateText
            style={{
              transform: "rotate(-180deg)",
              fontSize: "12px",
              width: "30%",
              fontStyle: "italic",
              fontWeight: "700",
            }}
            direction="vertical-lr"
          >
            OVERVIEW ___
          </VerticalRotateText>
        </SectionLeft>
        <SectionCenter>
          <ChampionInfoContainer>
            <ImageContainer>
              <Image
                alt="champion-splash-img"
                fill
                objectFit="cover"
                src={imageService.getChampionSkinURL(
                  champDetails.id,
                  champDetails.skins[0].id
                )}
              />
              <Title style={{ color: "white" }}>
                <p>{champDetails.title}</p>
                <p>{champDetails.name}</p>
              </Title>
            </ImageContainer>
            {/* <GeneralInfo></GeneralInfo> */}
          </ChampionInfoContainer>
        </SectionCenter>
        <SectionRight />
      </SectionContainer>

      <SectionContainer $bgColor="black" $textColor="white">
        <SectionCenter
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            background: "black",
            paddingTop: "100px",
          }}
        >
          <div style={{ width: "50%" }}>
            <SpellsSelector
              spells={[
                { ...champDetails.passive, id: `${champDetails.id}P` },
                ...champDetails.spells,
              ]}
              onSelect={(spellId, index) =>
                handleSetCurrentSpell(spellId, index)
              }
            />
          </div>
          <div
            style={{
              width: "50%",
              minHeight: "500px",
              position: "relative",
            }}
          >
            <Video
              autoPlay
              key={currentSpell}
              loop
              muted
              src={videoService.getSpellVideoUrl(
                getId(champDetails.key),
                currentSpell
              )}
            />
            <VideoBorder />
          </div>
        </SectionCenter>
      </SectionContainer>

      <SectionContainer $bgColor="white" $textColor="black">
        <SectionLeft>
          <VerticalRotateText
            style={{
              transform: "rotate(-180deg)",
              fontSize: "12px",
              width: "30%",
              fontStyle: "italic",
              fontWeight: "700",
            }}
            direction="vertical-lr"
          >
            ALVAILABLE SKINS ___
          </VerticalRotateText>
        </SectionLeft>
        <SectionCenter>
          <Carousel
            style={{ height: "800px" }}
            hasTitle
            title="AVAILABLE SKINS"
            autoPlay={true}
            delayTime={5000}
            images={skinsToImagesAdapter()}
          />
        </SectionCenter>
        <SectionRight />
      </SectionContainer>

      <SectionContainer
        $bgColor="white"
        $textColor="black"
        style={{ marginTop: "10px" }}
      >
        <SectionCenter>
          <TrailerContainer>
            <Video
              style={{ width: "100%" }}
              autoPlay
              key={currentSpell}
              loop
              muted
              src={
                "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbb792e3456cb02b7/5f4959269586f1653fc65a1b/ss2020_urgot_vi_cait_1920x1080.mp4"
              }
            />
            <ButtonContainer>
              <PlayNowBtn>PLAY FOR FREE</PlayNowBtn>
            </ButtonContainer>
          </TrailerContainer>
        </SectionCenter>
      </SectionContainer>
    </Container>
  );
};

export default ChampDetailsClient;
