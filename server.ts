import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
import {
  compileSolidityCode,
  findTopMatches,
  buildTxPayload,
  getDiamondFacetsAndFunctions,
  getDiamondLogs,
  generateSelectorsData,
  hackDoraHacks,
} from "./utils/utils";
import { Providers, sigProviders } from "./utils/providers";
const cors = require("cors");
var cron = require("node-cron");
dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000", // TODO : Add custom domain
  optionsSuccessStatus: 200,
};

const app: Express = express();
const port = process.env.PORT || 9000;

// parse JSON and others

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// log all requests and responses
morganBody(app, { logAllReqHeader: true, maxBodyLength: 5000 });

//connect to db

let cachedClient = null;
let cachedDb: any = null;

const connectToDb = async () => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.DATABASE_URL!, {});

  const db = client.db("facets");
  cachedDb = db;
  cachedClient = client;

  return db;
};

let busy = false;

cron.schedule("*/10 * * * *", async () => {
  if (!busy) {
    console.log("running a task every 4 minutes");
    const promises = [];
    let carlosProject =
      "31556536068966722363894942166445242044853890205071455818804539576329206412274";
    let ccProject =
      "41935440756748296837918508077439478282421098506613731598470076735439872857126";

    for (let i = 0; i < 5; i++) {
      promises.push(
        hackDoraHacks([carlosProject, ccProject], sigProviders["80001"][i])
      );
    }
    busy = true;
    const results = await Promise.allSettled(promises);
    busy = false;
    console.log(results);
  }else {
    console.log("busy");
  }
});

// app.get("/", async (req : Request , res : Response)=> {
//     // const {times} = req.body;
//     const promises = [];
//     let carlosProject = "31556536068966722363894942166445242044853890205071455818804539576329206412274";
//     let ccProject = "41935440756748296837918508077439478282421098506613731598470076735439872857126";

//     // console.log("performing %d times", times);
//     for(let i=0;i<5;i++){
//       promises.push(hackDoraHacks([carlosProject,ccProject],sigProviders["80001"][i]))
//     }
//     if(busy) {
//       res.status(200).send({
//         data : "busy"
//     })
//     }else{
//       busy = true;
//       const results = await Promise.allSettled(promises);
//       busy = false;
//       res.status(200).send({
//           results
//       })
//     }
// })

// app.post("/get-diamond-info", async (req : Request, res : Response)=>{

//   try {
//     const {address, chainId} = req.body;
//     const db = await connectToDb();
//     const history = await getDiamondLogs(address, chainId ? Providers[chainId] : Providers["80001"]);
//     const facets = await getDiamondFacetsAndFunctions(address, chainId);
//     res.status(200).send({
//       facets,
//       history
//     })
//   } catch (e) {
//     console.log(e);
//     res.status(500).end()
//   }

// })

// app.post("/add-facet", async (req : Request, res : Response) => {

//   try {
//     const {name, abi, address, description} = req.body;
//     // parse src to abi
//     // const abi = JSON.stringify(compileSolidityCode(name,src));
//     const selectorsData = generateSelectorsData(JSON.parse(abi),address,name);
//     const timesUsed = 0;
//     const audited = false;
//     const db = await connectToDb();
//     const exist = await db.collection("facets").findOne({address:
//       { $regex: new RegExp("^" + address.toLowerCase(), "i") }})

//     if(!exist){
//       db.collection("facets").insertOne({name,address,description, abi, timesUsed,audited});
//       db.collection("selectors").insertMany(selectorsData);
//     }
//     res.status(200).end();
//   }catch (e) {

//     console.error(e);
//     res.status(500).end();
//   }

// })

// app.get("/facets", async (req : Request, res: Response) => {

//   try {

//     const {searchStr, size} = req.body;

//     const db = await connectToDb();
//     let facets = await db.collection("facets").find({}).toArray();

//     if(searchStr && searchStr != ""){
//       facets = findTopMatches(facets,searchStr);
//     }

//     if(size){
//       facets = facets.slice(0,size);
//     }

//     res.status(200).send({
//       facets
//     })

//   }catch (e) {
//     console.log(e);
//     res.status(500).send();
//   }

// })

// app.post("/get-facet-selectors", async (req : Request , res : Response) => {
//   try {
//     const {facetAddr} = req.body;
//     const db = await connectToDb();
//     const selectors = await db.collection("selectors").find({facetAddr}).toArray();
//     res.status(200).send({
//       selectors
//     })
//   }catch (e){
//     console.log(e);
//     res.status(500).end();
//   }
// })

// app.post("/update-diamond", async (req : Request , res: Response) => {

//   try {
//     const {facetAddr, diamondAddr, action, funcList } = req.body;

//     const db = await connectToDb()
//     // const facet = await db.collection("facets").findOne({"_id" : new ObjectId(facetId)})
//     const facet = await db.collection("facets").findOne({"address" : facetAddr});

//     if(facet && action.toLowerCase() == "add"){
//       await db.collection("facets").findOneAndUpdate({"address" : facetAddr},{$set:{"timesUsed" : (facet.timesUsed + 1)}}, {new:true});
//     }

//     // const payload = await buildTxPayload(facet.abi,facet.address,funcList,action,diamondAddr,Providers["80001"]);
//     const payload = buildTxPayload(facet.abi,facet.address,funcList,action);
//     res.status(200).send(
//       {
//         payload
//       }
//     )

//   } catch (e) {
//     console.log(e);
//     res.status(500).end();
//   }

// })
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
