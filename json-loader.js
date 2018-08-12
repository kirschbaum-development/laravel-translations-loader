let fs = require('fs');
let path = require('path');

const jsonLoader = {
    execute(baseDirectory, options) {
        let bundle = {};

        files = fs.readdirSync(baseDirectory).filter((file) => {
            return path.extname(file) === '.json';
        });

        files.forEach((file) => {
            var lang = file.replace('.json', '');
            var content = fs.readFileSync(path.join(baseDirectory, file));

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
        objectAsString = objectAsString.replace(/\:(\w+)/, replacement);
        return JSON.parse(objectAsString);
    }
}

module.exports = jsonLoader
