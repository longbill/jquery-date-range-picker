// daterangepicker.js
// version : 1.2
// author : Chunlong Liu
// license : MIT
// jszen.com

(function($)
{

	$.dateRangePickerLanguages = 
	{
		'cn':
		{
			'selected': '已选择:',
			'day':'天',
			'days': '天',
			'apply': '确定',
			'week-1' : '一',
			'week-2' : '二',
			'week-3' : '三',
			'week-4' : '四',
			'week-5' : '五',
			'week-6' : '六',
			'week-7' : '日',
			'month-name': ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			'shortcuts' : '快捷选择',
			'past': '过去',
			'following':'将来',
			'previous' : '&nbsp;&nbsp;&nbsp;',
			'prev-week' : '上周',
			'prev-month' : '上个月',
			'prev-year' : '去年',
			'next': '&nbsp;&nbsp;&nbsp;',
			'next-week':'下周',
			'next-month':'下个月',
			'next-year':'明年',
			'less-than' : '所选日期范围不能大于%d天',
			'more-than' : '所选日期范围不能小于%d天',
			'default-more' : '请选择大于%d天的日期范围',
			'default-less' : '请选择小于%d天的日期范围',
			'default-range' : '请选择%d天到%d天的日期范围',
			'default-default': '请选择一个日期范围'
		},
		'en':
		{
			'selected': 'Selected:',
			'day':'Day',
			'days': 'Days',
			'apply': 'Close',
			'week-1' : 'MO',
			'week-2' : 'TU',
			'week-3' : 'WE',
			'week-4' : 'TH',
			'week-5' : 'FR',
			'week-6' : 'SA',
			'week-7' : 'SU',
			'month-name': ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
			'shortcuts' : 'Shortcuts',
			'past': 'Past',
			'following':'Following',
			'previous' : 'Previous',
			'prev-week' : 'Week',
			'prev-month' : 'Month',
			'prev-year' : 'Year',
			'next':'Next',
			'next-week':'Week',
			'next-month':'Month',
			'next-year':'Year',
			'less-than' : 'Date range should not be more than %d days',
			'more-than' : 'Date range should not be less than %d days',
			'default-more' : 'Please select a date range longer than %d days',
			'default-less' : 'Please select a date range less than %d days',
			'default-range' : 'Please select a date range between %d and %d days',
			'default-default': 'Please select a date range'
		}
	};


	if (window['moment'] === undefined)
	{
		alert('Please import moment.js before daterangepicker.js');
		return;
	}

	$.fn.dateRangePicker = function(opt)
	{
		if (!opt) opt = {};
		opt = $.extend(
		{
			autoClose: false,
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
			shortcuts: 
			{
				//'prev-days': [1,3,5,7],
				'next-days': [3,5,7],
				//'prev' : ['week','month','year'],
				'next' : ['week','month','year']
			},
			customShortcuts : []
		},opt);

		opt.start = false;
		opt.end = false;

		if (opt.startDate && typeof opt.startDate == 'string') opt.startDate = moment(opt.startDate,opt.format).toDate();
		if (opt.endDate && typeof opt.endDate == 'string') opt.endDate = moment(opt.endDate,opt.format).toDate();



		var langs = getLanguages();
		var box;

		$(this).unbind('.datepicker').bind('click.datepicker',function(evt)
		{
			var initted = false;
			evt.stopPropagation();
			var self = this;

			if ($(this).data('date-picker-openned'))
			{
				closeDatePicker();
				return;
			}
			$(this).data('date-picker-openned',true);
			
			
			box = createDom().hide();
			$(document.body).append(box);


			

			var offset = $(this).offset();
			if (offset.left < 460) //left to right
			{
				box.css(
				{
					top: offset.top+$(this).outerHeight() + parseInt( 0 + $('body').css('border-top'),10 ),
					left: offset.left
				});
			}
			else
			{
				box.css(
				{
					top: offset.top+$(this).outerHeight() + parseInt( 0 + $('body').css('border-top'),10 ),
					left: offset.left + $(self).width() - box.width() - 16
				});
			}

			var defaultTime = new Date();
			if (opt.startDate && compare_month(defaultTime,opt.startDate) < 0 ) defaultTime = moment(opt.startDate).toDate();
			if (opt.endDate && compare_month(nextMonth(defaultTime),opt.endDate) > 0 ) defaultTime = prevMonth(moment(opt.endDate).toDate());


			showMonth(defaultTime,'month1');
			showMonth(nextMonth(defaultTime),'month2');
			
			//showSelectedInfo();
			
			box.slideDown(200);

			
			var defaultTopText = '';
			if (opt.minDays && opt.maxDays)
				defaultTopText = lang('default-range');
			else if (opt.minDays)
				defaultTopText = lang('default-more');
			else if (opt.maxDays)
				defaultTopText = lang('default-less');
			else
				defaultTopText = lang('default-default');
			
			box.find('.default-top').html( defaultTopText.replace(/\%d/,opt.minDays).replace(/\%d/,opt.maxDays));
			

			
			var defaults = opt.getValue.call(self).split( opt.separator );

			if (defaults && defaults.length >= 2)
			{
				var ___format = opt.format;
				if (___format.match(/Do/))
				{
					___format = ___format.replace(/Do/,'D');
					defaults[0] = defaults[0].replace(/(\d+)(th|nd|st)/,'$1');
					defaults[1] = defaults[1].replace(/(\d+)(th|nd|st)/,'$1');
				}
				setDateRange(moment(defaults[0], ___format).toDate(),moment(defaults[1], ___format).toDate());
			}

			setTimeout(function()
			{
				initted = true;
			},0);
			
			// if (opt.start && opt.end)
			// {
			// 	setDateRange(new Date(opt.start), new Date(opt.end));
			// }
			
			box.click(function(evt)
			{
				evt.stopPropagation();
			});
			
			$(document).unbind('.datepicker').bind('click.datepicker',function()
			{
				//if (box.find('.apply-btn').hasClass('disabled')) return;
				closeDatePicker();

			});
			
			box.find('.next').click(function()
			{
				var isMonth2 = $(this).parents('table').hasClass('month2');
				var month = isMonth2 ? opt.month2 : opt.month1;
				month = nextMonth(month);
				if (!isMonth2 && compare_month(month,opt.month2) >= 0) return;
				showMonth(month,isMonth2 ? 'month2' : 'month1');
				showGap();
			});
			
			box.find('.prev').click(function()
			{
				var isMonth2 = $(this).parents('table').hasClass('month2');
				var month = isMonth2 ? opt.month2 : opt.month1;
				month = prevMonth(month);
				//if (isMonth2 && month.getFullYear()+''+month.getMonth() <= opt.month1.getFullYear()+''+opt.month1.getMonth()) return;
				if (isMonth2 && compare_month(month,opt.month1) <= 0) return;
				showMonth(month,isMonth2 ? 'month2' : 'month1');
				showGap();
			});
			
			
			box.bind('click',function(evt)
			{
				if ($(evt.target).hasClass('day') && $(evt.target).hasClass('toMonth'))
				{
					dayClicked($(evt.target));
				}
			});

			box.attr('unselectable', 'on')
			.css('user-select', 'none')
			.bind('selectstart', function(e)
			{
				e.preventDefault(); return false; 
			});
			
			box.find('.apply-btn').click(function()
			{
				// if (opt.start && opt.end)
				// {
				// 	opt.setValue.call(self,getDateString(new Date(opt.start))+ opt.separator +getDateString(new Date(opt.end)));
				// }
				closeDatePicker();
				var dateRange = getDateString(new Date(opt.start))+ opt.separator +getDateString(new Date(opt.end));
				$(self).trigger('datepicker-apply',
				{
					'value': dateRange,
					'date1' : new Date(opt.start),
					'date2' : new Date(opt.end)
				});
			});
			
			box.find('[shortcut]').click(function()
			{
				var shortcut = $(this).attr('shortcut');
				var end = new Date(),start = false;
				if (shortcut.indexOf('day') != -1)
				{
					var day = parseInt(shortcut.split(',',2)[1],10);
					start = new Date(new Date().getTime() + 86400000*day);
					end = new Date(end.getTime() + 86400000*(day>0?1:-1) );
				}
				else if (shortcut.indexOf('week')!= -1)
				{
					var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;

					if (dir == 1)
						var stopDay = opt.startOfWeek == 'monday' ? 1 : 0;
					else
						var stopDay = opt.startOfWeek == 'monday' ? 0 : 6;
					
					end = new Date(end.getTime() - 86400000);
					while(end.getDay() != stopDay) end = new Date(end.getTime() + dir*86400000);
					start = new Date(end.getTime() + dir*86400000*6);
				}
				else if (shortcut.indexOf('month') != -1)
				{
					var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;
					if (dir == 1) 
						start = nextMonth(end);
					else
						start = prevMonth(end);
					start.setDate(1);
					end = nextMonth(start);
					end.setDate(1);
					end = new Date(end.getTime() - 86400000);
				}
				else if (shortcut.indexOf('year') != -1)
				{
					var dir = shortcut.indexOf('prev,') != -1 ? -1 : 1;
					start = new Date();
					start.setFullYear(end.getFullYear() + dir);
					start.setMonth(0);
					start.setDate(1);
					end.setFullYear(end.getFullYear() + dir);
					end.setMonth(11);
					end.setDate(31);
				}
				else if (shortcut == 'custom')
				{
					var name = $(this).html();
					if (opt.customShortcuts && opt.customShortcuts.length > 0)
					{
						for(var i=0;i<opt.customShortcuts.length;i++)
						{
							var sh = opt.customShortcuts[i];
							if (sh.name == name)
							{
								var data = [];
								// try
								// {
									data = sh['dates'].call();
								//}catch(e){}
								if (data && data.length == 2)
								{
									start = data[0];
									end = data[1];
								}
								
								// if only one date is specified then just move calendars there
								// move calendars to show this date's month and next months
								if (data && data.length == 1)
								{
									movetodate = data[0];
									showMonth(movetodate,'month1');
									showMonth(nextMonth(movetodate),'month2');
									showGap();
								}
								
								break;
							}
						}
					}
				}
				if (start && end)
				{
					setDateRange(start,end);
					checkSelectionValid();
				}
			});
			
			
			function dayClicked(day)
			{
				if (day.hasClass('invalid')) return;
				var time = day.attr('time');
				day.addClass('checked');
				if ((opt.start && opt.end) || (!opt.start && !opt.end) )
				{
					opt.start = time;
					opt.end = false;
				}
				else if (opt.start)
				{
					opt.end = time;
				}
				if (opt.start && opt.end && opt.start > opt.end)
				{
					var tmp = opt.end;
					opt.end = opt.start;
					opt.start = tmp;
				}
				opt.start = parseInt(opt.start);
				opt.end = parseInt(opt.end);

				checkSelectionValid();

				showSelectedInfo();
				showSelectedDays();
			}
			
			function checkSelectionValid()
			{
				var days = Math.ceil( (opt.end - opt.start) / 86400000 ) + 1;
				if ( opt.maxDays && days > opt.maxDays)
				{
					opt.start = false;
					opt.end = false;
					box.find('.day').removeClass('checked');
					box.find('.top-bar').removeClass('normal').addClass('error').find('.error-top').html( lang('less-than').replace('%d',opt.maxDays) );
				}
				else if ( opt.minDays && days < opt.minDays)
				{
					opt.start = false;
					opt.end = false;
					box.find('.day').removeClass('checked');
					box.find('.top-bar').removeClass('normal').addClass('error').find('.error-top').html( lang('more-than').replace('%d',opt.minDays) );
				}
				else
				{
					if (opt.start || opt.end)
						box.find('.top-bar').removeClass('error').addClass('normal');
					else
						box.find('.top-bar').removeClass('error').removeClass('normal');
				}

				if (opt.start && opt.end)
				{
					box.find('.apply-btn').removeClass('disabled');
				}
				else
				{
					box.find('.apply-btn').addClass('disabled');
				}
			}

			function showSelectedInfo()
			{
				box.find('.start-day').html('...');
				box.find('.end-day').html('...');
				box.find('.selected-days').hide();
				if (opt.start)
				{
					box.find('.start-day').html(getDateString(new Date(parseInt(opt.start))));
				}
				if (opt.end)
				{
					box.find('.end-day').html(getDateString(new Date(parseInt(opt.end))));
				}
				
				if (opt.start && opt.end)
				{
					box.find('.selected-days').show().find('.selected-days-num').html(Math.round((opt.end-opt.start)/86400000)+1);
					box.find('.apply-btn').removeClass('disabled');
					var dateRange = getDateString(new Date(opt.start))+ opt.separator +getDateString(new Date(opt.end));
					opt.setValue.call(self,dateRange, getDateString(new Date(opt.start)), getDateString(new Date(opt.end)));
					
					if (initted)
					{
						$(self).trigger('datepicker-change',
						{
							'value': dateRange,
							'date1' : new Date(opt.start),
							'date2' : new Date(opt.end)
						});
						if (opt.autoClose) closeDatePicker();
					}
				}
				else
				{
					box.find('.apply-btn').addClass('disabled');
				}
			}
			
			function setDateRange(date1,date2)
			{
				if (date1.getTime() > date2.getTime())
				{
					var tmp = date2;
					date2 = date1;
					date1 = tmp;
					tmp = null;
				}
				var valid = true;
				if (opt.startDate && compare_day(date1,opt.startDate) < 0) valid = false;
				if (opt.endDate && compare_day(date2,opt.endDate) > 0) valid = false;
				if (!valid)
				{
					showMonth(opt.startDate,'month1');
					showMonth(nextMonth(opt.startDate),'month2');
					showGap();
					return;
				}
				
				opt.start = date1.getTime();
				opt.end = date2.getTime();
				if (compare_month(date1,date2) == 0)
				{
					date2 = nextMonth(date1);
				}
				showMonth(date1,'month1');
				showMonth(date2,'month2');
				showGap();

				showSelectedInfo();
			}
			
			
			function showSelectedDays()
			{
				if (!opt.start && !opt.end) return;
				box.find('.day').each(function()
				{
					if (!$(this).hasClass('toMonth')) return;
					var time = $(this).attr('time');
					if (
						(opt.start && opt.end && opt.end >= time && opt.start <= time )
						|| ( opt.start && !opt.end && opt.start == time )
					)
					{
						$(this).addClass('checked');
					}
					else
					{
						$(this).removeClass('checked');
					}
				});
			}
			
			
			function showMonth(date,month)
			{
				date = moment(date).toDate();
				var monthName = nameMonth(date.getMonth());
				box.find('.'+month+' .month-name').html(monthName+' '+date.getFullYear());
				box.find('.'+month+' tbody').html(createMonthHTML(date));
				opt[month] = date;
			}
			
			function nameMonth(m)
			{
				return lang('month-name')[m];
			}
			
			function getDateString(d)
			{
				return moment(d).format(opt.format);
			}
			
			
			function showGap()
			{
				showSelectedDays();
				var m1 = parseInt(moment(opt.month1).format('YYYYMM'));
				var m2 = parseInt(moment(opt.month2).format('YYYYMM'));
				var p = Math.abs(m1 - m2);
				var shouldShow = (p > 1 && p !=89);
				if (shouldShow)
					box.find('.gap').show();
				else
					box.find('.gap').hide();
			}
			
			function closeDatePicker()
			{
				$(box).slideUp(200,function()
				{
					box.remove();
					$(self).data('date-picker-openned',false);
				});
				$(document).unbind('.datepicker');
				$(self).trigger('datepicker-close');
			}
			
		});
		
		return this;

		function compare_month(m1,m2)
		{
			var p = parseInt(moment(m1).format('YYYYMM')) - parseInt(moment(m2).format('YYYYMM'));
			if (p > 0 ) return 1;
			if (p == 0) return 0;
			return -1;
		}

		function compare_day(m1,m2)
		{
			var p = parseInt(moment(m1).format('YYYYMMDD')) - parseInt(moment(m2).format('YYYYMMDD'));
			if (p > 0 ) return 1;
			if (p == 0) return 0;
			return -1;
		}
		
		function nextMonth(month)
		{
			month = moment(month).toDate();
			var toMonth = month.getMonth();
			while(month.getMonth() == toMonth) month = new Date(month.getTime()+86400000);
			return month;
		}
		
		function prevMonth(month)
		{
			month = moment(month).toDate();
			var toMonth = month.getMonth();
			while(month.getMonth() == toMonth) month = new Date(month.getTime()-86400000);
			return month;
		}
		
		
		function createDom()
		{
			var html = '<div class="date-picker-wrapper">'
				+'<div class="top-bar">\
					<div class="normal-top">\
						<span style="color:#333">'+lang('selected')+' </span> <b class="start-day">...</b> '+opt.separator+' <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> '+lang('days')+')</i>\
					</div>\
					<div class="error-top">error</div>\
					<div class="default-top">default</div>\
					<input type="button" class="apply-btn disabled" value="'+lang('apply')+'" />\
				</div>'
				+'<div class="month-wrapper">'
				+'<table class="month1" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;"><span class="prev">&lt;</span></th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;"><span class="next">&gt;</span></th></tr>'
				+'<tr class="week-name">'+getWeekHead()+'</thead><tbody></tbody></table>'
				+'<div class="gap">'+getGapHTML()+'</div><table class="month2" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;"><span class="prev">&lt;</span></th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;"><span class="next">&gt;</span></th></tr><tr class="week-name">'+getWeekHead()+'</thead><tbody></tbody></table>'
				+'<div style="clear:both;height:0;font-size:0;"></div>'
				+'</div>';

			if (opt.showShortcuts)
			{
				html += '<div class="footer"><b>'+lang('shortcuts')+'</b>';

				var data = opt.shortcuts;
				if (data)
				{
					if (data['prev-days'] && data['prev-days'].length > 0)
					{
						html += '&nbsp;<span class="prev-days">'+lang('past');
						for(var i=0;i<data['prev-days'].length; i++)
						{
							var name = data['prev-days'][i];
							name += (data['prev-days'][i] > 1) ? lang('days') : lang('day');
							html += ' <a href="javascript:;" shortcut="day,-'+data['prev-days'][i]+'">'+name+'</a>';
						}
						html+='</span>';
					}

					if (data['next-days'] && data['next-days'].length > 0)
					{
						html += '&nbsp;<span class="next-days">'+lang('following');
						for(var i=0;i<data['next-days'].length; i++)
						{
							var name = data['next-days'][i];
							name += (data['next-days'][i] > 1) ? lang('days') : lang('day');
							html += ' <a href="javascript:;" shortcut="day,'+data['next-days'][i]+'">'+name+'</a>';
						}
						html+= '</span>';
					}

					if (data['prev'] && data['prev'].length > 0)
					{
						html += '&nbsp;<span class="prev-buttons">'+lang('previous');
						for(var i=0;i<data['prev'].length; i++)
						{
							var name = lang('prev-'+data['prev'][i]);
							html += ' <a href="javascript:;" shortcut="prev,'+data['prev'][i]+'">'+name+'</a>';
						}
						html+='</span>';
					}

					if (data['next'] && data['next'].length > 0)
					{
						html += '&nbsp;<span class="next-buttons">'+lang('next');
						for(var i=0;i<data['next'].length; i++)
						{
							var name = lang('next-'+data['next'][i]);
							html += ' <a href="javascript:;" shortcut="next,'+data['next'][i]+'">'+name+'</a>';
						}
						html+='</span>';
					}
				}

				if (opt.customShortcuts)
				{
					for(var i=0;i<opt.customShortcuts.length; i++)
					{
						var sh = opt.customShortcuts[i];
						html+= '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">'+sh.name+'</a></span>';
					}
				}

				html +='</div>';
			}
			html += '</div>';


			return $(html);
		}

		function getWeekHead()
		{
			if (opt.startOfWeek == 'monday')
			{
				return '<th>'+lang('week-1')+'</th>\
					<th>'+lang('week-2')+'</th>\
					<th>'+lang('week-3')+'</th>\
					<th>'+lang('week-4')+'</th>\
					<th>'+lang('week-5')+'</th>\
					<th>'+lang('week-6')+'</th>\
					<th>'+lang('week-7')+'</th>';
			}
			else
			{
				return '<th>'+lang('week-7')+'</th>\
					<th>'+lang('week-1')+'</th>\
					<th>'+lang('week-2')+'</th>\
					<th>'+lang('week-3')+'</th>\
					<th>'+lang('week-4')+'</th>\
					<th>'+lang('week-5')+'</th>\
					<th>'+lang('week-6')+'</th>';
			}
		}

		function getGapHTML()
		{
			var html = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'];
			for(var i=0;i<13;i++)
			{
				html.push('<div class="gap-line">\
					<div class="gap-1"></div>\
					<div class="gap-2"></div>\
					<div class="gap-3"></div>\
				</div>');
			}
			html.push('</div>');
			return html.join('');
		}
		
		function createMonthHTML(d)
		{
			var days = [];
			d.setDate(1);
			var lastMonth = new Date(d.getTime() - 86400000);
			var now = new Date();

			if (d.getDay() > 0)
			{
				for(var i = d.getDay(); i>0; i--)
				{
					var day = new Date(d.getTime() - 86400000*i);
					var valid = true;
					if (opt.startDate && compare_day(day,opt.startDate) < 0) valid = false;
					if (opt.endDate && compare_day(day,opt.endDate) > 0) valid = false;
					days.push({type:'lastMonth',day: day.getDate(),time:day.getTime(), valid:valid });
				}
			}
			var toMonth = d.getMonth();
			for(var i=0; i<40; i++)
			{
				var today = moment(d).add('days', i).toDate();
				var valid = true;
				if (opt.startDate && compare_day(today,opt.startDate) < 0) valid = false;
				if (opt.endDate && compare_day(today,opt.endDate) > 0) valid = false;
				days.push({type: today.getMonth() == toMonth ? 'toMonth' : 'nextMonth',day: today.getDate(),time:today.getTime(), valid:valid });
			}
			var html = [];
			for(var week=0; week<6; week++)
			{
				if (days[week*7].type == 'nextMonth') break;
				html.push('<tr>');
				for(var day = 0; day<7; day++)
				{
					var _day = (opt.startOfWeek == 'monday') ? day+1 : day;
					var today = days[week*7+_day];
					var highlightToday = moment(today.time).format('L') == moment(now).format('L');
					html.push('<td><div time="'+today.time+'" class="day '+today.type+' '+(today.valid ? 'valid' : 'invalid')+' '+(highlightToday?'real-today':'')+'">'+today.day+'</div></td>');
				}
				html.push('</tr>');
			}
			return html.join('');
		}

		function getLanguages()
		{
			if (opt.language == 'auto')
			{
				var language = navigator.language ? navigator.language : navigator.browserLanguage;
				if (!language) return $.dateRangePickerLanguages['en'];
				var language = language.toLowerCase();
				for(var key in $.dateRangePickerLanguages)
				{
					if (language.indexOf(key) != -1)
					{
						return $.dateRangePickerLanguages[key];
					}
				}
				return $.dateRangePickerLanguages['en'];
			}
			else if ( opt.language && opt.language in $.dateRangePickerLanguages)
			{
				return $.dateRangePickerLanguages[opt.language];
			}
			else
			{
				return $.dateRangePickerLanguages['en'];
			}
		}

		function lang(t)
		{
			return (t in langs)? langs[t] : t;
		}

		
	};
})(jQuery);
