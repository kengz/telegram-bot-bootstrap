// chai assertation library
var chai = require('chai'),
    should = chai.should()

var bot = require(__dirname + '/../API.js');

//==============================================
suite('Parameters setting', function() {
    suite('token', function() {
        var Alice = new bot(123456);
        test('shall be in this.token', function() {
            Alice.token.should.equal(123456);
        })
    })
})
