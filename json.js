var path = require("path");
const fs = require("fs");
const loaderUtils = require('loader-utils');
const jsonLoader = require('./json-loader');

module.exports = function (indexContent) {
    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';

    return "module.exports = " + JSON.stringify(
        jsonLoader.execute(baseDirectory, loaderUtils.parseQuery(this.query))
    );
}
