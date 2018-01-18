process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../index')
const should = chai.should()

chai.use(chaiHttp)

describe('User', () => {
  beforeEach((done) => {
    done()
  })

  describe('/POST login', () => {
    it('Login to the system with true email and password', (done) => {
      let user = {
        email: 'admin@bh.com',
        password: 'bh@132'
      }
      chai.request(server)
        .post('/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Login successfully')
          res.body.should.have.property('type').eql('success')
          res.body.should.have.property('code').eql(0)
          done()
        })
    })

    it('Login to the system with wrong email or password', (done) => {
      let user = {
        email: 'admin99@bh.com',
        password: '1233434'
      }
      chai.request(server)
        .post('/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Your email or password is incorrect')
          res.body.should.have.property('type').eql('failure')
          res.body.should.have.property('code').eql(1)
          done()
        })
    })
  })
})