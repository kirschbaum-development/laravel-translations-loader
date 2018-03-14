var path = require("path");
var fs = require("fs");
var loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    var bundle = {};
    var baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';

    files = fs.readdirSync(baseDirectory).filter(function (file) {
        return path.extname(file) === '.json';
    });

    files.forEach(function (file) {
        var lang = file.replace('.json', '');
        var content = fs.readFileSync(path.join(baseDirectory, file));

        bundle[lang] = JSON.parse(content);
    });

    return "module.exports = " + JSON.stringify(bundle);
}
