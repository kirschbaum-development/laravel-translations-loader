# Laravel i18n loader

This package is a webpack loader to import your laravel translation files (PHP or JSON) into your JS bundle so you can use packages like [i18next](https://www.i18next.com/).

### Installation

```
$ yarn add laravel-i18n-loader
```

or

```
$ npm install laravel-i18n-loader --save
```

### Usage

First thing you need to do is to create a file called `index.js` in your `resources/lang` folder. This file should be empty.

##### JSON translation files

```
import languageBundle from 'laravel-i18n-loader/json?!./../../lang`;
```

Note: You may have to adjust the relative path to your language folder.

##### PHP translation files

```
import languageBundle from 'laravel-i18n-loader/php?!./../../lang`;
```

Note: You may have to adjust the relative path to your language folder.

##### JSON & PHP translation files

Not a problem.

```
import _ from 'lodash';
import phpLanguageBundle from 'laravel-i18n-loader/php?!./../../lang`;
import jsonLanguageBundle from 'laravel-i18n-loader/json?!./../../lang`;

let languageBundle = _.merge(jsonLanguageBundle, phpLanguageBundle};
```
