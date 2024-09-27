import { respone } from "../utils/response.js";

export const test = async (req, res)=>{
    try {
        respone(200, "test" ,res)
    }catch(error){
        respone(500, "An error occurred while fetching users.", res)
    }
}