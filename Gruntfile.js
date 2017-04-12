module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['scripts/_source/jquery.min.js', 'scripts/_source/bootstrap.min.js', 'scripts/_source/holder.min.js', 'scripts/_source/jquery.fitvids.js', 'scripts/_source/jquery.fancybox.min.js', 'scripts/_source/main.js'],
        dest: 'scripts/all.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'scripts/all.js': ['scripts/all.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['scripts/_source/*.js'],
        tasks: ['concat'],
        options: {
          livereload: true,
        },
      },
    },
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks.
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('dev', ['concat', 'watch']);

};
