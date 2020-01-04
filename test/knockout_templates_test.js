'use strict';

var grunt = require('grunt');

exports.knockout_templates = {
    custom_options: function(test) {
        var actual = grunt.file.read('tmp/page.html');
        var expected = grunt.file.read('test/page-expected.html');
        test.equal(actual, expected, 'Templates should be inserted into a page');
        test.done();
    },
};