import axios from 'axios'
import { API } from "./Api";

export const GetDashboard = async (query: string, genre: any) => {
  try {
    const result = await axios.get(`${API}/book/search`, {
      params: { query ,genre},
    });
    const books = result.data
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};
