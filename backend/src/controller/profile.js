
import { prisma } from "../config/db.js";
import { respone } from "../utils/response.js";
export const createProfile = async (req, res) => {
    try {
        const { Id, avatarUrl,coverUrl } = req.body;

        const profile = await prisma.profile.findFirst({
            where: { userId: parseInt(Id, 10) },
        });

        const result = await prisma.profile.update({
            where: { id: profile.id},
            data: {
                avatar: avatarUrl,
                sampul:coverUrl
            },
        });

        respone(200, result, res);
    } catch (error) {
        console.error(error);
        respone(500, "internal server error", res); 
    }
};


export const GetAllProfile = async (req, res)=>{
    try{
        const result = await prisma.profile.findMany({
            include:{
                user:true
            }
        })
     
        respone(200, result, res)
    }catch(error){
        console.error(error)
        respone(500, "internal server", res)
    }
}