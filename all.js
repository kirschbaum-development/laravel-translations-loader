const _ = require('lodash');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');

module.exports = function (indexContent) {
    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';
    const jsonContents = jsonLoader.execute(baseDirectory);
    const phpContents = phpLoader.execute(baseDirectory);
    const bundle = _.merge(phpContents, jsonContents);

    return "module.exports = " + JSON.stringify(bundle);
}
