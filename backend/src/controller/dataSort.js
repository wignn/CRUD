import { respone } from "../utils/response.js";
import { prisma } from "../config/db.js";

export const dataSort = async (req, res) => {
    try {
        const savedImages = await prisma.image.findMany({
            select: {
              url: true,
            },
          });

          respone(200, savedImages,res)
    }catch(err){
        respone(500, err, res);
    }
}