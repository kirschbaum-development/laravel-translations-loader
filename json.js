var path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const jsonLoader = require('./json-loader');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;
    let loaderPath = 'node_modules' + path.sep + '@kirschbaum-development' + path.sep + 'laravel-translations-loader' + path.sep + 'json.js';

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    if (path.dirname(this.resource).includes(path.dirname(loaderPath))) {
        baseDirectory = path.dirname(this.resource) + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep + 'resources' + path.sep + 'lang';
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    return "module.exports = " + JSON.stringify(
        jsonLoader.execute(baseDirectory, options, this)
    );
}
