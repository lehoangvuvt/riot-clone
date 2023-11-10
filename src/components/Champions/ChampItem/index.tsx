import { ChampItem, GetChampDetailsResponse } from "@/types/api.types";
import Image from "next/image";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const Containter = styled.div`
  width: 18.7%;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  clip-path: polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 0 100%);
  &:hover {
    clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 100% 100%, 0 100%);
    div {
      transform: scale(1.1);
    }
  }
`;

const ImageContainer = styled.div`
  height: 325px;
  width: 100%;
  transition: all 0.2s ease;
  position: relative;
`;

const ChampItem = ({
  champDetails,
  onClick,
}: {
  champDetails: ChampItem;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <Containter
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <ImageContainer>
        <Image
          alt="champion-image"
          style={{ objectPosition: "top", objectFit: "cover" }}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champDetails.id}_0.jpg`}
        />
      </ImageContainer>
    </Containter>
  );
};

export default ChampItem;
