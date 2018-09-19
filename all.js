const _ = require('lodash');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    if (path.dirname(this.resource) === path.dirname('node_modules/@kirschbaum-development/laravel-translations-loader/all.js')) {
        baseDirectory = path.dirname(this.resource) + "/../../../resources/lang";
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    const jsonContents = jsonLoader.execute(baseDirectory, options);
    const phpContents = phpLoader.execute(baseDirectory, options);
    const bundle = _.merge(phpContents, jsonContents);

    return "module.exports = " + JSON.stringify(bundle);
}
