$(function()
{
	
	/*
	define a new language named "custom"
	*/

	$.dateRangePickerLanguages['custom'] = 
	{
		'selected': 'Choosed:',
		'days': 'Days',
		'apply': 'Close',
		'week-1' : 'Mon',
		'week-2' : 'Tue',
		'week-3' : 'Wed',
		'week-4' : 'Thu',
		'week-5' : 'Fri',
		'week-6' : 'Sat',
		'week-7' : 'Sun',
		'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
		'shortcuts' : 'Shortcuts',
		'past': 'Past',
		'7days' : '7days',
		'14days' : '14days',
		'30days' : '30days',
		'previous' : 'Previous',
		'prev-week' : 'Week',
		'prev-month' : 'Month',
		'prev-quarter' : 'Quarter',
		'prev-year' : 'Year',
		'less-than' : 'Date range should longer than %d days',
		'more-than' : 'Date range should less than %d days',
		'default-more' : 'Please select a date range longer than %d days',
		'default-less' : 'Please select a date range less than %d days',
		'default-range' : 'Please select a date range between %d and %d days',
		'default-default': 'This is costom language'
	};
	
	$('#date-range0').dateRangePicker();
	$('#date-range1').dateRangePicker(
	{
		startOfWeek: 'monday',
    	separator : ' ~ ',
    	format: 'DD.MM.YYYY HH:mm',
    	autoClose: false,
		time: {
			enabled: true
		}
	});
	
	$('#date-range2').dateRangePicker();

	$('#date-range3').dateRangePicker(
	{
		language:'cn'
	});

	$('#date-range4').dateRangePicker(
	{
		language:'en'
	});

	$('#date-range105').dateRangePicker(
	{
		showCustomValues: true,
		customValueLabel: 'Dynamic Ranges',
		customValues:
		[
			{
				name: 'MTD',
				value: 'Month To Date'
			},
			{
				name: 'YTD',
				value: 'Year To Date'
			}
		]
	})

	$('#date-range100').dateRangePicker(
	{
		shortcuts : null,
		startOfWeek: 'sunday',
		language:'en',
		customShortcuts: 
		[
			//if return an array of two dates, it will select the date range between the two dates
			{
				name: 'this week',
				dates : function()
				{
					var start = moment().day(0).toDate();
					var end = moment().day(6).toDate();
					// start.setDate(1);
					// end.setDate(30);
					return [start,end];
				}
			},
			//if only return an array of one date, it will display the month which containing the date. and it will not select any date range
			{
				name: 'Oct 2014',
				dates : function()
				{
					//move calendars to show this date's month and next month
					var movetodate = moment('2014-10','YYYY-MM').toDate();
					return [movetodate];
				}
			}
		]
	}).bind('datepicker-apply',function(event,obj)
	{
		console.log(obj);
	});

	$('#date-range101').dateRangePicker(
	{
		shortcuts : 
		{
			'next-days': [3,5,7],
			'next': ['week','month','year']
		}
	});

	$('#date-range102').dateRangePicker(
	{
		shortcuts : 
		{
			'prev-days': [3,5,7],
			'prev': ['week','month','year'],
			'next-days':null,
			'next':null
		}
	});

	$('#date-range104').dateRangePicker(
	{
		showShortcuts:false
	});

	$('#date-range103').dateRangePicker(
	{
		autoClose: true
	});

	$('#date-range4-1').dateRangePicker(
	{
		language: 'custom'
	});

	$('#date-range5').dateRangePicker(
	{
		startDate: '2014-11-20'
	});

	$('#date-range6').dateRangePicker(
	{
		startDate: '2013-01-10',
		endDate: '2013-02-10'
	});

	$('#date-range7').dateRangePicker(
	{
		minDays: 3,
		maxDays: 7
	});

	$('#date-range8').dateRangePicker(
	{
		startOfWeek: 'monday'
	});

	$('#date-range9').dateRangePicker(
	{
		getValue: function()
		{
			return this.innerHTML;
		},
		setValue: function(s)
		{
			this.innerHTML = s;
		}
	});

	$('#two-inputs').dateRangePicker(
	{
		separator : ' to ',
		getValue: function()
		{
			if ($('#date-range200').val() && $('#date-range201').val() )
				return $('#date-range200').val() + ' to ' + $('#date-range201').val();
			else
				return '';
		},
		setValue: function(s,s1,s2)
		{
			$('#date-range200').val(s1);
			$('#date-range201').val(s2);
		}
	});

	$('#date-range10').dateRangePicker(
	{
		format: 'dddd MMM Do, YYYY'  //more formats at http://momentjs.com/docs/#/displaying/format/
	});

	$('#date-range11').dateRangePicker(
	{
		separator : ' ~ '
	}).bind('datepicker-change',function(e,r)
	{
		try
		{
			console.log(r);
		}catch(e){}
	});

	$('#date-range12').dateRangePicker(
	{
		inline:true,
		container: '#date-range12-container', 
		alwaysOpen:true 
	});

	$('#date-range13').dateRangePicker(
	{
		autoClose: true,
		singleDate : true,
		showShortcuts: false 
	});

	$('#date-range14').dateRangePicker(
	{
		batchMode: 'week',
		showShortcuts: false
	});

  $('#date-range14-2').dateRangePicker(
	{
		batchMode: 'week-range',
		showShortcuts: false
	});

	$('#date-range15').dateRangePicker(
	{
		showShortcuts: false,
		beforeShowDay: function(t)
		{
			var valid = !(t.getDay() == 0 || t.getDay() == 6);  //disable saturday and sunday
			var _class = '';
			var _tooltip = valid ? '' : 'weekends are disabled';
			return [valid,_class,_tooltip];
		}
	});

	$('#date-range16').dateRangePicker(
	{
		showShortcuts: false,
		format: 'YYYY-MM-DD'
	}).bind('datepicker-change', function(evt, obj) {
		alert('date1: ' + obj.date1 + ' / date2: ' + obj.date2);
	});

	$('#date-range16-open').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').open();
	});

	$('#date-range16-close').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').close();
	});

	$('#date-range16-set').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').setDateRange('2013-11-20','2014-08-25');
	});

	$('#date-range16-set-silent').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').setDateRange('2014-11-03','2015-02-12', true);
	});

	$('#date-range16-clear').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').clear();
	});

	$('#date-range16-destroy').click(function(evt)
	{
		evt.stopPropagation();
		$('#date-range16').data('dateRangePicker').destroy();
	});

	$('#date-range17').dateRangePicker(
	{
		stickyMonths: true,
		startDate: '2013-01-10',
		endDate: '2013-05-10'
	});

});
