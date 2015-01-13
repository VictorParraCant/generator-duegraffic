/* global describe, beforeEach, it */
'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('duegraffic generator', function () {

  beforeEach(function (done){

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        done(err);
        return;
      }

      this.app = helpers.createGenerator('duegraffic:app', ['../../app']);

      this.app.options['skip-install'] = true;
      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      '.gitignore',
      '.gitignore',
      '.bowerrc',
      '.jshintrc',
      'Gruntfile.js',
      'README.md',
      'bower.json',
      'package.json',
      'app/jade/index.jade',
      'app/jade/template/layout.jade',
      'app/jade/template/menu.jade',
      'app/less/main.less',
      'app/less/variables.less',
      'app/js/main.js'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'version':'0.0.1',
      'description': 'awesome module',
      'authorName':'Pedro J. Parra',
      'authorEmail':'pedroparra.correo@gmail.com',
      'license':'MIT'
    });

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent('package.json', /"name": "mymodule"/);
      done();
    });

  });

});
