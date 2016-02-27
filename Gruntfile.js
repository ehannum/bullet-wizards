module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/wizards.js'
        ],
        dest: 'public/src/build.js'
      }
    },

    uglify: {
      build: {
        src: 'public/src/build.js',
        dest: 'public/src/build.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/res/styles.css': 'res/styles.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
  grunt.registerTask('dev', ['concat', 'sass']);

};
