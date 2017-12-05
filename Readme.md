# textlint-rule-title-case

[![textlint fixable rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)
[![Build Status](https://travis-ci.org/sapegin/textlint-rule-title-case.svg)](https://travis-ci.org/sapegin/textlint-rule-title-case)
[![npm](https://img.shields.io/npm/v/textlint-rule-title-case.svg)](https://www.npmjs.com/package/textlint-rule-title-case)

[Textlint](https://github.com/textlint/textlint) rule to ensure that titles are using [AP](https://en.wikipedia.org/wiki/AP_Stylebook)/[APA](https://en.wikipedia.org/wiki/APA_style) style. Based on [ap-style-title-case](https://github.com/zeke/ap-style-title-case).

The rules are:

* Always capitalize the first word, even if it’s a stopword.
* Always capitalize the last word, even if it’s a stopword.
* Lowercase these words: _a an and at but by for in nor of on or so the to up yet_.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1v150k2d0A1o2F240930/textlint-rule-title-case.png)

## Installation

```shell
npm install textlint-rule-title-case
```

Then enable the rule in your `.textlintrc`:

```js
{
  "rules": {
    "title-case": true
  }
}
```

## Usage

```shell
textlint --fix --rule title-case Readme.md
```

## Configuration

You can configure the rule in your `.textlintrc`:

```js
{
  "rules": {
    "title-case": {
      // Always use this casing for these words
      "exclusions": [
        "npm",
        "webpack"
      ],
    }
  }
}
```

Read more about [configuring textlint](https://github.com/textlint/textlint/blob/master/docs/configuring.md).

## Other textlint rules

* [textlint-rule-apostrophe](https://github.com/sapegin/textlint-rule-apostrophe) — correct apostrophe usage
* [textlint-rule-diacritics](https://github.com/sapegin/textlint-rule-diacritics) — words with diacritics
* [textlint-rule-stop-words](https://github.com/sapegin/textlint-rule-stop-words) — filler words, buzzwords and clichés
* [textlint-rule-terminology](https://github.com/sapegin/textlint-rule-terminology) — tech terms

## Change log

The change log can be found on the [Releases page](https://github.com/sapegin/textlint-rule-title-case/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/sapegin/textlint-rule-title-case/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
