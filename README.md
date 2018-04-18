# jQuery Date Range Picker Plugin

[![CDNJS](https://img.shields.io/cdnjs/v/jquery-date-range-picker.svg)](https://cdnjs.com/libraries/jquery-date-range-picker)
[![Bower Version](https://img.shields.io/bower/v/jquery-date-range-picker.svg?maxAge=3600)]()
[![License](https://img.shields.io/github/license/longbill/jquery-date-range-picker.svg?maxAge=2592000)]()

jQuery Date Range Picker is a jQuery plugin that allows a user to select a date range.

* Requires jQuery 1.7+, Moment 2.8.1+
* Supports IE7+, Firefox, Chrome, Safari and other standard HTML5 browsers
* Supports multi-language
* Fully CSS styled
* Written by Chunlong ( jszen.com )
* I accept further customization job if you require more functions. Please contact me via longbill.cn@gmail.com

## Documentation & Demo
Documentation and demonstrations can be found here: https://longbill.github.io/jquery-date-range-picker

![screenshot](https://raw.github.com/longbill/jquery-date-range-picker/master/preview.jpg)

## Setup on development machine
* Install node.js [Ubuntu/Mac](https://github.com/creationix/nvm) , [Windows](https://nodejs.org/en/download/)
* Update npm to latest version
```
npm install -g npm
```
* Install gulp v3.9.1 (global install)
```
npm install -g gulp@3.9.1
```
* Clone this project
```
git clone https://github.com/longbill/jquery-date-range-picker.git
cd jquery-date-range-picker
```
* Install local dependencies
```
npm install
```
* Generate new minified (dist) files by reading from the `src` folder
```
gulp
```

* Build and tag a new version using [`npm version` command](https://docs.npmjs.com/cli/version) according to [Semantic Versioning](https://semver.org) best practices.

```
npm version <patch|minor|major>
```

## Change log
* See [changelog](CHANGELOG.md)

## License
This date range picker plugin is under MIT LICENSE
