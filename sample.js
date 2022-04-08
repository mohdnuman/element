let LPtokensReceived=16144979979792995167290;
let totalSupplyLP=18421363180591963774711;
let decimals=18;

LPtokensReceived=LPtokensReceived/10**decimals;
totalSupplyLP=totalSupplyLP/10**decimals;

token0amount=LPtokensReceived/totalSupplyLP*(789220.75);
token1amount=LPtokensReceived/totalSupplyLP*(810924.23);

console.log(LPtokensReceived/totalSupplyLP);