import { ethers } from "ethers";
import { diamondCutABI } from "./abis";
const solc = require("solc");

function getTimestamp() {
  return Math.floor(+new Date() / 1000);
}

async function awaitAndFilter(requests: any[]) {
  let result = (await Promise.allSettled(requests))
    .filter((res) => res.status === "fulfilled")
    .map((res: any) => res.value);
  return result;
}

function mergeListIntoDictionary(list: any[]): any {
  const container: any = {};
  for (let item of list) {
    const keys: string[] = Object.keys(item);
    if (keys.length !== 1) {
      console.log(
        `${JSON.stringify(
          item
        )} cannot be merged as one or more elements contain more than 1 keys.`
      );
      continue;
    }
    const key: string = keys[0];
    container[key] = item[key];
  }
  return container;
}

function compileSolidityCode(name: any, src: any) {
  let input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: src,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  console.log(output);
  // `output` here contains the JSON output as specified in the documentation
  // for (var contractName in output.contracts['test.sol']) {
  // console.log(
  //     contractName +
  //     ': ' +
  //     output.contracts['test.sol'][contractName].evm.bytecode.object
  // );
  return output.contracts["test.sol"][name].abi;
}

function findTopMatches(list: any, str: any) {
  let slicedStr = str.toLowerCase().split(" ");

  let mappedList = list.map((item: any) => {
    return {
      count: 0,
      ...item,
    };
  });

  for (let item of mappedList) {
    for (let s of slicedStr) {
      item.count += (
        item.name.toLowerCase().match(new RegExp(s, "g")) || []
      ).length;
      item.count += (
        item.description.toLowerCase().match(new RegExp(s, "g")) || []
      ).length;
    }
  }

  mappedList.sort(function (a: any, b: any) {
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    return 0;
  });

  return mappedList;
}

function getSelectors(abi: any) {
  const interfaceInstance = new ethers.utils.Interface(abi);
  const signatures = Object.keys(interfaceInstance.functions);
  const selectors = signatures.reduce((acc: any, val: any) => {
    if (val !== "init(bytes)") {
      acc.push(interfaceInstance.getSighash(val));
    }
    return acc;
  }, []);
  selectors.interface = interfaceInstance;
  selectors.remove = remove;
  selectors.get = get;
  return selectors;
}

function remove(this: any, funcNames: any) {
  const selectors = this.filter((v: any) => {
    for (const functionName of funcNames) {
      if (v === this.interface.getSighash(functionName)) {
        return false;
      }
    }
    return true;
  });
  selectors.interface = this.interface;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

function get(this: any, funcNames: any) {
  const selectors = this.filter((v: any) => {
    for (const functionName of funcNames) {
      if (v === this.interface.getSighash(functionName)) {
        return true;
      }
    }
    return false;
  });
  selectors.interface = this.interface;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

async function buildTxPayload(
  facetAbi: any,
  facetAddress: any,
  func: any,
  action: any,
  diamondAddr: any
) {

  const data = new ethers.utils.Interface(diamondCutABI).encodeFunctionData(
    "diamondCut",
    [
      [
        {
          facetAddress: facetAddress,
          action: action.toLowerCase() == "add" ? 0 : 1,
          functionSelectors: func
            ? getSelectors(facetAbi).get([func])
            : getSelectors(facetAbi),
        },
      ],
      ethers.constants.AddressZero,
      "0x",
    ]
  );

  console.log(data)
}

export {
  getTimestamp,
  awaitAndFilter,
  mergeListIntoDictionary,
  compileSolidityCode,
  findTopMatches,
  buildTxPayload,
};
