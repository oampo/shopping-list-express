var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var items = server.items;

chai.use(chaiHttp);

describe('Shopping List', function() {
    beforeEach(function() {
        items.items = [];
        items.add('Broad beans');
        items.add('Tomatoes');
        items.add('Peppers');
    });

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                (err === null).should.be.true;
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({name: "Garlic"})
            .end(function(err, res) {
                (err === null).should.be.true;
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Garlic');

                var item = items.items[items.items.length - 1];
                item.should.have.property('name');
                item.id.should.be.a('number');
                item.name.should.be.a('string');
                item.name.should.equal('Garlic');

                done();
            });

    });
    it('should edit an item on PUT');
    it('should delete an item on DELETE');
});
