const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const phpLoader = require('./php-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    if (path.dirname(this.resource) === path.dirname('node_modules/@kirschbaum-development/laravel-translations-loader/php.js')) {
        baseDirectory = path.dirname(this.resource) + "/../../../resources/lang";
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    return "module.exports = " + JSON.stringify(
        phpLoader.execute(baseDirectory, options)
    );
}
