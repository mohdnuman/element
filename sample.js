let LPtokensReceived=18561377056265806995984;
let totalSupplyLP=23345284606448812888022;
let decimals=18;

LPtokensReceived=LPtokensReceived/10**decimals;
totalSupplyLP=totalSupplyLP/10**decimals;

token0amount=LPtokensReceived/totalSupplyLP*(7411637604064538995245/10**18);
token1amount=LPtokensReceived/totalSupplyLP*(16131086408716312569860/10**18);

console.log(token0amount,token1amount);