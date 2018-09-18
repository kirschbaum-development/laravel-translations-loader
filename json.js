var path = require("path");
const fs = require("fs");
const loaderUtils = require('loader-utils');
const jsonLoader = require('./json-loader');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    if (path.dirname(this.resource) === path.dirname('node_modules/@kirschbaum-development/laravel-translations-loader/json.js')) {
        baseDirectory = path.dirname(this.resource) + "/../../../resources/lang";
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    return "module.exports = " + JSON.stringify(
        jsonLoader.execute(baseDirectory, options)
    );
}
