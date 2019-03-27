const prodNetworkOptions = {
  blockchain: "eos",
  protocol: "https",
  host: "nodes.get-scatter.com", // mainnet.eoscanada.com eos.greymass.com proxy.eosnode.tools
  port: 443,
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
};

const devNetworkOptions = {
  blockchain: "eos",
  protocol: "https",
  host: "api.jungle.alohaeos.com",
  port: 443,
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};

// const scatterNetwork = process.env.NODE_ENV === "production" ? prodNetworkOptions : devNetworkOptions;
const scatterNetwork = prodNetworkOptions;

export { scatterNetwork };
