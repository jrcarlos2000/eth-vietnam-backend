export const diamondCutABI = [
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotAddFunctionToDiamondThatAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4[]",
          "name": "_selectors",
          "type": "bytes4[]"
        }
      ],
      "name": "CannotAddSelectorsToZeroAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotRemoveFunctionThatDoesNotExist",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotRemoveImmutableFunction",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotReplaceFunctionThatDoesNotExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4[]",
          "name": "_selectors",
          "type": "bytes4[]"
        }
      ],
      "name": "CannotReplaceFunctionsFromFacetWithZeroAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_selector",
          "type": "bytes4"
        }
      ],
      "name": "CannotReplaceImmutableFunction",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_action",
          "type": "uint8"
        }
      ],
      "name": "IncorrectFacetCutAction",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_initializationContractAddress",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        }
      ],
      "name": "InitializationFunctionReverted",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contractAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "NoBytecodeAtAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_facetAddress",
          "type": "address"
        }
      ],
      "name": "NoSelectorsProvidedForFacetForCut",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_contractOwner",
          "type": "address"
        }
      ],
      "name": "NotContractOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_facetAddress",
          "type": "address"
        }
      ],
      "name": "RemoveFacetAddressMustBeZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "enum IDiamond.FacetCutAction",
              "name": "action",
              "type": "uint8"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "indexed": false,
          "internalType": "struct IDiamond.FacetCut[]",
          "name": "_diamondCut",
          "type": "tuple[]"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_init",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        }
      ],
      "name": "DiamondCut",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "enum IDiamond.FacetCutAction",
              "name": "action",
              "type": "uint8"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "internalType": "struct IDiamond.FacetCut[]",
          "name": "_diamondCut",
          "type": "tuple[]"
        },
        {
          "internalType": "address",
          "name": "_init",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        }
      ],
      "name": "diamondCut",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]