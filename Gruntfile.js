'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-yaml-validator');

  grunt.initConfig({

    yaml_validator: {
      defaults: {
        src: [ 'packs/*.yaml' ]
      }
    }

  });

  // Default task.
  grunt.registerTask('default', 'yaml_validator');

  // Travis CI task.
  grunt.registerTask('travis', 'yaml_validator');

};
