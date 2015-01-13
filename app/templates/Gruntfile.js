'use strict';
module.exports = function(grunt){

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'public',
    bower: 'bower_components'
  };

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),
    ptl: appConfig,

    // Watch
    watch:{
      options: {
        livereload: true
      },
      less: {
        files: ['<%= ptl.app %>/less/**/*.less'],
        tasks: ['less']
      },
      jade: {
        files: ['<%= ptl.app %>/jade/**/*.jade'],
        tasks: ['jade']
      },
      js:{
        files: ['<%= ptl.app %>/js/**/*.js'],
        tasks: ['jshint','uglify']
      },
      json: {
        files: ['data.json'],
        tasks: ['jade']
      },
    },

    // Clean
    clean: {
      css: ['<%= ptl.dist %>/css'],
      js: ['<%= ptl.dist %>/js'],
      img: ['<%= ptl.dist %>/img'],
      html:['<%= ptl.dist %>/*.html']
    },

    // Copy
    copy: {
      dist: {
        files: [
          {
            cwd : '<%= ptl.bower %>/font-awesome',
            src : ['fonts/*.*'],
            dest : '<%= ptl.dist %>/',
            dot: true,
            expand  : true
          },
          {
            cwd : '<%= ptl.app %>/img',
            src : ['**.*'],
            dest : '<%= ptl.dist %>/img/',
            dot: true,
            expand  : true
          }
        ]
      }
    },

    // Jade
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true,
          data: function() {
            return require('./data.json');
          }
        },
        files:[
          {
            cwd: '<%= ptl.app %>/jade',
            src: ['*.jade'],
            dest: '<%= ptl.dist %>',
            expand: true,
            ext: '.html'
          }
        ]
      }
    },

    // Less compile css
    less: {
      development: {
        options: { paths: ['<%= ptl.app %>/less'] },
        files: { '<%= ptl.dist %>/css/style.css': '<%= ptl.app %>/less/main.less' }
      }
    },

    // jshint
    jshint: {
      files: ['<%= ptl.app %>/js/main.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('cool-reporter')
      }
    },

    // Javascript fusion
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      development: {
        files: {
          '<%= ptl.dist %>/js/app.js': [
            '<%= ptl.bower %>/jquery/dist/jquery.min.js',
            '<%= ptl.bower %>/bootstrap/dist/js/bootstrap.min.js',
            '<%= ptl.app %>/js/main.js'
          ]
        }
      }
    },

    // Grunt server settings
    connect: {

      livereload: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: 35729,
          open: true,
          middleware: function (connect) {
            return [connect.static('./public') ];
          }
        }
      }

    }
  });

  grunt.registerTask('default', ['clean','copy','jade','less','jshint','uglify','connect:livereload','watch']);

};
