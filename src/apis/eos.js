import EosApi from "eosjs-api";
import Eos from "eosjs";

const prodOptions = {
  httpEndpoint: "https://rpc.eosys.io", // default, null for cold-storage
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  verbose: false, // API logging
  logger: { // Default logging functions
    // log: console.log,
    error: console.error,
  },
  fetchConfiguration: {},
  broadcast: true,
}

const devOptions = {
  httpEndpoint: "https://jungle2.cryptolions.io:443", // default, null for cold-storage
  verbose: false, // API logging
  logger: { // Default logging functions
    log: console.log,
    error: console.error,
  },
  fetchConfiguration: {},
}

// const config = process.env.NODE_ENV === "production" ? prodOptions : devOptions;

const eos = EosApi(devOptions);
const eosJS = Eos(devOptions);

const eosMainnet = EosApi(prodOptions);

export { eos, eosJS, eosMainnet };
