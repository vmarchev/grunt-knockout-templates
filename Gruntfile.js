/*
 * grunt-knockout-templates
 * https://github.com/vmarchev/grunt-knockout-templates)
 *
 * Copyright (c) 2020 vmarchev
 * Licensed under the GNU, GPL licenses.
 */

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: "",
            }
        },
        copy: {
            test: {
                src: ['test/page.html'],
                dest: 'tmp',
                expand: true,
                flatten: true
            }
        },
        clean: {
            tests: ['tmp']
        },
        knockout_templates: {
            custom_options: {
                src: ['tmp/page.html'],
                prefix: '/tmp'
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'copy', 'knockout_templates', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'test']);
};