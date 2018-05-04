const chai = require('chai');
const expect = require('chai').expect;

require('dotenv').config();

const whiteList = require('../whitelist/list');

describe('Get whitelist address', () => {
  it('should return whitelist or check for a proper error object', async () => {
    const callback = (error, result) => {
      // console.log(result);
      expect(result).to.be.a('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('body');
      if (result.statusCode == 200) {
        expect(result).to.have.property('headers');
        expect(result).to.have.property('isBase64Encoded');
        expect(JSON.parse(result.body)).to.be.a('array');
        expect(result.isBase64Encoded).to.be.a('boolean');
      } else {
        expect(result.statusCode).to.equal(502);
      }
    };
    const result = await whiteList.getwhitelist(null, null, callback);
  });
});
