'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
      src: ['lib/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
      src: ['test/{,*/}*.js']
      }
    }
  });

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['test']);
};