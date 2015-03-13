#jQuery Date Range Picker Plugin#

v0.0.5

jQuery Date Range Picker is a jQuery plugin that allows user to select a date range.

* Requires jQuery 1.3.2+, Moment 2.2.0+
* Supports IE6+, Firefox, Chrome, Safari and other standard HTML5 browsers.
* Supports multi-language
* Fully CSS styled
* Written by Chunlong ( jszen.com )
* I accept further customization job if you require more functions. Please contact me via longbill.cn@gmail.com

Live demostration and documentation is [HERE](http://jszen.com/jquery-date-range-picker-plugin.4.html)

![screenshot](https://raw.github.com/lzwme/jquery-date-range-picker/master/preview.jpg)
![screenshot](https://raw.github.com/lzwme/jquery-date-range-picker/master/preview-bootstrap.jpg)


##what's new in 0.0.5##

* enable crontrol by script
* enable batch mode ( select week or month by one click )
* fixed some position issues
* fixed some time related bugs


##Configuration##

Usage: 
```javascript
$('#dom-id').dateRangePicker(configObject);
```

The default configuration object is:
```javascript
{
	format: 'YYYY-MM-DD',
	separator: ' to ',
	language: 'auto',
	startOfWeek: 'sunday',// or monday
	getValue: function()
	{
		return this.value;
	},
	setValue: function(s)
	{
		this.value = s;
	},
	startDate: false,
	endDate: false,
	minDays: 0,
	maxDays: 0,
	showShortcuts: true,
	time: {
		enabled: false
	},
	shortcuts: 
	{
		//'prev-days': [1,3,5,7],
		'next-days': [3,5,7],
		//'prev' : ['week','month','year'],
		'next' : ['week','month','year']
	},
	customShortcuts : [],
	inline: false,
	container: 'body', 
	alwaysOpen: false,
	singleDate: false,
	lookBehind: false,
	batchMode: false,
	duration: 200,
	stickyMonths: false,
	defaultTime: new Date(),
	beforeShowDay: [function]
}
```

You can use the following keys in the configObject to overwrite the default configuration:

<b>format (String)</b>
<i style="display:block; margin-left:2em;">The date format string used for Moment.
click <a href="http://momentjs.com/docs/#/displaying/format/" target=_blank>here</a> to see Moment documentation</i>

<b>separator (String)</b>
<i style="display:block; margin-left:2em;">The separator string used between date strings</i>

<b>language (String)</b>
<i style="display:block; margin-left:2em;">pre-defined languages are "en" and "cn", you can define your own 
language then set this to the name of new language.
You can also set this to "auto" to make it auto detect browser language.</i>

<b>startOfWeek (String)</b>
<i style="display:block; margin-left:2em;">"sunday" or "monday"</i>

<b>getValue (Function)</b>
<i style="display:block; margin-left:2em;">This function is called when get date range string from DOM
When it is called, the context of this function is set to the datepicker DOM</i>

<b>setValue (Function)</b>
<i style="display:block; margin-left:2em;">This function is called when set date range string to DOM</i>

<b>startDate (String or false)</b>
<i style="display:block; margin-left:2em;">This string defines the earliest date which is allowed for the user, same format as `format`</i>

<b>endDate (String or false)</b>
<i style="display:block; margin-left:2em;">This string defines the latest date which is allowed for the user, same format as `format`</i>

<b>minDays (Number)</b>
<i style="display:block; margin-left:2em;">This number defines the minimum days of the selected range
if this is 0, means do not limit minimum days</i>

<b>maxDays (Number)</b>
<i style="display:block; margin-left:2em;">This number defines the maximum days of the selected range
if this is 0, means do not limit maximum days</i>

<b>showShortcuts (Boolean)</b>
<i style="display:block; margin-left:2em;">hide or show shortcuts area</i>	

<b>time (Object)</b>
<i style="display:block; margin-left:2em;">If enabled adds time selection controls.</i>	

<b>shortcuts (Object)</b>
<i style="display:block; margin-left:2em;">define the shortcuts buttons. there are some built in shortcuts, see source code</i>	

<b>customShortcuts (Array)</b>
<i style="display:block; margin-left:2em;">define custom shortcut buttons. see demo.js</i>	

<b>inline (Boolean)</b>
<i>whether to render the date range picker dom in inline mode instead of overlay mode, if set to true, please set `container` too</i>

<b>container (String, css selector || DOM Object)</b>
<i>where should the date range picker dom should be renderred to</i>
	
<b>alwaysOpen (Boolean)</b>
<i>if you use inline mode, you may want the date range picker widget to be renderred when the page loads. set this to true will also hide the "close" button</i>

<b>singleDate (Boolean)</b>
<i>choose a single date instead of a date range.</i>

<b>batchMode (false / 'week' / 'month')</b>
<i> auto batch select mode </i>
<i> false (default), week, month, week-range, month-range</i>

<b>beforeShowDay (Function)</b>
<i>A function that takes a date as a parameter and must return an array with:
[0]: true/false indicating whether or not this date is selectable
[1]: a CSS class name to add to the date's cell or "" for the default presentation
[2]: an optional popup tooltip for this date
The function is called for each day in the datepicker before it is displayed.</i>


##Events##

Three events will be triggered on the date range picker DOM
```javascript
$('#dom-id')
.dateRangePicker()
.bind('datepicker-change',function(event,obj)
{
	console.log(obj);
	// obj will be something like this:
	// {
	// 		date1: (Date object of the earlier date),
	// 		date2: (Date object of the later date),
	//	 	value: "2013-06-05 to 2013-06-07"
	// }
})
.bind('datepicker-apply',function(event,obj)
{
	console.log(obj);
})
.bind('datepicker-close',function()
{
	console.log('close');
});
```

###APIs###

after you called  $(dom).dateRangePicker();
```javascript
$(dom).data('dateRangePicker')
	.setDateRange('2013-11-20','2013-11-25');  //set date range, two date strings should follow the `format` in config object
	.clear(); 	// clear date range
	.close(); 	// close date range picker overlay
	.open();	// open date range picker overlay
	.destroy();	// destroy all date range picker related things
```
