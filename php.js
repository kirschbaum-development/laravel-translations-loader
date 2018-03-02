const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const loaderUtils = require('loader-utils');
const phpArrayParser = require('php-array-parser');

module.exports = function (indexContent) {
    var bundle = {};
    var baseDirectory = path.dirname(this.resource);
    var directories;

    directories = fs.readdirSync(baseDirectory).filter(function (file) {
        return fs.statSync(path.join(baseDirectory, file)).isDirectory();
    });

    directories.forEach(function (directory) {
        var langDirectory = path.join(baseDirectory, directory);
        var files = files = fs.readdirSync(langDirectory).filter(function (file) {
            return path.extname(file) === '.php';
        });

        files.forEach(function (file) {
            var content = fs.readFileSync(path.join(langDirectory, file), 'utf8');

            // Remove left part of return expression and any ending `?>`.
            const ret = content.indexOf('return') + 'return'.length
            content = content.substr(ret)
            content = content.replace(/\?>\s*$/, '_')

            if (typeof bundle[directory] === 'undefined') {
                bundle[directory] = parser.parse(content);
            } else {
                bundle[directory] = _.extend(bundle[directory], parser.parse(content));
            }
        });
    });

    return "module.exports = " + JSON.stringify(bundle);
}
