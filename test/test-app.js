'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('opencart:app', function () {

    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .withPrompts({opencartVersion: '2.0.2.0'})
            .on('end', done);
    });

    it('creates files', function (done) {
        assert.file([
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    after(function (done) {
        assert.file([
            'admin/',
            'catalog/',
            'image/',
            'install/',
            'system/',
            '.htaccess.txt',
            'config-dist.php',
            'crossdomain.xml',
            'index.php',
            'php.ini'
        ]);
    });

});