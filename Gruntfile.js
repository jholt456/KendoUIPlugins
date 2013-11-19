module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

   jshint: {
        options: {
          browser: true,
          sub: true,

          globals: {
            jQuery: true
          }
        },
        all: ['js/*.js']
      },
    neuter: {
      application: {
        options: {
          template:'{%= src %};',
          basePath:'js/'
        },
        src: 'js/*.js',
        dest:  'build/kendo-ext.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'build/kendo-ext-min.js': ['build/kendo-ext.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Testing tasks
  grunt.registerTask('test', ['jshint']);

  //
  grunt.registerTask('sort', ['neuter']);

  // Default task.
  grunt.registerTask('default', ['sort', 'uglify']);

  //Build Task.
  grunt.registerTask('build', ['test', 'sort', 'uglify']);

};