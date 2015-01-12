'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
module.exports = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');
    this.log(
      this.yeoman +
      '\nGenerador Frontend para Duegraffic');
  },

  askFor: function (){
    var cb = this.async();
    var prompts = [
    {
      name: 'name',
      message: 'Proyect Name',
      default: path.basename(process.cwd()),
    },
    {
      name: 'version',
      message: 'Proyect Version',
      default: '0.0.1',
    },
    {
      name: 'description',
      message: 'Proyect Description',
      default: 'Proyect for Duegraffic'
    },
    {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }

    ];

    this.prompt(prompts, function (props) {
      this.slugname = this._.slugify(props.name);
      this.props = props;
      cb();
    }.bind(this));

  },

  app: function () {

    this.config.save();

    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
    this.copy('jshintrc', '.jshintrc');

    this.template('README.md', 'README.md');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');

  },

  projectfiles: function () {
    // this.template('index.js', 'index.js');
    this.mkdir('app');
    this.mkdir('public');
  },

  install: function () {
    this.installDependencies();
  }

});
