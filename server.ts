import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import {MongoClient, ObjectId} from  "mongodb";
import { compileSolidityCode, findTopMatches ,buildTxPayload, getDiamondInfo, generateSelectorsData} from "./utils/utils";
import { providers , Wallet ,Signer, utils} from "ethers";
const cors = require("cors");

dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",// TODO : Add custom domain
  optionsSuccessStatus: 200,
};

// const sigProviders: any = {
//   "80001": new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
//   "534354" : new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.SCROLL_RPC!)),

// };

const Providers : any = {
  "80001" : new providers.JsonRpcProvider(process.env.MUMBAI_RPC!),
  "534354" :new providers.JsonRpcProvider(process.env.SCROLL_RPC!)
}

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

app.get("/test", async (req : Request, res : Response)=>{
  // const abi = compileSolidityCode("MeatStoreFacet",'pragma solidity ^0.8.;interface MeatStoreFacet{event meatAdded(uint256 idx, string name);event meatRemoved(uint256 idx);function setButcherName (string memory _newButcherName) external;function getButcherName() external view returns (string memory _butcherName);function buyMeat(uint256 _idx) external;function addMeat(string memory _newMeat) external;function removeMeat(uint256 _idx) external;function getStoreItems() external view returns (string[] memory itemList);}');
  // contract MeatStoreFacet is IMeatStoreFacet {
  
  // }');

  const info = await getDiamondInfo("0xe06ACc0f72FD8C4D885f5A760e634Af199fFd51F", Providers["80001"]);
  res.status(200).send({
    info
  })
})

app.post("/add-facet", async (req : Request, res : Response) => {

  try {
    const {name, abi, address, description} = req.body;
    // parse src to abi
    // const abi = JSON.stringify(compileSolidityCode(name,src));
    console.log(abi)
    const selectorsData = generateSelectorsData(JSON.parse(abi),address,name);
    const timesUsed = 0;
    const audited = false;
    const db = await connectToDb();
    const exist = await db.collection("facets").findOne({address:
      { $regex: new RegExp("^" + address.toLowerCase(), "i") }})
  
    if(!exist){
      db.collection("facets").insertOne({name,address,description, abi, timesUsed,audited});
      db.collection("selectors").insertMany(selectorsData);
    }
    res.status(200).end();
  }catch (e) {

    console.error(e);
    res.status(500).end();
  }
  
})

app.get("/facets", async (req : Request, res: Response) => {

  try {

    const {searchStr, size} = req.body;

    const db = await connectToDb();
    let facets = await db.collection("facets").find({}).toArray();

    if(searchStr && searchStr != ""){
      facets = findTopMatches(facets,searchStr);
    }

    if(size){
      facets = facets.slice(0,size);
    }

    res.status(200).send({
      facets
    })

  }catch (e) {
    console.log(e);
    res.status(500).send();
  }
  
})

app.get("/update-diamond", async (req : Request , res: Response) => {

  try {
    const {facetID, diamondAddr, action, funcList } = req.body;

    const db = await connectToDb()
    const facet = await db.collection("facets").findOne({"_id" : new ObjectId(facetID)})
    // const payload = await buildTxPayload(facet.abi,facet.address,funcList,action,diamondAddr,Providers["80001"], sigProviders["80001"]);
    const payload = buildTxPayload(facet.abi,facet.address,funcList,action);
    res.status(200).send(
      {
        payload
      }
    )

  } catch (e) {
    console.log(e);
    res.status(500).end();
  }  

})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
