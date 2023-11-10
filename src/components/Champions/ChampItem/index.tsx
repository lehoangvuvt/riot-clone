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

const ImageContainer = styled.div<{ image: string }>`
  height: 325px;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  transition: all 0.2s ease;
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
      <ImageContainer
        image={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champDetails.id}_0.jpg`}
      />
    </Containter>
  );
};

export default ChampItem;
