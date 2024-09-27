import { route } from "../config/express.js";
import { getAllUsers, createUser, getUserById, reset, updatePassword, } from "../controller/route.js"; 
const userRoute = route;

userRoute.get('/users/data', getAllUsers);
userRoute.post('/users/create', createUser);
userRoute.get('/users/:id', getUserById);
userRoute.post('/token/email', reset);
userRoute.put('/password/reset', updatePassword);

export { userRoute };
