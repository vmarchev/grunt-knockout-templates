/*
 * grunt-knockout-templates
 * https://github.com/vmarchev/grunt-knockout-templates
 *
 * Copyright (c) 2020 vmarchev
 * Licensed under the GNU GPL license.
 */

'use strict';

module.exports = function(grunt) {
    var path = require('path');
    var templateRegExp = new RegExp("<div data-bind=\"dev-template:(.*?)}\"></div>", "g");
    var urlRegExp = new RegExp("url:'(.*?)'");
    var dataRegExp = new RegExp("data:(.*?)(,|})");

    grunt.registerMultiTask('knockout_templates',
        'Plugin allows to replace html templates which load dynamically to a static version', function() {
            this.data.src.forEach(function(page) {
                var files = grunt.file.expand(page);

                files.forEach(function(filepath) {
                    grunt.log.writeln("File: " + filepath + "\n");

                    var htmlFile = grunt.file.read(filepath);
                    var templates = htmlFile.match(templateRegExp);

                    if (templates) {
                        templates.forEach(function(template) {
                            var config = template.split(' ')
                                                 .join('')
                                                 .replace('dev-template:', '');
                            grunt.log.writeln("template: " + template);

                            var data = config.match(dataRegExp);
                            var templateToInsert = "<div";
                            //it is ok to have just simple html template without view model
                            if (data != null) {
                                templateToInsert += " data-bind=\"with: " + data[1] + "\"";
                                grunt.log.writeln("data: " + data[1]);
                            }
                            templateToInsert += '>';

                            var url = config.match(urlRegExp)[1];
                            var templateFilePath = path.join('.' + url);
                            grunt.log.writeln("url: " + templateFilePath);

                            var templateFile = grunt.file.read(templateFilePath);
                            templateToInsert += templateFile;
                            templateToInsert += "</div>";

                            htmlFile = htmlFile.replace(template, templateToInsert);
                            grunt.log.writeln("-----");
                        });

                        grunt.file.write(filepath, htmlFile);
                    } else {
                        grunt.log.writeln("templates were not found. Skip file");
                        grunt.log.writeln("-----");
                    }
                });
            });
        });
};