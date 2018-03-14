const _ = require('lodash');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');

module.exports = function (indexContent) {
    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';
    const jsonContents = jsonLoader.execute(baseDirectory);
    const phpContents = jsonLoader.execute(baseDirectory);
    const bundle = _.merge(jsonContents, phpContents);

    return "module.exports = " + JSON.stringify(bundle);
}
