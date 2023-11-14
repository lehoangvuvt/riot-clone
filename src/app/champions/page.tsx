"use client";

import BaseContainer from "@/components/BaseContainer";

import { useRouter } from "next/navigation";
import ChampItem from "@/components/Champions/ChampItem";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Tabs, { TabItem } from "@/components/Tabs";
import useAllChamps from "@/react-query/useAllChamps";
import FlexPaddingCenter from "@/components/FlexPaddingCenter";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const Header = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  height: 50px;
  flex-flow: row wrap;
  margin-bottom: 40px;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0px;
`;

const Left = styled.div<{ $isFocus: boolean }>`
  width: 14%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    background: rgba(0, 0, 0, 0.25);
    right: 0;
    transition: all 0.2s ease;
    height: ${(props) => (props.$isFocus ? 100 : 60)}%;
    top: ${(props) => (props.$isFocus ? 0 : 20)}%;
  }
`;

const Right = styled.div`
  width: 14%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    background: rgba(0, 0, 0, 0.25);
    left: 0;
    height: 60%;
    top: 20%;
  }
`;

const Center = styled.div`
  width: 72%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const SmallTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 60px;
  font-size: 20px;
`;

const BigTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 80px;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 80px;
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  max-width: 50ch;
  text-align: center;
  font-weight: 400;
  padding-top: 15px;
  color: rgba(0, 0, 0, 0.9);
  line-height: 22px;
  margin-bottom: 50px;
`;

const championTags = [
  {
    value: "All",
    title: "All",
  },
  {
    value: "Assassin",
    title: "Assassins",
  },
  {
    value: "Fighter",
    title: "Fighters",
  },
  {
    value: "Tank",
    title: "Tanks",
  },
  {
    value: "Marksman",
    title: "Marksmen",
  },
  {
    value: "Support",
    title: "Supports",
  },
  {
    value: "Mage",
    title: "Mages",
  },
];

const Champions = () => {
  const { data: champs } = useAllChamps();
  const [searchStr, setSearchStr] = useState("");
  const [filteredChamps, setFilteredChamps] = useState<Array<any>>([]);
  const [$isFocus, setFocus] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TabItem>({
    key: championTags[0].value,
    title: championTags[0].title,
  });
  const router = useRouter();

  const handleSubmit = (value: string) => {
    if (champs && champs.length > 0) {
      if (value && value.length > 0) {
        setSearchStr(value);
      } else {
        setSearchStr("");
      }
    }
  };

  useEffect(() => {
    if (champs && champs.length > 0) {
      setFilteredChamps(champs);
    }
  }, [champs]);

  useEffect(() => {
    let filteredChamps = [];
    if (champs && champs.length > 0) {
      if (searchStr && searchStr.length > 0) {
        filteredChamps = champs.filter((champ) => champ.id === searchStr);
      } else {
        filteredChamps = champs;
      }
      if (selectedTag.key !== championTags[0].value) {
        filteredChamps = filteredChamps.filter((champ) =>
          champ.tags.includes(selectedTag.key)
        );
      }
      setFilteredChamps(filteredChamps);
    }
  }, [searchStr, selectedTag, champs]);

  return (
    <BaseContainer>
      <Container>
        <SmallTitle>Choose your</SmallTitle>
        <BigTitle>Champion</BigTitle>
        <Description>
          With more than 140 champions, you’ll find the perfect match for your
          playstyle. Master one, or master them all.
        </Description>
        <Header>
          {champs && champs.length > 0 && (
            <Left $isFocus={$isFocus}>
              <SearchBar
                style={{ width: "95%", height: "95%" }}
                dropdownStyle={{ width: "105%" }}
                dropdownMarginTop={45}
                inputStyle={{ border: "none", paddingLeft: "10px" }}
                noResultText="NO CHAMPIONS FOUND"
                data={champs.map((champ) => champ.id)}
                withDropdown
                onSubmit={(value) => handleSubmit(value)}
                onFocus={($isFocus) => setFocus($isFocus)}
              />
            </Left>
          )}

          <Center>
            <Tabs
              style={{ width: "70%" }}
              onClicKTabItem={(tabItem) => setSelectedTag(tabItem)}
              selectedValue={selectedTag}
              data={championTags.map((ctag) => {
                return {
                  title: ctag.title,
                  key: ctag.value,
                };
              })}
            />
          </Center>

          <Right></Right>
        </Header>
        <FlexPaddingCenter
          gap={12}
          style={{
            width: "84%",
            paddingBottom: "100px",
            margin: "auto auto",
          }}
        >
          {filteredChamps &&
            filteredChamps.length > 0 &&
            filteredChamps.map((champ) => (
              <ChampItem
                style={{ width: "19%" }}
                onClick={(e) => {
                  router.push(`champion-details/${champ.id}`);
                }}
                champDetails={champ}
                key={champ.id}
              />
            ))}
        </FlexPaddingCenter>
      </Container>
    </BaseContainer>
  );
};

export default Champions;
