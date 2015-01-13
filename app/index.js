'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
module.exports = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');
    this.log(
      this.yeoman +
      '\nGenerador Frontend para Duegraffic\n\n');
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

  },

  app: function () {

    this.config.save();

    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
    this.copy('jshintrc', '.jshintrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');

    this.template('README.md', 'README.md');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');

  },

  projectfiles: function () {

    // Folders
    this.mkdir('app');
    this.mkdir('app/img');
    this.mkdir('app/jade');
    this.mkdir('app/js');
    this.mkdir('app/less');
    this.mkdir('public');

    // Jade
    this.copy('jade/index.jade', 'app/jade/index.jade');
    this.copy('jade/template/layout.jade', 'app/jade/template/layout.jade');
    this.copy('jade/template/menu.jade', 'app/jade/template/menu.jade');

    // Less
    this.copy('less/main.less', 'app/less/main.less');
    this.copy('less/variables.less', 'app/less/variables.less');

    // Js
    this.copy('js/main.js', 'app/js/main.js');

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }

});
