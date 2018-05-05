<img src="https://github.com/MARKETProtocol/dApp/blob/master/src/img/MARKETProtocol-Light.png?raw=true" align="middle">

MARKET Protocol has been created to provide a secure, flexible, open source foundation for decentralized trading on the Ethereum blockchain. We provide the pieces necessary to create a decentralized exchange, including the requisite clearing and collateral pool infrastructure, enabling third parties to build applications for trading.

Join our [Discord Community](https://www.marketprotocol.io/discord) to interact with members of our dev staff and other contributors.

# Backend API

Deployment

* To correctly compile dependencies you will need to deploy from an EC2 instance [That matches the Lambda Execution Environment](https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)
* To run tests, run `npm run-script devsetup`. Make sure the `.env` file has the correct environmental variables. These are used for the tests.
* To run the tests, `npm test`

HTTP methods

* Add to Whitelist (`MarketContractRegistry.sol`). The address is the contract to be whitelisted.
```
POST /contracts/whitelist HTTP/1.1
Content-Type: application/json

{address: "0x06e28E90107e015f12DAE5F2FE0C6750eF225620"}
```

* Retrieve Whitelist (`MarketContractRegistry.sol`).
```
GET /contracts/whitelist HTTP/1.1
```
