# Hapi-Plugin

A Node.js module you can use to decorate any module to make it a Hapi plug-in. 

## Motivation
I wanted to use a Service Locator style dependency model in my [Hapi](http://hapijs.com/) projects—However, we all use our modules in different ways and in different projects, and they're not always Hapi projects—therefore, you typically do not want to bake the Hapi plug-in registration code inside all those modules. 

By using `hapi-plugin` you do not need to—you can write your module as you usually would, `export`ing your objects and functions, and they will be available by using the standard `plugins` collection on the Hapi server object.

## Installation

    npm install --save hapi-plugin

## Usage
Sample usage:

    // Make a Hapi server
    var server = new (require('hapi')).Server();
    server.connection({
      host: 'localhost',
      port: 3000
    });

    // Make Wreck a plugin
    var plugin = require('hapi-plugin');
    server.register(plugin('http', require('wreck')), function (err) {
      if (err) throw err;
    });

Any time you need a dependency, you can access the `plugins` collection, for example, to get the `http` plug-in registered in the code above:

    var http = server.plugins.http; // locate the service
    http.get(req.url, options, function (err, res, payload) {
      ...
    });

## Options
If you need to do any initialisation before you use the plug-in, export a function `init(server, options)` and the `hapi-plugin` module will pass in the Hapi server instance and `options` value you set in the registration of the plugin.

## License
MIT

Copyright (c) 2015 Paul Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.