/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SHA1NSEC3Digest,
  SHA1NSEC3DigestInterface,
} from "../SHA1NSEC3Digest";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "salt",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "iterations",
        type: "uint256",
      },
    ],
    name: "hash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class SHA1NSEC3Digest__factory {
  static readonly abi = _abi;
  static createInterface(): SHA1NSEC3DigestInterface {
    return new utils.Interface(_abi) as SHA1NSEC3DigestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SHA1NSEC3Digest {
    return new Contract(address, _abi, signerOrProvider) as SHA1NSEC3Digest;
  }
}
