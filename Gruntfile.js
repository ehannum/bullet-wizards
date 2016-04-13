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
          'Bullet Wizards Companion/www/css/index.css': 'res/phonegap.scss',
          'Bullet Wizards Companion/www/css/styles.css': 'res/styles.scss'
        }
      }
    },

    watch: {
      css: {
        files: 'res/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'res/*.js',
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
  grunt.registerTask('dev', ['concat', 'sass']);

};
