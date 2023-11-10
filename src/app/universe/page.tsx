import {
  UniverseIndexDataType,
  UniverseExploreDataType,
} from "@/types/api.types";
import universeService from "@/services/universeService";
import UniverseClient from "./client";

const UniverseServer = async () => {
  const indexData: UniverseIndexDataType = await universeService.getIndexData();
  const exploreData: UniverseExploreDataType =
    await universeService.getExploreData();
  return <UniverseClient indexData={indexData} exploreData={exploreData} />;
};

export default UniverseServer;
