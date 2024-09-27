import { route } from "../config/express.js";
import { test } from "../controller/test.js";
const MainRoute = route

MainRoute.get('/test', test)

export {MainRoute}; 
