# Laravel Translations Loader


[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/@kirschbaum-development/laravel-translations-loader)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://www.npmjs.com/package/@kirschbaum-development/laravel-translations-loader)

This package is a webpack loader to import your laravel translation files (PHP or JSON) into your JS bundle as JSON so you can use packages like [i18next](https://www.i18next.com/).

### Requirements

This package works with any version of laravel, as long as you are using [Laravel Mix](https://laravel.com/docs/5.6/mix) or any custom [webpack](https://webpack.js.org/) configuration, since this package is essentially a webpack loader.

### Installation

```bash
$ yarn add @kirschbaum-development/laravel-translations-loader --dev
```

or

```bash
$ npm install @kirschbaum-development/laravel-translations-loader --save-dev
```

### Usage

In your `app.js` file, just add the following import.

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

And so on, with all your languages and all your translation strings.

#### Load only JSON translations

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/json!@kirschbaum-development/laravel-translations-loader';
```

#### Load only PHP translation files

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/php!@kirschbaum-development/laravel-translations-loader';
```

***

### Useful packages to use with laravel-translations-loader

* [i18next](https://www.i18next.com/)
* [vue-i18next](https://github.com/panter/vue-i18next)
* [vue-i18n](https://github.com/kazupon/vue-i18n)
* [react-i18next](https://github.com/i18next/react-i18next)

***

### Example using [vue-i18n](https://github.com/kazupon/vue-i18n)

Notice you can directly pass the `languageBundle` object as a parameter into the `VueI18n` constructor.

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.Locale,
    messages: languageBundle,
})
```
