let fs = require('fs');
let path = require('path');

const jsonLoader = {
    execute(baseDirectory, options) {
        let bundle = {};

        files = fs.readdirSync(baseDirectory).filter(function (file) {
            return path.extname(file) === '.json';
        });

        files.forEach(function (file) {
            var lang = file.replace('.json', '');
            var content = fs.readFileSync(path.join(baseDirectory, file));

            if (typeof options.namespace !== 'undefined') {
                bundle[lang] = {};
                bundle[lang][options.namespace] = JSON.parse(content);
            } else {
                bundle[lang] = JSON.parse(content);
            }
        });

        return bundle;
    }
}

module.exports = jsonLoader
