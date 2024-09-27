import { route } from "../config/express.js";
import { sendEmail } from "../controller/route.js";

const mailRoute = route

mailRoute.post('/mail', sendEmail)

export {mailRoute}