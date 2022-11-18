import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import {MongoClient} from  "mongodb";
const cors = require("cors");

dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",// TODO : Add custom domain
  optionsSuccessStatus: 200,
};


const app: Express = express();
const port = process.env.PORT || 9000;

// parse JSON and others

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// log all requests and responses
morganBody(app, { logAllReqHeader: true, maxBodyLength: 5000 });

//connect to db 

let cachedClient = null;
let cachedDb:any = null;

const connectToDb = async () => {

  if(cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.DATABASE_URL!,{})

  const db = client.db("facets");
  cachedDb = db;
  cachedClient = client;

  return db

}

app.post("/add-facet", async (req : Request, res : Response) => {
  const {name} = req.body;
  const db = await connectToDb();
  const facet = await db.collection("facets").insertOne({name});
  res.status(200).end();
})

app.get("/facets", async (req : Request, res: Response) => {
  const db = await connectToDb();
  const facets = await db.collection("facets").find({}).toArray(); 
  res.status(200).send({
    facets
  })
})

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
