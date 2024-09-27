import { route } from "../config/express.js";
import { createProfile, GetAllProfile, reset} from "../controller/route.js";

const profileRoute = route;
profileRoute.put('/profile/create', createProfile);
profileRoute.get('/profile/data', GetAllProfile);
profileRoute.post('/email/reset', reset)

export {profileRoute}