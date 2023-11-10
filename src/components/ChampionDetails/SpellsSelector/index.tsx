import imageService from "@/services/imageService";
import { ChampSpell } from "@/types/api.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
`;

const SpellsSelectorContainer = styled.div`
  width: 100%;
  height: 120px;
  margin: auto;
  margin-bottom: 40px;
  border-bottom: 2px solid #787878;
  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 65%;
  margin-left: 18%;
  display: flex;
  flex-flow: row wrap;
  position: relative;
`;

const SpellItem = styled.div<{ count: number }>`
  position: relative;
  cursor: pointer;
  width: calc(100% / ${(props) => props.count});
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    transition: all 0.5s ease;
    position: absolute;
    content: "";
    bottom: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    background: #787878;
  }
  div {
    width: 65%;
    height: 60%;
    position: relative;
    transition: all 0.5s ease;
    background: none;
    clip-path: polygon(63% 0, 100% 0, 100% 100%, 0 100%, 0 0);
    img {
      clip-path: polygon(63% 0, 100% 0, 100% 100%, 0 100%, 0 0);
      transform: scale(0.95);
      transition: all 0.5s ease;
    }
  }
  &.selected {
    div {
      background: #937341;
      transform: translateY(-15px);
      clip-path: polygon(63% 0, 100% 24%, 100% 100%, 0 100%, 0 0);
      img {
        clip-path: polygon(63% 0, 100% 24%, 100% 100%, 0 100%, 0 0);
      }
    }
    &:after {
      display: none;
    }
  }
  &:hover {
    div {
      transform: translateY(-3px);
    }
    &.selected {
      div {
        transform: translateY(-15px);
      }
    }
    &:after {
      background: #937341;
    }
  }
`;

const SelectedCircle = styled.div<{ $currentLeft: number }>`
  width: 22px;
  height: 22px;
  background: #937341;
  border-radius: 50%;
  position: relative;
  bottom: 0px;
  left: ${(props) => props.$currentLeft}px;
  transition: all 0.5s ease;
  top: -13px;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #937341;
    transform: scale(0.45);
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: black;
    transform: scale(0.85);
  }
`;

const CircleLine = styled.div`
  width: 1px;
  background: #937341;
  height: 18px;
  position: absolute;
  bottom: 100%;
  left: calc(50% - 0.75px);
  transform: scaleY(1);
  animation: scaleUp 1s;
  transform-origin: bottom;

  @keyframes scaleUp {
    0% {
      transform: scaleY(0);
    }
    25% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const SpellInfo = styled.div`
  min-height: 200px;
  width: 65%;
  margin-left: 24%;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
`;

const SpellType = styled.div`
  width: 100%;
  color: white;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
`;

const SpellName = styled.div`
  width: 100%;
  color: white;
  font-weight: 700;
  font-size: 21px;
  text-transform: uppercase;
`;

const SpellDes = styled.div`
  width: 100%;
  color: white;
  font-size: 15px;
  line-height: 22px;
`;

const SpellsSelector = ({
  spells,
  onSelect,
}: {
  spells: ChampSpell[];
  onSelect: (skillId: string, index: number) => void;
}) => {
  const [selectedIndex, setSectedIndex] = useState(0);
  const [$currentLeft, set$currentLeft] = useState<number>(0);

  useEffect(() => {
    const element = document.getElementById(`spell-item-${selectedIndex}`);
    if (element) {
      set$currentLeft(element.offsetLeft + element.offsetWidth / 2 - 11);
    }
  }, [selectedIndex]);

  const handleSelectSkill = (spellId: string, index: number) => {
    setSectedIndex(index);
    onSelect(spellId, index);
  };

  return (
    <Container>
      <SpellsSelectorContainer>
        <InnerContainer>
          {spells.map((spell, i) => (
            <SpellItem
              count={spells.length}
              key={spell.id}
              id={`spell-item-${i}`}
              onClick={() => handleSelectSkill(spell.id, i)}
              className={selectedIndex === i ? "selected" : ""}
            >
              <div>
                <Image
                  alt="spell-image"
                  fill
                  objectFit="cover"
                  src={
                    i === 0
                      ? imageService.getChampionPassiveURL(spell.image.full)
                      : imageService.getChampionSpellURL(spell.id)
                  }
                />
              </div>
            </SpellItem>
          ))}

          <SelectedCircle $currentLeft={$currentLeft}>
            <CircleLine key={selectedIndex} />
          </SelectedCircle>
        </InnerContainer>
      </SpellsSelectorContainer>
      <SpellInfo>
        <SpellType>
          {selectedIndex == 0
            ? "Passive"
            : spells[selectedIndex].id.substring(
                spells[selectedIndex].id.length - 1,
                spells[selectedIndex].id.length
              )}
        </SpellType>
        <SpellName>{spells[selectedIndex].name}</SpellName>
        <SpellDes> {spells[selectedIndex].description}</SpellDes>
      </SpellInfo>
    </Container>
  );
};

export default SpellsSelector;
