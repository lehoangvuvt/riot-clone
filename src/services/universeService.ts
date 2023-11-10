import {
  UniverseExploreDataType,
  UniverseIndexDataType,
} from "@/types/api.types";
import getBaseAxios from "./baseAxios";

const baseURL = "https://universe-meeps.leagueoflegends.com/v1/en_us/";

const universeService = {
  async getIndexData(): Promise<UniverseIndexDataType> {
    const baseAxios = getBaseAxios(baseURL);
    const response: UniverseIndexDataType = await baseAxios.get(
      "search/index.json"
    );
    return response;
  },
  async getExploreData(): Promise<UniverseExploreDataType> {
    const baseAxios = getBaseAxios(baseURL);
    const response: UniverseExploreDataType = await baseAxios.get(
      "explore/index.json"
    );
    return response;
  },
};

export default universeService;
