"use client";

import {
  UniverseExploreDataType,
  UniverseIndexDataType,
} from "@/types/api.types";
import BaseContainer from "@/components/BaseContainer";
import { SlideImage } from "@/components/ChampionDetails/Carousel";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { allImages } from "@/utils/images.utils";

const Container = styled.div`
  width: 100%;
  background: black;
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-flow: column wrap;
`;

const UniverseClient = ({
  indexData,
  exploreData,
}: {
  indexData: UniverseIndexDataType;
  exploreData: UniverseExploreDataType;
}) => {
  const [slideData, setSlideData] = useState<SlideImage[]>([]);
  useEffect(() => {
    const slideData: SlideImage[] = [];
    if (
      exploreData &&
      exploreData["hero-modules"] &&
      exploreData["hero-modules"].length > 0
    ) {
      exploreData["hero-modules"].forEach((heroModule) => {
        slideData.push({
          url: heroModule.background.uri,
          subtitle: heroModule.subtitle,
          description: heroModule.description ?? "",
          title: heroModule.title,
          type: heroModule.type,
        });
      });
      setSlideData(slideData);
    }
  }, []);

  return (
    <BaseContainer>
      <Container>
        {slideData && slideData.length > 0 && (
          <InfiniteCarousel height="650px" data={slideData} />
        )}
        <div
          style={{
            width: "100%",
            height: "800px",
            marginTop: "-80px",
            zIndex: 0,
            position: "relative",
            backgroundImage:
              'url("https://universe.leagueoflegends.com/images/latestBg_Wallpaper.png")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "brightness(20%)",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "100%",
            height: "800px",
            marginTop: "-80px",
            zIndex: 0,
            position: "relative",
            backgroundImage:
              'url("https://universe.leagueoflegends.com/images/trendingBackground_Wallpaper.png")',
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "brightness(20%)",
            }}
          >
            <Image
              alt="fire-shield"
              src={allImages.fireShield}
              width={50}
              height={50}
            />
          </div>
        </div>
      </Container>
    </BaseContainer>
  );
};

export default UniverseClient;
