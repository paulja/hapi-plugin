exports = module.exports = {
  send: function(msg, fn) {
    fn(null, 'ECHO: ' + msg);
  }
};
