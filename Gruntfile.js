module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    qunit: {
      all: ['test/index.html']
    },
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



  //File ordering task (sorts and combines)
  grunt.registerTask('sort', ['neuter']);

  // Testing tasks
  grunt.registerTask('test', ['jshint', 'sort', 'qunit']);

  // Default task.
  grunt.registerTask('default', ['sort', 'uglify']);

  //Build Task.
  grunt.registerTask('build', ['test', 'uglify']);

};