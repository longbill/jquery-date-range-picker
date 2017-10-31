# jQuery Date Range Picker Plugin - Semantic UI Port

## Description

This plugin is a `Semantic UI` port based on the [jQuery Date Range Picker](https://github.com/longbill/jquery-date-range-picker) plugin

jQuery Date Range Picker is a jQuery plugin that allows user to select a date range.

* Requires jQuery 1.3.2+, Moment 2.8.1+
* Supports IE7+, Firefox, Chrome, Safari and other standard HTML5 browsers.
* Supports multi-language
* Fully CSS styled
* Written by Chunlong ( jszen.com )
* I accept further customization job if you require more functions. Please contact me via longbill.cn@gmail.com

### Changes Made compared to Original

- Added `Semantic UI` CSS and JS in `index.html`

- Removed `data-tooltip` attribute inside the date item as it generates a unwanted default tooltip the date items.

## [Documentation & Demo](http://longbill.github.io/jquery-date-range-picker/)

![screenshot](https://raw.github.com/longbill/jquery-date-range-picker/master/preview.jpg)

#### How to setup this project on your development machine
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
* How to generate minified (dist) files ?
```
gulp
```
* Above command will generate new files by reading from ```src``` folder

### Change log
* See [changelog](CHANGELOG.md)

### License
This date range picker plugin is under MIT LICENSE
