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
      message: 'Module Name',
      default: path.basename(process.cwd()),
    },
    {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
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
