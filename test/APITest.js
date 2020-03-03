/*
API = https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false

Acceptance Criteria:

Name = "Carbon credits"
CanRelist = true
The Promotions element with Name = "Gallery" has a Description that contains the text "2x larger image"

Instructions:

The test needs to be written using a programming language of your choice (not a tool like SoapUI)
Please submit your test to us in a format that lets us execute and review the code
Please note that your test should validate all the three acceptance criteria
Points will be awarded for meeting the criteria, style and the use of good practices

*/

var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false';
var response;

describe('API test suite - ', function () {

    before('get the API response', function (done) {
        chai.request(url).get('/').send().end(function (err, res) {
            response = res.body;
            done();
        })
    })

    it('Name should be Carbon credits', function (done) {
        expect(response).to.have.property("Name").to.equal('Carbon credits');
        done();
    })

    it('CanRelist should be true', function (done) {
        expect(response).to.have.property("CanRelist").to.be.true;
        done();
    })

    it('The Promotions element with Name = "Gallery" has a Description that contains the text "2x larger image" ', function (done) {
        expect(response).to.have.property("Promotions").to.be.an('array');
        var isGalleryPromotionFound = false;
        response.Promotions.forEach(function (e) {
            if (e.Name === 'Gallery') {
                isGalleryPromotionFound = true;
                expect(e.Description).to.have.string('2x larger image');
            }
        });

        if (!isGalleryPromotionFound)
            expect.fail('There is no Promotions element with Name = "Gallery"');
        done();
    })

})