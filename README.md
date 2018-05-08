<img src="https://github.com/MARKETProtocol/dApp/blob/master/src/img/MARKETProtocol-Light.png?raw=true" align="middle">

MARKET Protocol has been created to provide a secure, flexible, open source foundation for decentralized trading on the Ethereum blockchain. We provide the pieces necessary to create a decentralized exchange, including the requisite clearing and collateral pool infrastructure, enabling third parties to build applications for trading.

Join our [Discord Community](https://www.marketprotocol.io/discord) to interact with members of our dev staff and other contributors.

# Backend using serverless

Deployment

* To correctly compile dependencies you will need to deploy from an EC2 instance [That matches the Lambda Execution Environment](https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)
* Set Environment variables PROVIDER_URL, CONTRACT_ADDRESS, OWNER_ADDRESS and OWNER_PRIVKEY in serverless.yml
* node >= v8.1.0
* `npm install`
* `npm install -g serverless`
* `serverless deploy`
* To run tests, set the environment variable BASE_URL to the url returned from `serverless deploy`, and then run `npm test`

HTTP methods

* POST /whitelist '{"address": "0xblala"}' - Adds an address to DynamoDB and submits transaction `addAddressToWhiteList` to `MarketContractRegistry.sol`
* GET /whitelist - Returns addresses in `addressWhiteList` from `MarketContractRegistry.sol`
* GET /dbentries - Returns all addresses submitted to DynamoDB

## Contributing

Want to hack on MARKET Protocol? Awesome!

MARKET Protocol is an Open Source project and we welcome contributions of all sorts. There are many ways to help, from reporting issues, contributing code, and helping us improve our community.

Ready to jump in? Check [docs.marketprotocol.io/#contributing](https://docs.marketprotocol.io/#contributing). 

## Questions?

Join our [Discord Community](https://www.marketprotocol.io/discord) to get in touch with our dev staff and other contributors.
