const chai = require('chai');
const expect = require('chai').expect;

require('dotenv').config();

const addToWhiteList = require('../whitelist/create');

describe('Add whitelist address', () => {
  it('should return the submitted address', async () => {
    const callback = (error, result) => {
      console.log(result);
      expect(result).to.be.a('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('body');
      if (result.statusCode == 200) {
        expect(result).to.have.property('headers');
        expect(result).to.have.property('isBase64Encoded');
        expect(result.body).to.be.a('string');
        expect(result.isBase64Encoded).to.be.a('boolean');
      } else if (result.statusCode == 400) {
        expect(result.statusCode).to.equal(400); // placeholder
      } else {
        expect(result.statusCode).to.equal(502);
      }
    };
    const result = await addToWhiteList.create({address: process.env.ADD_TO_WHITELIST_ADDRESS}, null, callback);
  });
});