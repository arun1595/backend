const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;

const server = process.env.BASE_URL;

describe('GET /whitelist', () => {
    it('should return whitelist', (done) => {
      chai.request(server)
      .get('/whitelist')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });
})

describe('GET /dbentries', () => {
    it('should return dbentries', (done) => {
      chai.request(server)
      .get('/dbentries')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });
})