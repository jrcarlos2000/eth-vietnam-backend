import { Wallet, providers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const sigProviders: any = {
    "80001": [
        new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY1!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY2!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY3!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY4!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY5!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY6!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY7!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY8!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!)),
        new Wallet(process.env.PRIVATE_KEY9!,new providers.JsonRpcProvider(process.env.MUMBAI_RPC!))
    ],
    "534354" : new Wallet(process.env.PRIVATE_KEY!,new providers.JsonRpcProvider(process.env.SCROLL_RPC!)),
  
};
  
const Providers : any = {
    "80001" : new providers.JsonRpcProvider(process.env.MUMBAI_RPC!),
    "534354" :new providers.JsonRpcProvider(process.env.SCROLL_RPC!)
}

export {
    Providers,
    sigProviders
}