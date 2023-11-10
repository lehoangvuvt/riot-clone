import getBaseAxios from "@/services/baseAxios";
import { useQuery } from "react-query";

const getChampDetails = async ({ queryKey }: { queryKey: string[] }) => {
  const champName = queryKey[1];
  const baseAxios = getBaseAxios();
  const response = await baseAxios.get(`champion/${champName}.json`);
  if (response && response.data) {
    return response.data[champName];
  } else {
    return null;
  }
};

const useChampDetails = (champName: string) => {
  const { data, isLoading } = useQuery(
    ["GET_CHAMP_DETAILS", champName],
    getChampDetails
  );
  return {
    isLoading,
    data: data,
  };
};

export default useChampDetails;
