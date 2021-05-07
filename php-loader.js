const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const loaderUtils = require('loader-utils');
const phpArrayParser = require('php-array-parser');
const klaw = require('klaw-sync');

const phpLoader = {
    execute (baseDirectory, options, loader) {
        var bundle = {};
        var directories;

        if (! path.isAbsolute(baseDirectory)) {
            baseDirectory = path.resolve(baseDirectory);
        }

        directories = fs.readdirSync(baseDirectory).filter((file) => {
            return fs.statSync(path.join(baseDirectory, file)).isDirectory();
        });

        directories.forEach((directory) => {
            var langDirectory = path.join(baseDirectory, directory);

            klaw(langDirectory, {
                nodir: true
            }).filter((file) => {
                return path.extname(file.path) === '.php';
            }).filter((file) => {
                if (! options || typeof options.includeOnly === 'undefined') {
                    return true;
                }

                var filename = path.basename(file.path, '.php');
                return options.includeOnly.includes(filename);
            }).filter((file) => {
                if (! options || typeof options.exclude === 'undefined') {
                    return true;
                }

                var filename = path.basename(file.path, '.php');
                return !options.exclude.includes(filename);
            }).forEach((file) => {
                var filename = file.path.split(langDirectory + path.sep)[1];
                var filename = filename.replace('\\', '/');
                var filePath = path.join(langDirectory, filename);
                loader.addDependency(filePath);
                var content = fs.readFileSync(filePath, 'utf8');

                // Remove left part of return expression and any ending `?>`.
                const ret = content.indexOf('return') + 'return'.length
                content = content.substr(ret)
                content = content.replace(/\?>\s*$/, '_')

                let langObject = {}

                try {
                    let parsedContent = phpArrayParser.parse(content);
                    langObject[filename.replace('.php', '')] = parsedContent;
                } catch (e) {
                    console.warn('The file "' + file.path + '" could not be parsed', e.message);
                }

                if (typeof options.namespace !== 'undefined') {
                    if (typeof bundle[directory] === 'undefined') {
                        bundle[directory] = {};
                        bundle[directory][options.namespace] = langObject
                    } else {
                        bundle[directory][options.namespace] = _.extend(bundle[directory][options.namespace], langObject);
                    }

                    if (typeof options.parameters !== "undefined") {
                        bundle[directory][options.namespace] = this.replaceParameter(bundle[directory][options.namespace], options.parameters);
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
        objectAsString = objectAsString.replace(/\:(\w+)/g, replacement);
        return JSON.parse(objectAsString);
    }
}

module.exports = phpLoader
