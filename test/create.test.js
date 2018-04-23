const chai = require('chai');
const expect = chai.expect;

const server = process.env.BASE_URL;

describe('POST /whitelist', () => {
    it('should return the submitted address', (done) => {
      chai.request(server)
      .post('/whitelist')
      .send({address: '0x0047615d4f065c1973ab091fe55276d83b27773e'})
      .end((err, res) => {
        console.log(err)
        expect(res.statusCode).to.equal(200);
        expect(res.body.address);
        done();
      });
    });
});