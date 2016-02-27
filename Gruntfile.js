module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/wizards.js',
          'src/phonegap.js'
        ],
        dest: 'Bullet Wizards Companion/www/js/index.js'
      }
    },

    uglify: {
      build: {
        src: 'Bullet Wizards Companion/www/js/index.js',
        dest: 'Bullet Wizards Companion/www/js/index.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'Bullet Wizards Companion/www/css/index.css': ['res/phonegap.scss', 'res/styles.scss']
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
