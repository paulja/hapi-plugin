
var assert = require('assert');
var plugin = require('..');

describe('Hapi-Plugin', function() {
  describe('smoke test', function() {
    it('should have instance of plugin', function() {
      assert(plugin);
    });
  });
  describe('plugin no opions', function() {
    var server;

    before(function(done) {
      server = new (require('Hapi')).Server();
      server.register(plugin('echo', require('./echo')), function (err) {
        if (err) throw err;
      });
      done();
    });

    it('should locate service by using `plugins` collection', function(done) {
      assert(server.plugins.echo);
      server.plugins.echo.send('whoop!', function(err, data) {
        assert.ifError(err);
        assert.equal(data, 'ECHO: whoop!');
        done();
      });
    });
  });
  describe('plugin with opions', function() {
    var server;

    before(function(done) {
      server = new (require('Hapi')).Server();
      server.register({
        register: plugin('echo', require('./echo')),
        options: {
          verbose: true
        }
      }, function (err) {
        if (err) throw err;
      });
      done();
    });

    it('should locate service by using `plugins` collection', function(done) {
      assert(server.plugins.echo);
      server.plugins.echo.send('whoop!', function(err, data) {
        assert.ifError(err);
        assert.equal(data, 'ECHO: whoop!');
        done();
      });
    });
  });});
