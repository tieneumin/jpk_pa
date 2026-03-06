import axios from "axios";

const BASE_API_URL = "https://jpk-202603-pa-b.onrender.com";

export async function getCardioWarmups(intensity, sort) {
  try {
    const queries = new URLSearchParams({
      ...(intensity !== "all" ? { intensity } : {}),
      ...(sort !== "none" ? { sort } : {}),
    });
    const res = await axios.get(`${BASE_API_URL}/cardio-warmups?${queries}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getStretchingWarmups(search, page, limit) {
  try {
    const queries = new URLSearchParams({
      ...(search ? { search } : {}),
      ...{ page },
      ...{ limit },
    });
    const res = await axios.get(
      `${BASE_API_URL}/stretching-warmups?${queries}`,
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
}
