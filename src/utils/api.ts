import axios from "axios";
import { MarvelApiResponse } from "../types/marvelApiTypes";

const publicKey = "826935b16b194edd3c1ddddc70a2f805";

export const API = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    apikey: publicKey,
  },
});

export const fetchComics = async (
  format: string = "All",
  limit: number = 20,
  offset: number = 0
) => {
  try {
    const res = await API.get<MarvelApiResponse>("/comics", {
      params: {
        limit,
        offset,
        ...(format !== "All" && { format }),
      },
    });
    return res.data.data;
  } catch (err) {
    return {
      offset: 0,
      limit: 0,
      total: 0,
      count: 0,
      results: [],
    };
  }
};
