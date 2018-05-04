'use strict';

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
const ABI = [{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"addAddressToWhiteList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"contractAddress","type":"address"}],"name":"AddressAddedToWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"contractAddress","type":"address"}],"name":"AddressRemovedFromWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"whiteListIndex","type":"uint256"}],"name":"removeContractFromWhiteList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAddressWhiteList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"isAddressWhiteListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const registry = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);

module.exports.getwhitelist = async (event, context, callback) => {
  try {
    const getAddressWhiteListResult = await registry.methods.getAddressWhiteList().call();
    const result = {
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify(getAddressWhiteListResult),
      "isBase64Encoded": false
    };
    callback(null, result);
  } catch(error) {
    callback(null, {
      "statusCode": 502, 
      "body": error.message
    });
  }
};