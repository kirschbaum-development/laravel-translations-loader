# Laravel Translations Loader

This package is a webpack loader to import your laravel translation files (PHP or JSON) into your JS bundle as JSON so you can use packages like [i18next](https://www.i18next.com/).

### Installation

```bash
$ yarn add @kirschbaum-development/laravel-translations-loader --dev
```

or

```bash
$ npm install @kirschbaum-development/laravel-translations-loader --save-dev
```

### Usage

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader';
```

This will load and parse all your language files, including PHP and JSON translations. The `languageBundle` will look something like this:

```json
{
    "en": {
        "auth": {
            "failed": "These credentials do not match our records."
        }
    },
    "es": {
        "auth": {
            "failed": "These credentials do not match our records."
        }
    }
}
```

And so on, with all your languages and all your translation string

##### JSON translation files

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/json!@kirschbaum-development/laravel-translations-loader';
```

##### PHP translation files

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/php!@kirschbaum-development/laravel-translations-loader';
```

##### JSON & PHP translation files

Not a problem.

```js
import _ from 'lodash';
import phpLanguageBundle from '@kirschbaum-development/laravel-translations-loader/php!@kirschbaum-development/laravel-translations-loader';
import jsonLanguageBundle from '@kirschbaum-development/laravel-translations-loader/json!@kirschbaum-development/laravel-translations-loader';

let languageBundle = _.merge(jsonLanguageBundle, phpLanguageBundle};
```

***

With your language bundle, you can now use with [vue-i18n](https://github.com/kazupon/vue-i18n), for example:

```js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'es', // you can get this from a global JS variable
    messages: languageBundle,
})

const app = new Vue({
    el: '#app',
    i18n: i18n
});
```
