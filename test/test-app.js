'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('opencart:app', function () {

    before(function () {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .withPrompts({opencartVersion: '2.0.2.0'})
            .on('end', done);
    });

    it('creates project tempalate files', function () {
        assert.file([
            '.editorconfig',
            '.jshintrc'
        ]);
    });

});