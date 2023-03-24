import express from "express"
import bodyParser from "body-parser";
import routes from './routes/index.js';
import cors from 'cors'

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }
app.use(cors(corsOptions))



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(5000, () => {console.log("Server started on port 5000")});