'use strict';

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
const ABI = [{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"addAddressToWhiteList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"contractAddress","type":"address"}],"name":"AddressAddedToWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"contractAddress","type":"address"}],"name":"AddressRemovedFromWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"whiteListIndex","type":"uint256"}],"name":"removeContractFromWhiteList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAddressWhiteList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"isAddressWhiteListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const registry = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);

module.exports.create = async function (event, context, callback) {

  // Check event object for address (local testing)
  let eventAddress = null;
  if (event.address && typeof event.address === 'string') {
    eventAddress = event.address;
  }
  
  // Check body object for address (API POST)
  let bodyAddress = null;
  if (event.body &&  event.body !== '') {
      const body = JSON.parse(event.body);
      if (body.address && typeof body.address === 'string') {
        bodyAddress = body.address;
      }
  }

  // take the body address over the event
  let address = null;
  if (bodyAddress) {
    address = bodyAddress;
  } else if (eventAddress) {
    address = eventAddress;
  } else {
    return callback(null, {
      "statusCode": 400, 
      "body": "Data Validation: Address validation failed."
    });
  }

  const method = registry.methods.addAddressToWhiteList(address); 
  const tx = {
    from: process.env.OWNER_ADDRESS,
    to: process.env.CONTRACT_ADDRESS,
    gas: process.env.GAS_LIMIT,
    gasPrice: process.env.GAS_PRICE,
    data: method.encodeABI()
  };

  try {
    const signTransactionResult = await web3.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVKEY, (error, result) => result);
    const sendSignedTransactionResult = await  web3.eth.sendSignedTransaction(signTransactionResult.rawTransaction, (error, result) => result);
    const result = {
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify(sendSignedTransactionResult),
      "isBase64Encoded": false
    };
    callback(null, result);
  } catch(error) {
    callback(null, {
      "statusCode": 502, 
      "body": error.message
    });
  }

}
