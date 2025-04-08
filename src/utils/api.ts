import axios from "axios";

const publicKey = "826935b16b194edd3c1ddddc70a2f805";

export const API = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    apikey: publicKey,
  },
});

export const fetchComics = async (
  format: string = "All",
  limit: number = 20
) => {
  try {
    const res = await API.get("/comics", {
      params: {
        limit,
        ...(format !== "All" && { format }),
      },
    });
    return res.data.data.results;
  } catch (err) {
    return [];
  }
};
