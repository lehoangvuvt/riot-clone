import { ChampItem } from "@/types/api.types";
import Image from "next/image";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const Containter = styled.div`
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
  style,
}: {
  champDetails: ChampItem;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  style?: React.CSSProperties;
}) => {
  return (
    <Containter
      style={style}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <ImageContainer>
        <Image
          alt="champion-image"
          style={{ objectPosition: "top", objectFit: "cover" }}
          fill
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champDetails.id}_0.jpg`}
        />
      </ImageContainer>
    </Containter>
  );
};

export default ChampItem;
