import axios, { AxiosHeaders, AxiosInstance } from "axios";

const getBaseAxios = (
  baseURL: string = "https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/",
  headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
): AxiosInstance => {
  const baseAxios: AxiosInstance = axios.create({
    baseURL,
    headers,
  });

  baseAxios.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      console.log(error);
    }
  );

  return baseAxios;
};

export default getBaseAxios;
