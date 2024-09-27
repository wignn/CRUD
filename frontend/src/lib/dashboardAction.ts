import { prisma } from "@/lib/prisma";
import axios from 'axios'
import { API } from "./Api";

export const GetDashboard = async (query: string) => {
  try {
    
    const result = await axios.get(`${API}/book/search`, {
      params: { query }
    });
    const books = result.data
    // console.log('Fetched books:', books);
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};
