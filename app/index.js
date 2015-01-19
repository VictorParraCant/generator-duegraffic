'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
};

// Util
util.inherits(Generator, yeoman.generators.Base);

// Welcome Message
Generator.prototype.init = function init() {
  this.pkg = require('../package.json');
  this.log( yosay('Duegraffic Generator') );
  this.log(
    chalk.magenta(
      'Duegraffic Yeoman Generator for Frontend Web Development' +
      '\n'
    )
  );
};

// Gulp or grunt ?
Generator.prototype.askForTaskRunner = function askForTaskRunner(){
  var cb = this.async();
  var TaskRunnerFormats = ['gulp','grunt'];
  var prompts = [{
    type: 'list',
    name: 'TaskRunnerFormat',
    message: 'Select a Task Runner to use:',
    choices: TaskRunnerFormats,
    default: 'gulp'
  }];
  this.prompt(prompts, function (props) {
    this.TaskRunnerFormat = props.TaskRunnerFormat;
    cb();
  }.bind(this));
};

// Less or stylus ?
Generator.prototype.askForCssPreprocessor = function askForCssPreprocessor(){
  var cb = this.async();
  var CssPreprocessorFormats = ['stylus','less'];
  var prompts = [{
    type: 'list',
    name: 'CssPreprocessorFormat',
    message: 'Select a Css Pre-processor to use:',
    choices: CssPreprocessorFormats,
    default: 'stylus'
  }];
  this.prompt(prompts, function (props) {
    this.CssPreprocessorFormat = props.CssPreprocessorFormat;
    cb();
  }.bind(this));
};

// Use Boostrap ?
Generator.prototype.askForBootstrap = function askForBootstrap(){
  var cb = this.async();
  var prompts = [{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to use Bootstrap?',
    default: true
  }];
  this.prompt(prompts, function(props){
    this.bootstrap = props.bootstrap;
    cb();
  }.bind(this));
};


// Use Font-awesome ?
Generator.prototype.askForFontAwesome = function askForFontAwesome() {
  var cb = this.async();
  this.prompt([{
    type: 'confirm',
    name: 'fontawesome',
    message: 'Would you like to use Font-awesome?',
    default: true
  }], function (props) {
    this.fontawesome = props.fontawesome;
    cb();
  }.bind(this));
};

// Proyect info
Generator.prototype.askFor = function askFor(){

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
        name: 'authorName',
        message: 'Author\'s Name',
        store: true
      },
      {
        name: 'authorEmail',
        message: 'Author\'s Email',
        store: true
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

};

// Installation
Generator.prototype.app = function app(){
  this.config.save();

  // Root files
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('jshintrc', '.jshintrc');
  this.template('README.md', 'README.md');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');

  if( this.TaskRunnerFormat === 'grunt' ){
    this.template('_Gruntfile.js', 'Gruntfile.js');
  }else{
    this.template('_Gulpfile.js', 'Gulpfile.js');
  }

  // Folders
  this.mkdir('app');
  this.mkdir('app/img');
  this.mkdir('app/jade');
  this.mkdir('app/js');
  this.mkdir('app/styles');
  this.mkdir('public');

  // Jade files
  this.copy('jade/index.jade', 'app/jade/index.jade');
  this.copy('jade/template/layout.jade', 'app/jade/template/layout.jade');
  this.copy('jade/template/menu.jade', 'app/jade/template/menu.jade');

  // Less or Stylus files
  if( this.CssPreprocessorFormat === 'less' ){
    this.template('less/_main.less', 'app/styles/main.less');
    this.copy('less/variables.less', 'app/styles/variables.less');
  }else{
    this.template('stylus/_main.styl', 'app/styles/main.styl');
    this.copy('stylus/variables.styl', 'app/styles/variables.styl');
  }

  // Js files
  this.copy('js/main.js', 'app/js/main.js');

};


Generator.prototype.install = function install(){
  this.installDependencies({
    skipInstall: this.options['skip-install']
  });
};
