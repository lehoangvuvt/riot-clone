import getBaseAxios from "@/services/baseAxios";
import { useQuery } from "react-query";

const getAllChamps = async () => {
  const baseAxios = getBaseAxios();
  const response = await baseAxios.get("champion.json");
  if (response && response.data) {
    const data = [];
    for (var key in response.data) {
      data.push(response.data[key]);
    }
    return data;
  } else {
    return [];
  }
};

const useAllChamps = () => {
  const { data, isLoading } = useQuery("GET_ALL_CHAMPS", getAllChamps);
  return {
    isLoading,
    data: data,
  };
};

export default useAllChamps;
