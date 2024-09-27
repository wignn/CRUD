import express from 'express';
import 'colors';
import { port } from './config/route.js';
import {MainRoute, userRoute, profileRoute, mailRoute, routeBook} from './routes/route.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  
app.use('/', MainRoute, userRoute, profileRoute, mailRoute ,routeBook);


app.listen(port, () => {
    console.log(`server is running on port `.blue + ` http://localhost:${port}/ `.green);
});
