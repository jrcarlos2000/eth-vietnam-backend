import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",// TODO : Add custom domain
  optionsSuccessStatus: 200,
};

const winston = require("winston");
const consoleTransport = new winston.transports.Console();
dotenv.config();

// const myWinstonOptions = {
//   transports: [consoleTransport],
// };

const app: Express = express();
const port = process.env.PORT;
// parse JSON and others
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());



// log all requests and responses
morganBody(app, { logAllReqHeader: true, maxBodyLength: 5000 });



app.post("/test", async (req: Request, res: Response) => {
  // const { param1 , param2} = req.body;
  try {
    console.log("test");
    res.status(200).end();
  } catch (error: any) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
