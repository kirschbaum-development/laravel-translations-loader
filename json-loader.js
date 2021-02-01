let fs = require('fs');
let path = require('path');

const jsonLoader = {
    execute(baseDirectory, options, loader) {
        let bundle = {};

        files = fs.readdirSync(baseDirectory).filter((file) => {
            return path.extname(file) === '.json';
        });

        files.forEach((file) => {
            var lang = file.replace('.json', '');
            var filePath = path.join(baseDirectory, file);
            loader.addDependency(filePath);
            var content = fs.readFileSync(filePath);

            if (typeof options.namespace !== 'undefined') {
                bundle[lang] = {};
                bundle[lang][options.namespace] = JSON.parse(content);
            } else {
                bundle[lang] = JSON.parse(content);
            }

            if (typeof options.parameters !== "undefined") {
                bundle[lang] = this.replaceParameter(bundle[lang], options.parameters);
            }
        });

        return bundle;
    },

    replaceParameter(object, replacement) {
        let objectAsString = JSON.stringify(object);
        objectAsString = objectAsString.replace(/\:(\w+)/g, replacement);
        return JSON.parse(objectAsString);
    }
}

module.exports = jsonLoader
