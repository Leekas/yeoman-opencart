'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    wrench = require('wrench'),
    mkdirp = require('mkdirp'),
    tarball = require('tarball-extract'),
    ncp = require('ncp').ncp,
    rmdir = require('rmdir'),
    fs = require('fs'),

    opencartRepoName = 'opencart',
    opencartArchiveUrl = 'https://github.com/opencart/opencart/archive/',
    opencartSrcDir = 'upload',
    opencartVersion = '2.0.2.0';

module.exports = yeoman.generators.Base.extend({

    prompting: function () {
        var done = this.async();

        // Yeoman user greeting.
        this.log(yosay(
            'Welcome to the Yeoman ' + chalk.red('Opencart') + ' generator!'
        ));

        // Version prompt.
        var prompts = [{
            name: 'opencartVersion',
            message: 'Any specific version you are looking for?',
            default: '2.0.2.0'
        }];

        // Get prompt answers.
        this.prompt(prompts, function (props) {
            this.props = props;
            opencartVersion = props.opencartVersion;
            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
        },

        download: function () {
            this.log('Downloading and setting up your Opencart application');
            var url = opencartArchiveUrl + opencartVersion + '.tar.gz';
            this.tarball(url, './', function (err) {
                if (err) {
                    return done(err);
                } else {
                    ncp(opencartRepoName + '-' + opencartVersion + '/' + opencartSrcDir, './', function (err) {
                        if (err) {
                            return console.error(err);
                        } else {
                            wrench.chmodSyncRecursive('system/cache/', '0777');
                            wrench.chmodSyncRecursive('system/logs/', '0777');
                            wrench.chmodSyncRecursive('system/download/', '0777');
                            wrench.chmodSyncRecursive('system/upload/', '0777');
                            wrench.chmodSyncRecursive('image/', '0777');
                            fs.chmod('config-dist.php', '0777');
                            fs.chmod('admin/config-dist.php', '0777');
                            rmdir(opencartRepoName + '-' + opencartVersion, function (err, dirs, files) {
                                if (err) return console.error(err);
                            });
                        }
                    });
                }
            });
        }

    }

});