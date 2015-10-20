// -----------------------------------------------------------------
//  hapi-plugin.js
//
//  Copyright 2015. Paul Jackson.
//  Paul Jackson <pjackson@gmail.com>
//

'use strict';

// -----------------------------------------------------------------
//
// Hapi uses a plugin model for services and middleware style
// modules—rather then sprinking modules with plugin boilerplate
// this module decorates a module and makes it a Hapi plugin
//

// -----------------------------------------------------------------
//  Exports

exports = module.exports = function (name, funcs) {
  var plugin = {
    register: function (server, options, next) {
      if (options.verbose) server.log(name, 'Register');
      if (funcs.init) funcs.init(server, options);
      server.plugins[name] = funcs;
      next();
    }
  };

  plugin.register.attributes = {
    name: name
  };

  return plugin;
};
