import { GetChampDetailsResponse } from "@/types/api.types";
import ChampDetailsClient from "./client";
import getBaseAxios from "@/services/baseAxios";

const ChampDetailsServer = async ({
  params,
}: {
  params: { champId: string };
}) => {
  const baseAxios = getBaseAxios();
  const response: GetChampDetailsResponse = await baseAxios.get(
    `champion/${params.champId}.json`
  );
  return <ChampDetailsClient champDetails={response.data[params.champId]} />;
};

export default ChampDetailsServer;
