const Web3 = require("web3");

let web3;
const poolAbi = require("./poolAbi.json");
const vaultAbi = require("./vaultAbi.json");
const tokenAbi = require("./tokenAbi.json");
const yieldAbi = require("./yieldAbi.json");

const readline = require("readline-sync");

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

const LiquiditypoolAddresses = [
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

  "0xABb93e3787b984cb62dCD962af8732f52Ff57586",
  "0x63E9B50DD3eB63BfBF93B26F57b9EFB574e59576",
  "0x14792d3F6FcF2661795d1E08ef818bf612708BbF",
  "0x09b1b33BaD0e87454ff05696b1151BFbD208a43F",
  "0xC9AD279994980F8DF348b526901006972509677F",
];

const yieldPoolAddresses = [
  "0x415747EE98D482e6dD9B431fa76Ad5553744F247",
  "0x8E9d636BbE6939BD0F52849afc02C0c66F6A3603",
  "0xCF354603A9AEbD2Ff9f33E1B04246d8Ea204ae95",
  "0x7173b184525feAD2fFbde5FBe6FCB65Ea8246eE7",
  "0x4aBB6FD289fA70056CFcB58ceBab8689921eB922",
  "0x7C9cF12d783821d5C63d8E9427aF5C44bAd92445",
  "0x062F38735AAC32320DB5e2DBBEb07968351D7C72",
  "0xB70c25D96EF260eA07F650037Bf68F5d6583885e",
  "0x4212bE3C7b255bA4B29705573ABD023cdcE21542",
  "0x9e030b67a8384cbba09D5927533Aa98010C87d91",
  "0x7320d680Ca9BCE8048a286f00A79A2c9f8DCD7b3",
  "0xd16847480D6bc218048CD31Ad98b63CC34e5c2bF",
  "0x2D6e3515C8b47192Ca3913770fa741d3C4Dac354",
  "0xE54B3F5c444a801e61BECDCa93e74CdC1C4C1F90",
  "0xD5D7bc115B32ad1449C6D0083E43C87be95F2809",
  "0xF94A7Df264A2ec8bCEef2cFE54d7cA3f6C6DFC7a",
  "0x67F8FCb9D3c463da05DE1392EfDbB2A87F8599Ea",
  "0xDe620bb8BE43ee54d7aa73f8E99A7409Fe511084",

  "0x63E9B50DD3eB63BfBF93B26F57b9EFB574e59576",
  "0x6FE95FafE2F86158c77Bf18350672D360BfC78a2",
  "0x5fA3ce1fB47bC8A29B5C02e2e7167799BBAf5F41",
  "0x1D310a6238e11c8BE91D83193C88A99eB66279bE",
  "0x802d0f2f4b5f1fb5BfC9b2040a703c1464e1D4CB",
];

const yieldAddresses = [
  "0xCFe60a1535ecc5B0bc628dC97111C8bb01637911",
  "0x52C9886d5D87B0f06EbACBEff750B5Ffad5d17d9",
  "0x2c72692E94E757679289aC85d3556b2c0f717E0E",
  "0x49e9e169f0B661Ea0A883f490564F4CC275123Ed",
  "0x21Fb757C2d3a5C574e8721027C3d7a506d77b6b3",
  "0x2361102893CCabFb543bc55AC4cC8d6d0824A67E",
  "0x0740A6CfB9468B8b53070C0B327099293DCCB82d",
  "0xEaa1cBA8CC3CF01a92E9E853E90277B5B8A23e07",
  "0xC63958D9D01eFA6B8266b1df3862c6323CbDb52B",
  "0x285328906D0D33cb757c1E471F5e2176683247c2",
];

async function getLPdata(address, poolAddresses) {
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

async function getYieldData(address, addresses) {
  for (let i = 0; i < addresses.length; i++) {
    let Yaddress = addresses[i];
    const yieldInstance = new web3.eth.Contract(yieldAbi, Yaddress);

    let balance = await yieldInstance.methods.balanceOf(address).call();
    let decimals = await yieldInstance.methods.decimals().call();
    let name = await yieldInstance.methods.name().call();

    balance = (balance / 10 ** decimals).toFixed(2);

    if (balance != 0) console.log(name, balance); 
  }
}

let address = readline.question("enter address:");
getLPdata(address,LiquiditypoolAddresses);
getLPdata(address,yieldPoolAddresses);
getYieldData(address, yieldAddresses);
