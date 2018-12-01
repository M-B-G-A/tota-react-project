import EosApi from "eosjs-api";
import Eos from "eosjs";

const prodOptions = {
  httpEndpoint: "http://127.0.0.1:8888", // default, null for cold-storage
  verbose: false, // API logging
  logger: { // Default logging functions
    // log: console.log,
    error: console.error,
  },
  fetchConfiguration: {},
}

const devOptions = {
  httpEndpoint: "https://jungle2.cryptolions.io:443", // default, null for cold-storage
  verbose: false, // API logging
  logger: { // Default logging functions
    // log: console.log,
    error: console.error,
  },
  fetchConfiguration: {},
}

const config = process.env.NODE_ENV === "production" ? prodOptions : devOptions;

const eos = EosApi(config);
const eosJS = Eos(config);

export { eos, eosJS };
