const Web3 = require("web3");

let web3;
const poolAbi = require("./poolAbi.json");
const vaultAbi = require("./vaultAbi.json");
const tokenAbi = require("./tokenAbi.json");

const readline = require("readline-sync");

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

const poolAddresses = [
  "0x56df5ef1A0A86c2A5Dd9cC001Aa8152545BDbdeC",
  "0xEdf085f65b4F6c155e13155502Ef925c9a756003",
  "0x56F30398d13F111401d6e7ffE758254a0946687d",
  "0x4bd6D86dEBdB9F5413e631Ad386c4427DC9D01B2",
  "0x7Edde0CB05ED19e03A9a47CD5E53fC57FDe1c80c",
  "0x6Dd0F7c8F4793ed2531c0df4fEA8633a21fDcFf4",
  "0x90CA5cEf5B29342b229Fb8AE2DB5d8f4F894D652",
  "0xb03C6B351A283bc1Cd26b9cf6d7B0c4556013bDb",
  "0xA47D1251CF21AD42685Cc6B8B3a186a73Dbd06cf",
  "0x544c823194218f0640daE8291c1f59752d25faE3",
  "0x10a2F8bd81Ee2898D7eD18fb8f114034a549FA59",
  "0x4Db9024fc9F477134e00Da0DA3c77DE98d9836aC",
  "0xF6dc4640D2783654BeF88E0dF3fb0F051f0DfC1A",
  "0x787546Bf2c05e3e19e2b6BDE57A203da7f682efF",
  "0x71628c66C502F988Fbb9e17081F2bD14e361FAF4",
  "0xce16E7ed7654a3453E8FaF748f2c82E57069278f",
  "0x3A693EB97b500008d4Bb6258906f7Bbca1D09Cc5",
  "0x893B30574BF183d69413717f30b17062eC9DFD8b",
  "0xA8D4433BAdAa1A35506804B43657B0694deA928d",

  "0x7173b184525feAD2fFbde5FBe6FCB65Ea8246eE7",
];

async function getLPdata(address) {
  for (let i = 0; i < poolAddresses.length; i++) {
    let Paddress = poolAddresses[i];
    const poolInstance = new web3.eth.Contract(poolAbi, Paddress);

    let LPdecimals = await poolInstance.methods.decimals().call();
    let LPtokensReceived = await poolInstance.methods.balanceOf(address).call();
    let LPtotalSupply = await poolInstance.methods.totalSupply().call();
    LPtokensReceived = LPtokensReceived / 10 ** LPdecimals;
    LPtotalSupply = LPtotalSupply / 10 ** LPdecimals;

    let vaultAddress = await poolInstance.methods.getVault().call();
    let vaultInstance = new web3.eth.Contract(vaultAbi, vaultAddress);

    let poolId = await poolInstance.methods.getPoolId().call();
    let poolTokens = await vaultInstance.methods.getPoolTokens(poolId).call();

    let token0Address = poolTokens.tokens[0];
    let token1Address = poolTokens.tokens[1];
    let token0Reserve = poolTokens.balances[0];
    let token1Reserve = poolTokens.balances[1];

    let token0Instance = new web3.eth.Contract(tokenAbi, token0Address);
    let token1Instance = new web3.eth.Contract(tokenAbi, token1Address);
    let token0symbol = await token0Instance.methods.symbol().call();
    let token1symbol = await token1Instance.methods.symbol().call();
    let token0decimals = await token0Instance.methods.decimals().call();
    let token1decimals = await token1Instance.methods.decimals().call();

    let token0amount = (LPtokensReceived / LPtotalSupply) * token0Reserve;
    let token1amount = (LPtokensReceived / LPtotalSupply) * token1Reserve;
    token0amount = (token0amount / 10 ** token0decimals).toFixed(2);
    token1amount = (token1amount / 10 ** token1decimals).toFixed(2);

    if ((token0amount != 0, token1amount != 0))
      console.log(
        token0symbol,
        "+",
        token1symbol,
        token0amount,
        "+",
        token1amount
      );
  }
}

let address = readline.question("enter address:");
getLPdata(address);
