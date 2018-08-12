const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const loaderUtils = require('loader-utils');
const phpArrayParser = require('php-array-parser');

const phpLoader = {
    execute (baseDirectory, options) {
        var bundle = {};

        var directories;

        directories = fs.readdirSync(baseDirectory).filter((file) => {
            return fs.statSync(path.join(baseDirectory, file)).isDirectory();
        });


        directories.forEach((directory) => {
            var langDirectory = path.join(baseDirectory, directory);
            var files = files = fs.readdirSync(langDirectory).filter(function (file) {
                return path.extname(file) === '.php';
            });

            files.forEach((file) => {
                var content = fs.readFileSync(path.join(langDirectory, file), 'utf8');

                // Remove left part of return expression and any ending `?>`.
                const ret = content.indexOf('return') + 'return'.length
                content = content.substr(ret)
                content = content.replace(/\?>\s*$/, '_')

                let langObject = {}
                langObject[file.replace('.php', '')] = phpArrayParser.parse(content)

                if (typeof options.namespace !== 'undefined') {
                    if (typeof bundle[directory] === 'undefined') {
                        bundle[directory] = {};
                        bundle[directory][options.namespace] = langObject
                    } else {
                        bundle[directory][options.namespace] = _.extend(bundle[directory][options.namespace], langObject);
                    }

                    if (typeof options.parameters !== "undefined") {
                        bundle[directory][options.namespace] = bundle[directory][options.namespace].replace(/\:\w+/, options.parameters);
                    }
                } else {
                    if (typeof bundle[directory] === 'undefined') {
                        bundle[directory] = langObject;
                    } else {
                        bundle[directory] = _.extend(bundle[directory], langObject);
                    }

                    if (typeof options.parameters !== "undefined") {
                        bundle[directory] = this.replaceParameter(bundle[directory], options.parameters);
                    }
                }
            });
        });

        return bundle;
    },

    replaceParameter (object, replacement) {
        let objectAsString = JSON.stringify(object);
        objectAsString = objectAsString.replace(/\:(\w+)/, replacement);
        return JSON.parse(objectAsString);
    }
}

module.exports = phpLoader
