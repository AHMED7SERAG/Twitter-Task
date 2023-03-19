/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/assets/calendars/js/jquery.calendars-ar-EG.js":
/*!*****************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars-ar-EG.js ***!
  \*****************************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   Arabic localisation for Gregorian/Julian calendars for jQuery.
   Mahmoud Khaled -- mahmoud.khaled@badrit.com
   NOTE: monthNames are the new months names */
(function ($) {
  'use strict';

  $.calendars.calendars.gregorian.prototype.regionalOptions['ar-EG'] = {
    name: 'Gregorian',
    epochs: ['BCE', 'CE'],
    monthNames: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونية', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    dayNamesMin: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    digits: null,
    dateFormat: 'yyyy/MM/dd',
    firstDay: 6,
    isRTL: true
  };
  if ($.calendars.calendars.julian) {
    $.calendars.calendars.julian.prototype.regionalOptions['ar-EG'] = $.calendars.calendars.gregorian.prototype.regionalOptions['ar-EG'];
  }
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.all.js":
/*!***************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.all.js ***!
  \***************************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*! http://keith-wood.name/calendars.html
   Calendars localisations. */
/* http://keith-wood.name/calendars.html
   Calendars for jQuery v2.1.0.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  function Calendars() {
    this.regionalOptions = [];
    /** Localised values.
    	@memberof Calendars
    	@property {string} [invalidCalendar='Calendar {0} not found']
    		Error message for an unknown calendar.
    	@property {string} [invalidDate='Invalid {0} date']
    		Error message for an invalid date for this calendar.
    	@property {string} [invalidMonth='Invalid {0} month']
    		Error message for an invalid month for this calendar.
    	@property {string} [invalidYear='Invalid {0} year']
    		Error message for an invalid year for this calendar.
    	@property {string} [differentCalendars='Cannot mix {0} and {1} dates']
    		Error message for mixing different calendars. */
    this.regionalOptions[''] = {
      invalidCalendar: 'Calendar {0} not found',
      invalidDate: 'Invalid {0} date',
      invalidMonth: 'Invalid {0} month',
      invalidYear: 'Invalid {0} year',
      differentCalendars: 'Cannot mix {0} and {1} dates'
    };
    this.local = this.regionalOptions[''];
    this.calendars = {};
    this._localCals = {};
  }

  /** Create the calendars plugin.
  	<p>Provides support for various world calendars in a consistent manner.</p>
  	<p>Use the global instance, <code>$.calendars</code>, to access the functionality.</p>
  	@class Calendars
  	@example $.calendars.instance('julian').newDate(2014, 12, 25) */
  $.extend(Calendars.prototype, {
    /** Obtain a calendar implementation and localisation.
    	@memberof Calendars
    	@param {string} [name='gregorian'] The name of the calendar, e.g. 'gregorian', 'persian', 'islamic'.
    	@param {string} [language=''] The language code to use for localisation (default is English).
    	@return {Calendar} The calendar and localisation.
    	@throws Error if calendar not found.
    	@example $.calendars.instance()
    $.calendars.instance('persian')
    $.calendars.instance('hebrew', 'he') */
    instance: function instance(name, language) {
      name = (name || 'gregorian').toLowerCase();
      language = language || '';
      var cal = this._localCals[name + '-' + language];
      if (!cal && this.calendars[name]) {
        cal = new this.calendars[name](language);
        this._localCals[name + '-' + language] = cal;
      }
      if (!cal) {
        throw (this.local.invalidCalendar || this.regionalOptions[''].invalidCalendar).replace(/\{0\}/, name);
      }
      return cal;
    },
    /** Create a new date - for today if no other parameters given.
    	@memberof Calendars
    	@param {CDate|number} [year] The date to copy or the year for the date.
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@param {BaseCalendar|string} [calendar='gregorian'] The underlying calendar or the name of the calendar.
    	@param {string} [language=''] The language to use for localisation (default English).
    	@return {CDate} The new date.
    	@throws Error if an invalid date.
    	@example $.calendars.newDate()
    $.calendars.newDate(otherDate)
    $.calendars.newDate(2001, 1, 1)
    $.calendars.newDate(1379, 10, 12, 'persian') */
    newDate: function newDate(year, month, day, calendar, language) {
      calendar = (typeof year !== 'undefined' && year !== null && year.year ? year.calendar() : typeof calendar === 'string' ? this.instance(calendar, language) : calendar) || this.instance();
      return calendar.newDate(year, month, day);
    },
    /** A simple digit substitution function for localising numbers via the
    	{@linkcode GregorianCalendar.regionalOptions|Calendar digits} option.
    	@memberof Calendars
    	@param {string[]} digits The substitute digits, for 0 through 9.
    	@return {CalendarsDigits} The substitution function.
    	@example digits: $.calendars.substituteDigits(['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']) */
    substituteDigits: function substituteDigits(digits) {
      return function (value) {
        return (value + '').replace(/[0-9]/g, function (digit) {
          return digits[digit];
        });
      };
    },
    /** Digit substitution function for localising Chinese style numbers via the
    	{@linkcode GregorianCalendar.regionalOptions|Calendar digits} option.
    	@memberof Calendars
    	@param {string[]} digits The substitute digits, for 0 through 9.
    	@param {string[]} powers The characters denoting powers of 10, i.e. 1, 10, 100, 1000.
    	@return {CalendarsDigits} The substitution function.
    	@example digits: $.calendars.substituteChineseDigits(
    ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'], ['', '十', '百', '千']) */
    substituteChineseDigits: function substituteChineseDigits(digits, powers) {
      return function (value) {
        var localNumber = '';
        var power = 0;
        while (value > 0) {
          var units = value % 10;
          localNumber = (units === 0 ? '' : digits[units] + powers[power]) + localNumber;
          power++;
          value = Math.floor(value / 10);
        }
        if (localNumber.indexOf(digits[1] + powers[1]) === 0) {
          localNumber = localNumber.substr(1);
        }
        return localNumber || digits[0];
      };
    }
  });

  /** Generic date, based on a particular calendar.
  	@class CDate
  	@param {BaseCalendar} calendar The underlying calendar implementation.
  	@param {number} year The year for this date.
  	@param {number} month The month for this date.
  	@param {number} day The day for this date.
  	@return {CDate} The date object.
  	@throws Error if an invalid date. */
  function CDate(calendar, year, month, day) {
    this._calendar = calendar;
    this._year = year;
    this._month = month;
    this._day = day;
    if (this._calendar._validateLevel === 0 && !this._calendar.isValid(this._year, this._month, this._day)) {
      throw ($.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate).replace(/\{0\}/, this._calendar.local.name);
    }
  }

  /** Pad a numeric value with leading zeroes.
  	@private
  	@param {number} value The number to format.
  	@param {number} length The minimum length.
  	@return {string} The formatted number. */
  function pad(value, length) {
    value = '' + value;
    return '000000'.substring(0, length - value.length) + value;
  }
  $.extend(CDate.prototype, {
    /** Create a new date.
    	@memberof CDate
    	@param {CDate|number} [year] The date to copy or the year for the date (default to this date).
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@return {CDate} The new date.
    	@throws Error if an invalid date.
    	@example date.newDate()
    date.newDate(otherDate)
    date.newDate(2001, 1, 1) */
    newDate: function newDate(year, month, day) {
      return this._calendar.newDate(typeof year === 'undefined' || year === null ? this : year, month, day);
    },
    /** Set or retrieve the year for this date.
    	@memberof CDate
    	@param {number} [year] The year for the date.
    	@return {number|CDate} The date's year (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.year(2001)
    var year = date.year() */
    year: function year(_year) {
      return arguments.length === 0 ? this._year : this.set(_year, 'y');
    },
    /** Set or retrieve the month for this date.
    	@memberof CDate
    	@param {number} [month] The month for the date.
    	@return {number|CDate} The date's month (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.month(1)
    var month = date.month() */
    month: function month(_month) {
      return arguments.length === 0 ? this._month : this.set(_month, 'm');
    },
    /** Set or retrieve the day for this date.
    	@memberof CDate
    	@param {number} [day] The day for the date.
    	@return {number|CData} The date's day (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.day(1)
    var day = date.day() */
    day: function day(_day) {
      return arguments.length === 0 ? this._day : this.set(_day, 'd');
    },
    /** Set new values for this date.
    	@memberof CDate
    	@param {number} year The year for the date.
    	@param {number} month The month for the date.
    	@param {number} day The day for the date.
    	@return {CDate} The updated date.
    	@throws Error if an invalid date.
    	@example date.date(2001, 1, 1) */
    date: function date(year, month, day) {
      if (!this._calendar.isValid(year, month, day)) {
        throw ($.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate).replace(/\{0\}/, this._calendar.local.name);
      }
      this._year = year;
      this._month = month;
      this._day = day;
      return this;
    },
    /** Determine whether this date is in a leap year.
    	@memberof CDate
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@example if (date.leapYear()) ...*/
    leapYear: function leapYear() {
      return this._calendar.leapYear(this);
    },
    /** Retrieve the epoch designator for this date, e.g. BCE or CE.
    	@memberof CDate
    	@return {string} The current epoch.
    	@example var epoch = date.epoch() */
    epoch: function epoch() {
      return this._calendar.epoch(this);
    },
    /** Format the year, if not a simple sequential number.
    	@memberof CDate
    	@return {string} The formatted year.
    	@example var year = date.formatYear() */
    formatYear: function formatYear() {
      return this._calendar.formatYear(this);
    },
    /** Retrieve the month of the year for this date,
    	i.e. the month's position within a numbered year.
    	@memberof CDate
    	@return {number} The month of the year: <code>minMonth</code> to months per year.
    	@example var month = date.monthOfYear() */
    monthOfYear: function monthOfYear() {
      return this._calendar.monthOfYear(this);
    },
    /** Retrieve the week of the year for this date.
    	@memberof CDate
    	@return {number} The week of the year: 1 to weeks per year.
    	@example var week = date.weekOfYear() */
    weekOfYear: function weekOfYear() {
      return this._calendar.weekOfYear(this);
    },
    /** Retrieve the number of days in the year for this date.
    	@memberof CDate
    	@return {number} The number of days in this year.
    	@example var days = date.daysInYear() */
    daysInYear: function daysInYear() {
      return this._calendar.daysInYear(this);
    },
    /** Retrieve the day of the year for this date.
    	@memberof CDate
    	@return {number} The day of the year: 1 to days per year.
    	@example var doy = date.dayOfYear() */
    dayOfYear: function dayOfYear() {
      return this._calendar.dayOfYear(this);
    },
    /** Retrieve the number of days in the month for this date.
    	@memberof CDate
    	@return {number} The number of days.
    	@example var days = date.daysInMonth() */
    daysInMonth: function daysInMonth() {
      return this._calendar.daysInMonth(this);
    },
    /** Retrieve the day of the week for this date.
    	@memberof CDate
    	@return {number} The day of the week: 0 to number of days - 1.
    	@example var dow = date.dayOfWeek() */
    dayOfWeek: function dayOfWeek() {
      return this._calendar.dayOfWeek(this);
    },
    /** Determine whether this date is a week day.
    	@memberof CDate
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@example if (date.weekDay()) ... */
    weekDay: function weekDay() {
      return this._calendar.weekDay(this);
    },
    /** Retrieve additional information about this date.
    	@memberof CDate
    	@return {object} Additional information - contents depends on calendar.
    	@example var info = date.extraInfo() */
    extraInfo: function extraInfo() {
      return this._calendar.extraInfo(this);
    },
    /** Add period(s) to a date.
    	@memberof CDate
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date.
    	@example date.add(10, 'd') */
    add: function add(offset, period) {
      return this._calendar.add(this, offset, period);
    },
    /** Set a portion of the date.
    	@memberof CDate
    	@param {number} value The new value for the period.
    	@param {string} period One of 'y' for year, 'm' for month, 'd' for day.
    	@return {CDate} The updated date.
    	@throws Error if not a valid date.
    	@example date.set(10, 'd') */
    set: function set(value, period) {
      return this._calendar.set(this, value, period);
    },
    /** Compare this date to another date.
    	@memberof CDate
    	@param {CDate} date The other date.
    	@return {number} -1 if this date is before the other date,
    			0 if they are equal, or +1 if this date is after the other date.
    	@example if (date1.compareTo(date2) < 0) ... */
    compareTo: function compareTo(date) {
      if (this._calendar.name !== date._calendar.name) {
        throw ($.calendars.local.differentCalendars || $.calendars.regionalOptions[''].differentCalendars).replace(/\{0\}/, this._calendar.local.name).replace(/\{1\}/, date._calendar.local.name);
      }
      var c = this._year !== date._year ? this._year - date._year : this._month !== date._month ? this.monthOfYear() - date.monthOfYear() : this._day - date._day;
      return c === 0 ? 0 : c < 0 ? -1 : +1;
    },
    /** Retrieve the calendar backing this date.
    	@memberof CDate
    	@return {BaseCalendar} The calendar implementation.
    	@example var cal = date.calendar() */
    calendar: function calendar() {
      return this._calendar;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof CDate
    	@return {number} The equivalent Julian date.
    	@example var jd = date.toJD() */
    toJD: function toJD() {
      return this._calendar.toJD(this);
    },
    /** Create a new date from a Julian date.
    	@memberof CDate
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date.
    	@example var date2 = date1.fromJD(jd) */
    fromJD: function fromJD(jd) {
      return this._calendar.fromJD(jd);
    },
    /** Convert this date to a standard (Gregorian) JavaScript Date.
    	@memberof CDate
    	@return {Date} The equivalent JavaScript date.
    	@example var jsd = date.toJSDate() */
    toJSDate: function toJSDate() {
      return this._calendar.toJSDate(this);
    },
    /** Create a new date from a standard (Gregorian) JavaScript Date.
    	@memberof CDate
    	@param {Date} jsd The JavaScript date to convert.
    	@return {CDate} The equivalent date.
    	@example var date2 = date1.fromJSDate(jsd) */
    fromJSDate: function fromJSDate(jsd) {
      return this._calendar.fromJSDate(jsd);
    },
    /** Convert to a string for display.
    	@memberof CDate
    	@return {string} This date as a string. */
    toString: function toString() {
      return (this.year() < 0 ? '-' : '') + pad(Math.abs(this.year()), 4) + '-' + pad(this.month(), 2) + '-' + pad(this.day(), 2);
    }
  });

  /** Basic functionality for all calendars.
  	Other calendars should extend this:
  	<pre>OtherCalendar.prototype = new BaseCalendar();</pre>
  	@class BaseCalendar */
  function BaseCalendar() {
    this.shortYearCutoff = '+10';
  }
  $.extend(BaseCalendar.prototype, {
    _validateLevel: 0,
    // "Stack" to turn validation on/off

    /** Create a new date within this calendar - today if no parameters given.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to duplicate or the year for the date.
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@return {CDate} The new date.
    	@throws Error if not a valid date or a different calendar is used.
    	@example var date = calendar.newDate(2014, 1, 26)
    var date2 = calendar.newDate(date1)
    var today = calendar.newDate() */
    newDate: function newDate(year, month, day) {
      if (typeof year === 'undefined' || year === null) {
        return this.today();
      }
      if (year.year) {
        this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
        day = year.day();
        month = year.month();
        year = year.year();
      }
      return new CDate(this, year, month, day);
    },
    /** Create a new date for today.
    	@memberof BaseCalendar
    	@return {CDate} Today's date.
    	@example var today = calendar.today() */
    today: function today() {
      return this.fromJSDate(new Date());
    },
    /** Retrieve the epoch designator for this date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {string} The current epoch.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var epoch = calendar.epoch(date) 
    var epoch = calendar.epoch(2014) */
    epoch: function epoch(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return date.year() < 0 ? this.local.epochs[0] : this.local.epochs[1];
    },
    /** Format the year, if not a simple sequential number
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to format or the year to format.
    	@return {string} The formatted year.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var year = calendar.formatYear(date)
    var year = calendar.formatYear(2014) */
    formatYear: function formatYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return (date.year() < 0 ? '-' : '') + pad(Math.abs(date.year()), 4);
    },
    /** Retrieve the number of months in a year.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of months.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var months = calendar.monthsInYear(date)
    var months = calendar.monthsInYear(2014) */
    monthsInYear: function monthsInYear(year) {
      this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return 12;
    },
    /** Calculate the month's ordinal position within the year -
    	for those calendars that don't start at month 1!
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@return {number} The ordinal position, starting from <code>minMonth</code>.
    	@throws Error if an invalid year/month or a different calendar is used.
    	@example var pos = calendar.monthOfYear(date)
    var pos = calendar.monthOfYear(2014, 7) */
    monthOfYear: function monthOfYear(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return (date.month() + this.monthsInYear(date) - this.firstMonth) % this.monthsInYear(date) + this.minMonth;
    },
    /** Calculate actual month from ordinal position, starting from <code>minMonth</code>.
    	@memberof BaseCalendar
    	@param {number} year The year to examine.
    	@param {number} ord The month's ordinal position.
    	@return {number} The month's number.
    	@throws Error if an invalid year/month.
    	@example var month = calendar.fromMonthOfYear(2014, 7) */
    fromMonthOfYear: function fromMonthOfYear(year, ord) {
      var m = (ord + this.firstMonth - 2 * this.minMonth) % this.monthsInYear(year) + this.minMonth;
      this._validate(year, m, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return m;
    },
    /** Retrieve the number of days in a year.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of days.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var days = calendar.daysInYear(date)
    var days = calendar.daysInYear(2014) */
    daysInYear: function daysInYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return this.leapYear(date) ? 366 : 365;
    },
    /** Retrieve the day of the year for a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {number} The day of the year: 1 to days per year.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var doy = calendar.dayOfYear(date)
    var doy = calendar.dayOfYear(2014, 7, 1) */
    dayOfYear: function dayOfYear(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return date.toJD() - this.newDate(date.year(), this.fromMonthOfYear(date.year(), this.minMonth), this.minDay).toJD() + 1;
    },
    /** Retrieve the number of days in a week.
    	@memberof BaseCalendar
    	@return {number} The number of days.
    	@example var days = calendar.daysInWeek() */
    daysInWeek: function daysInWeek() {
      return 7;
    },
    /** Retrieve the day of the week for a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {number} The day of the week: 0 to number of days - 1.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var dow = calendar.dayOfWeek(date)
    var dow = calendar.dayOfWeek(2014, 1, 26) */
    dayOfWeek: function dayOfWeek(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return (Math.floor(this.toJD(date)) + 2) % this.daysInWeek();
    },
    /** Retrieve additional information about a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {object} Additional information - content depends on calendar.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var info = calendar.extraInfo(date)
    var info = calendar.extraInfo(2014, 1, 26) */
    extraInfo: function extraInfo(year, month, day) {
      this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return {};
    },
    /** Add period(s) to a date.
    	Cater for no year zero.
    	@memberof BaseCalendar
    	@param {CDate} date The starting date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date.
    	@throws Error if a different calendar is used.
    	@example calendar.add(date, 10, 'd') */
    add: function add(date, offset, period) {
      this._validate(date, this.minMonth, this.minDay, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return this._correctAdd(date, this._add(date, offset, period), offset, period);
    },
    /** Add period(s) to a date.
    	@memberof BaseCalendar
    	@private
    	@param {CDate} date The starting date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {number[]} The updated date as year, month, and day. */
    _add: function _add(date, offset, period) {
      this._validateLevel++;
      var d;
      if (period === 'd' || period === 'w') {
        var jd = date.toJD() + offset * (period === 'w' ? this.daysInWeek() : 1);
        d = date.calendar().fromJD(jd);
        this._validateLevel--;
        return [d.year(), d.month(), d.day()];
      }
      try {
        var y = date.year() + (period === 'y' ? offset : 0);
        var m = date.monthOfYear() + (period === 'm' ? offset : 0);
        d = date.day();
        var resyncYearMonth = function resyncYearMonth(calendar) {
          while (m < calendar.minMonth) {
            y--;
            m += calendar.monthsInYear(y);
          }
          var yearMonths = calendar.monthsInYear(y);
          while (m > yearMonths - 1 + calendar.minMonth) {
            y++;
            m -= yearMonths;
            yearMonths = calendar.monthsInYear(y);
          }
        };
        if (period === 'y') {
          if (date.month() !== this.fromMonthOfYear(y, m)) {
            // Hebrew
            m = this.newDate(y, date.month(), this.minDay).monthOfYear();
          }
          m = Math.min(m, this.monthsInYear(y));
          d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
        } else if (period === 'm') {
          resyncYearMonth(this);
          d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
        }
        var ymd = [y, this.fromMonthOfYear(y, m), d];
        this._validateLevel--;
        return ymd;
      } catch (e) {
        this._validateLevel--;
        throw e;
      }
    },
    /** Correct a candidate date after adding period(s) to a date.
    	Handle no year zero if necessary.
    	@memberof BaseCalendar
    	@private
    	@param {CDate} date The starting date.
    	@param {number[]} ymd The added date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date. */
    _correctAdd: function _correctAdd(date, ymd, offset, period) {
      if (!this.hasYearZero && (period === 'y' || period === 'm')) {
        if (ymd[0] === 0 ||
        // In year zero
        date.year() > 0 !== ymd[0] > 0) {
          // Crossed year zero
          var adj = {
            y: [1, 1, 'y'],
            m: [1, this.monthsInYear(-1), 'm'],
            w: [this.daysInWeek(), this.daysInYear(-1), 'd'],
            d: [1, this.daysInYear(-1), 'd']
          }[period];
          var dir = offset < 0 ? -1 : +1;
          ymd = this._add(date, offset * adj[0] + dir * adj[1], adj[2]);
        }
      }
      return date.date(ymd[0], ymd[1], ymd[2]);
    },
    /** Set a portion of the date.
    	@memberof BaseCalendar
    	@param {CDate} date The starting date.
    	@param {number} value The new value for the period.
    	@param {string} period One of 'y' for year, 'm' for month, 'd' for day.
    	@return {CDate} The updated date.
    	@throws Error if an invalid date or a different calendar is used.
    	@example calendar.set(date, 10, 'd') */
    set: function set(date, value, period) {
      this._validate(date, this.minMonth, this.minDay, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      var y = period === 'y' ? value : date.year();
      var m = period === 'm' ? value : date.month();
      var d = period === 'd' ? value : date.day();
      if (period === 'y' || period === 'm') {
        d = Math.min(d, this.daysInMonth(y, m));
      }
      return date.date(y, m, d);
    },
    /** Determine whether a date is valid for this calendar.
    	@memberof BaseCalendar
    	@param {number} year The year to examine.
    	@param {number} month The month to examine.
    	@param {number} day The day to examine.
    	@return {boolean} <code>true</code> if a valid date, <code>false</code> if not.
    	@example if (calendar.isValid(2014, 2, 31)) ... */
    isValid: function isValid(year, month, day) {
      this._validateLevel++;
      var valid = this.hasYearZero || year !== 0;
      if (valid) {
        var date = this.newDate(year, month, this.minDay);
        valid = month >= this.minMonth && month - this.minMonth < this.monthsInYear(date) && day >= this.minDay && day - this.minDay < this.daysInMonth(date);
      }
      this._validateLevel--;
      return valid;
    },
    /** Convert the date to a standard (Gregorian) JavaScript Date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {Date} The equivalent JavaScript date.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var jsd = calendar.toJSDate(date)
    var jsd = calendar.toJSDate(2014, 1, 26) */
    toJSDate: function toJSDate(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return $.calendars.instance().fromJD(this.toJD(date)).toJSDate();
    },
    /** Convert the date from a standard (Gregorian) JavaScript Date.
    	@memberof BaseCalendar
    	@param {Date} jsd The JavaScript date.
    	@return {CDate} The equivalent calendar date.
    	@example var date = calendar.fromJSDate(jsd) */
    fromJSDate: function fromJSDate(jsd) {
      return this.fromJD($.calendars.instance().fromJSDate(jsd).toJD());
    },
    /** Check that a candidate date is from the same calendar and is valid.
    	@memberof BaseCalendar
    	@private
    	@param {CDate|number} year The date to validate or the year to validate.
    	@param {number} [month] The month to validate (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to validate (if numeric <code>year</code> specified above).
    	@param {string} error Error message if invalid.
    	@throws Error if an invalid date or a different calendar is used. */
    _validate: function _validate(year, month, day, error) {
      if (year.year) {
        if (this._validateLevel === 0 && this.name !== year.calendar().name) {
          throw ($.calendars.local.differentCalendars || $.calendars.regionalOptions[''].differentCalendars).replace(/\{0\}/, this.local.name).replace(/\{1\}/, year.calendar().local.name);
        }
        return year;
      }
      try {
        this._validateLevel++;
        if (this._validateLevel === 1 && !this.isValid(year, month, day)) {
          throw error.replace(/\{0\}/, this.local.name);
        }
        var date = this.newDate(year, month, day);
        this._validateLevel--;
        return date;
      } catch (e) {
        this._validateLevel--;
        throw e;
      }
    }
  });

  /** Implementation of the Proleptic Gregorian Calendar.
  	See <a href=":http://en.wikipedia.org/wiki/Gregorian_calendar">http://en.wikipedia.org/wiki/Gregorian_calendar</a>
  	and <a href="http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar">http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar</a>.
  	@class GregorianCalendar
  	@augments BaseCalendar
  	@param {string} [language=''] The language code (default English) for localisation. */
  function GregorianCalendar(language) {
    this.local = this.regionalOptions[language] || this.regionalOptions[''];
  }
  GregorianCalendar.prototype = new BaseCalendar();
  $.extend(GregorianCalendar.prototype, {
    /** The calendar name.
    	@memberof GregorianCalendar */
    name: 'Gregorian',
    /** Julian date of start of Gregorian epoch: 1 January 0001 CE.
    	@memberof GregorianCalendar */
    jdEpoch: 1721425.5,
    /** Days per month in a common year.
    	@memberof GregorianCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
    	@memberof GregorianCalendar */
    hasYearZero: false,
    /** The minimum month number.
    	@memberof GregorianCalendar */
    minMonth: 1,
    /** The first month in the year.
    	@memberof GregorianCalendar */
    firstMonth: 1,
    /** The minimum day number.
    	@memberof GregorianCalendar */
    minDay: 1,
    /** Convert a number into a localised form.
    	@callback CalendarsDigits
    	@param {number} value The number to convert.
    	@return {string} The localised number.
    	@example digits: $.calendars.substituteDigits(['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']) */

    /** Localisations for the plugin.
    	Entries are objects indexed by the language code ('' being the default US/English).
    	Each object has the following attributes.
    	@memberof GregorianCalendar
    	@property {string} [name='Gregorian'] The calendar name.
    	@property {string[]} [epochs=['BCE','CE']] The epoch names.
    	@property {string[]} [monthNames=[...]] The long names of the months of the year.
    	@property {string[]} [monthNamesShort=[...]] The short names of the months of the year.
    	@property {string[]} [dayNames=[...]] The long names of the days of the week.
    	@property {string[]} [dayNamesShort=[...]] The short names of the days of the week.
    	@property {string[]} [dayNamesMin=[...]] The minimal names of the days of the week.
    	@property {CalendarsDigits} [digits=null] Convert numbers to localised versions.
    	@property {string} [dateFormat='mm/dd/yyyy'] The date format for this calendar.
    			See the options on {@linkcode BaseCalendar.formatDate|formatDate} for details.
    	@property {number} [firstDay=0] The number of the first day of the week, starting at 0.
    	@property {boolean} [isRTL=false] <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: {
      // Localisations
      '': {
        name: 'Gregorian',
        epochs: ['BCE', 'CE'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        digits: null,
        dateFormat: 'mm/dd/yyyy',
        firstDay: 0,
        isRTL: false
      }
    },
    /** Determine whether this date is in a leap year.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@throws Error if an invalid year or a different calendar is used. */
    leapYear: function leapYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    },
    /** Determine the week of the year for a date - ISO 8601.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {number} The week of the year, starting from 1.
    	@throws Error if an invalid date or a different calendar is used. */
    weekOfYear: function weekOfYear(year, month, day) {
      // Find Thursday of this week starting on Monday
      var checkDate = this.newDate(year, month, day);
      checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
      return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },
    /** Retrieve the number of days in a month.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year of the month.
    	@param {number} [month] The month (if numeric <code>year</code> specified above).
    	@return {number} The number of days in this month.
    	@throws Error if an invalid month/year or a different calendar is used. */
    daysInMonth: function daysInMonth(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return this.daysPerMonth[date.month() - 1] + (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },
    /** Determine whether this date is a week day.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@throws Error if an invalid date or a different calendar is used. */
    weekDay: function weekDay(year, month, day) {
      return (this.dayOfWeek(year, month, day) || 7) < 6;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {number} The equivalent Julian date.
    	@throws Error if an invalid date or a different calendar is used. */
    toJD: function toJD(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      year = date.year();
      month = date.month();
      day = date.day();
      if (year < 0) {
        year++;
      } // No year zero
      // Jean Meeus algorithm, "Astronomical Algorithms", 1991
      if (month < 3) {
        month += 12;
        year--;
      }
      var a = Math.floor(year / 100);
      var b = 2 - a + Math.floor(a / 4);
      return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    },
    /** Create a new date from a Julian date.
    	@memberof GregorianCalendar
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date. */
    fromJD: function fromJD(jd) {
      // Jean Meeus algorithm, "Astronomical Algorithms", 1991
      var z = Math.floor(jd + 0.5);
      var a = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + a - Math.floor(a / 4);
      var b = a + 1524;
      var c = Math.floor((b - 122.1) / 365.25);
      var d = Math.floor(365.25 * c);
      var e = Math.floor((b - d) / 30.6001);
      var day = b - d - Math.floor(e * 30.6001);
      var month = e - (e > 13.5 ? 13 : 1);
      var year = c - (month > 2.5 ? 4716 : 4715);
      if (year <= 0) {
        year--;
      } // No year zero
      return this.newDate(year, month, day);
    },
    /** Convert this date to a standard (Gregorian) JavaScript Date.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {Date} The equivalent JavaScript date.
    	@throws Error if an invalid date or a different calendar is used. */
    toJSDate: function toJSDate(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      var jsd = new Date(date.year(), date.month() - 1, date.day());
      jsd.setHours(0);
      jsd.setMinutes(0);
      jsd.setSeconds(0);
      jsd.setMilliseconds(0);
      // Hours may be non-zero on daylight saving cut-over:
      // > 12 when midnight changeover, but then cannot generate
      // midnight datetime, so jump to 1AM, otherwise reset.
      jsd.setHours(jsd.getHours() > 12 ? jsd.getHours() + 2 : 0);
      return jsd;
    },
    /** Create a new date from a standard (Gregorian) JavaScript Date.
    	@memberof GregorianCalendar
    	@param {Date} jsd The JavaScript date to convert.
    	@return {CDate} The equivalent date. */
    fromJSDate: function fromJSDate(jsd) {
      return this.newDate(jsd.getFullYear(), jsd.getMonth() + 1, jsd.getDate());
    }
  });

  // Singleton manager
  $.calendars = new Calendars();

  // Date template
  $.calendars.cdate = CDate;

  // Base calendar template
  $.calendars.baseCalendar = BaseCalendar;

  // Gregorian calendar implementation
  $.calendars.calendars.gregorian = GregorianCalendar;
})(jQuery);

/* http://keith-wood.name/calendars.html
   Calendars extras for jQuery v2.1.0.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  $.extend($.calendars.regionalOptions[''], {
    invalidArguments: 'Invalid arguments',
    invalidFormat: 'Cannot format a date from another calendar',
    missingNumberAt: 'Missing number at position {0}',
    unknownNameAt: 'Unknown name at position {0}',
    unexpectedLiteralAt: 'Unexpected literal at position {0}',
    unexpectedText: 'Additional text found at end'
  });
  $.calendars.local = $.calendars.regionalOptions[''];
  $.extend($.calendars.cdate.prototype, {
    /** Format this date.
    	Found in the <code>jquery.calendars.plus.js</code> module.
    	@memberof CDate
    	@param {string} [format] The date format to use (see {@linkcode BaseCalendar.formatDate|formatDate}).
    	@param {object} [settings] Options for the <code>formatDate</code> function.
    	@return {string} The formatted date. */
    formatDate: function formatDate(format, settings) {
      if (typeof format !== 'string') {
        settings = format;
        format = '';
      }
      return this._calendar.formatDate(format || '', this, settings);
    }
  });
  $.extend($.calendars.baseCalendar.prototype, {
    UNIX_EPOCH: $.calendars.instance().newDate(1970, 1, 1).toJD(),
    SECS_PER_DAY: 24 * 60 * 60,
    TICKS_EPOCH: $.calendars.instance().jdEpoch,
    // 1 January 0001 CE
    TICKS_PER_DAY: 24 * 60 * 60 * 10000000,
    /** Date format for ATOM (RFC 3339/ISO 8601) - 'yyyy-mm-dd'.
    	@memberof BaseCalendar */
    ATOM: 'yyyy-mm-dd',
    /** Date format for cookies - 'D, dd M yyyy'.
    	@memberof BaseCalendar */
    COOKIE: 'D, dd M yyyy',
    /** Date format for the full date - 'DD, MM d, yyyy'.
    	@memberof BaseCalendar */
    FULL: 'DD, MM d, yyyy',
    /** Date format for ISO 8601 - 'yyyy-mm-dd'.
    	@memberof BaseCalendar */
    ISO_8601: 'yyyy-mm-dd',
    /** Date format for Julian date - days since January 1, 4713 BCE Greenwich noon.
    	@memberof BaseCalendar */
    JULIAN: 'J',
    /** Date format for RFC 822 - 'D, d M yy'.
    	@memberof BaseCalendar */
    RFC_822: 'D, d M yy',
    /** Date format for RFC 850 - 'DD, dd-M-yy'.
    	@memberof BaseCalendar */
    RFC_850: 'DD, dd-M-yy',
    /** Date format for RFC 1036 - 'D, d M yy'.
    	@memberof BaseCalendar */
    RFC_1036: 'D, d M yy',
    /** Date format for RFC 1123 - 'D, d M yyyy'.
    	@memberof BaseCalendar */
    RFC_1123: 'D, d M yyyy',
    /** Date format for RFC 2822 - 'D, d M yyyy'.
    	@memberof BaseCalendar */
    RFC_2822: 'D, d M yyyy',
    /** Date format for RSS (RFC 822) - 'D, d M yy'.
    	@memberof BaseCalendar */
    RSS: 'D, d M yy',
    /** Date format for Windows ticks - number of 100-nanosecond ticks since 1 January 0001 00:00:00 UTC.
    	@memberof BaseCalendar */
    TICKS: '!',
    /** Date format for Unix timestamp - number of seconds elapsed since the
    	start of the Unix epoch at 1 January 1970 00:00:00 UTC.
    	@memberof BaseCalendar */
    TIMESTAMP: '@',
    /** Date format for W3C (ISO 8601) - 'yyyy-mm-dd'.
    	@memberof BaseCalendar */
    W3C: 'yyyy-mm-dd',
    /** Format a date object into a string value.
    	The format can be combinations of the following:
    	<ul>
    	<li>d  - day of month (no leading zero)</li>
    	<li>dd - day of month (two digit)</li>
    	<li>o  - day of year (no leading zeros)</li>
    	<li>oo - day of year (three digit)</li>
    	<li>D  - day name short</li>
    	<li>DD - day name long</li>
    	<li>w  - week of year (no leading zero)</li>
    	<li>ww - week of year (two digit)</li>
    	<li>m  - month of year (no leading zero)</li>
    	<li>mm - month of year (two digit)</li>
    	<li>M  - month name short</li>
    	<li>MM - month name long</li>
    	<li>yy - year (two digit)</li>
    	<li>yyyy - year (four digit)</li>
    	<li>YYYY - formatted year</li>
    	<li>J  - Julian date (days since January 1, 4713 BCE Greenwich noon)</li>
    	<li>@  - Unix timestamp (s since 01/01/1970)</li>
    	<li>!  - Windows ticks (100ns since 01/01/0001)</li>
    	<li>'...' - literal text</li>
    	<li>'' - single quote</li>
    	</ul>
    	Found in the <code>jquery.calendars.plus.js</code> module.
    	@memberof BaseCalendar
    	@param {string} [format] The desired format of the date (defaults to calendar format).
    	@param {CDate} date The date value to format.
    	@param {object} [settings] Addition options, whose attributes include:
    	@param {string[]} [settings.dayNamesShort] Abbreviated names of the days from day 0 (Sunday).
    	@param {string[]} [settings.dayNames] Names of the days from day 0 (Sunday).
    	@param {string[]} [settings.monthNamesShort] Abbreviated names of the months.
    	@param {string[]} [settings.monthNames] Names of the months.
    	@param {boolean} [settings.localNumbers=false] <code>true</code> to localise numbers (if available),
    		<code>false</code> to use normal Arabic numerals.
    	@return {string} The date in the above format.
    	@throws Errors if the date is from a different calendar. */
    formatDate: function formatDate(format, date, settings) {
      if (typeof format !== 'string') {
        settings = date;
        date = format;
        format = '';
      }
      if (!date) {
        return '';
      }
      if (date.calendar() !== this) {
        throw $.calendars.local.invalidFormat || $.calendars.regionalOptions[''].invalidFormat;
      }
      format = format || this.local.dateFormat;
      settings = settings || {};
      var dayNamesShort = settings.dayNamesShort || this.local.dayNamesShort;
      var dayNames = settings.dayNames || this.local.dayNames;
      var monthNamesShort = settings.monthNamesShort || this.local.monthNamesShort;
      var monthNames = settings.monthNames || this.local.monthNames;
      var localNumbers = settings.localNumbers || this.local.localNumbers;
      // Check whether a format character is doubled
      var doubled = function doubled(match, step) {
        var matches = 1;
        while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
          matches++;
        }
        iFormat += matches - 1;
        return Math.floor(matches / (step || 1)) > 1;
      };
      // Format a number, with leading zeroes if necessary
      var formatNumber = function formatNumber(match, value, len, step) {
        var num = '' + value;
        if (doubled(match, step)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      };
      // Format a name, short or long as requested
      var formatName = function formatName(match, value, shortNames, longNames) {
        return doubled(match) ? longNames[value] : shortNames[value];
      };
      // Localise numbers if requested and available
      var localiseNumbers = localNumbers && this.local.digits ? this.local.digits : function (value) {
        return value;
      };
      var output = '';
      var literal = false;
      for (var iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !doubled('\'')) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += localiseNumbers(formatNumber('d', date.day(), 2));
              break;
            case 'D':
              output += formatName('D', date.dayOfWeek(), dayNamesShort, dayNames);
              break;
            case 'o':
              output += formatNumber('o', date.dayOfYear(), 3);
              break;
            case 'w':
              output += formatNumber('w', date.weekOfYear(), 2);
              break;
            case 'm':
              output += localiseNumbers(formatNumber('m', date.month(), 2));
              break;
            case 'M':
              output += formatName('M', date.month() - this.minMonth, monthNamesShort, monthNames);
              break;
            case 'y':
              output += localiseNumbers(doubled('y', 2) ? date.year() : (date.year() % 100 < 10 ? '0' : '') + date.year() % 100);
              break;
            case 'Y':
              doubled('Y', 2);
              output += date.formatYear();
              break;
            case 'J':
              output += date.toJD();
              break;
            case '@':
              output += (date.toJD() - this.UNIX_EPOCH) * this.SECS_PER_DAY;
              break;
            case '!':
              output += (date.toJD() - this.TICKS_EPOCH) * this.TICKS_PER_DAY;
              break;
            case '\'':
              if (doubled('\'')) {
                output += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
      return output;
    },
    /** Parse a string value into a date object.
    	See {@linkcode BaseCalendar.formatDate|formatDate} for the possible formats, plus:
    	<ul>
    	<li>* - ignore rest of string</li>
    	</ul>
    	Found in the <code>jquery.calendars.plus.js</code> module.
    	@memberof BaseCalendar
    	@param {string} format The expected format of the date ('' for default calendar format).
    	@param {string} value The date in the above format.
    	@param {object} [settings] Additional options whose attributes include:
    	@param {number} [settings.shortYearCutoff] The cutoff year for determining the century.
    	@param {string[]} [settings.dayNamesShort] Abbreviated names of the days from day 0 (Sunday).
    	@param {string[]} [settings.dayNames] Names of the days from day 0 (Sunday).
    	@param {string[]} [settings.monthNamesShort] Abbreviated names of the months.
    	@param {string[]} [settings.monthNames] Names of the months.
    	@return {CDate} The extracted date value or <code>null</code> if value is blank.
    	@throws Errors if the format and/or value are missing,
    			if the value doesn't match the format, or if the date is invalid. */
    parseDate: function parseDate(format, value, settings) {
      if (typeof value === 'undefined' || value === null) {
        throw $.calendars.local.invalidArguments || $.calendars.regionalOptions[''].invalidArguments;
      }
      value = _typeof(value) === 'object' ? value.toString() : value + '';
      if (value === '') {
        return null;
      }
      format = format || this.local.dateFormat;
      settings = settings || {};
      var shortYearCutoff = settings.shortYearCutoff || this.shortYearCutoff;
      shortYearCutoff = typeof shortYearCutoff !== 'string' ? shortYearCutoff : this.today().year() % 100 + parseInt(shortYearCutoff, 10);
      var dayNamesShort = settings.dayNamesShort || this.local.dayNamesShort;
      var dayNames = settings.dayNames || this.local.dayNames;
      var monthNamesShort = settings.monthNamesShort || this.local.monthNamesShort;
      var monthNames = settings.monthNames || this.local.monthNames;
      var jd = -1;
      var year = -1;
      var month = -1;
      var day = -1;
      var doy = -1;
      var shortYear = false;
      var literal = false;
      // Check whether a format character is doubled
      var doubled = function doubled(match, step) {
        var matches = 1;
        while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
          matches++;
        }
        iFormat += matches - 1;
        return Math.floor(matches / (step || 1)) > 1;
      };
      // Extract a number from the string value
      var getNumber = function getNumber(match, step) {
        var isDoubled = doubled(match, step);
        var size = [2, 3, isDoubled ? 4 : 2, isDoubled ? 4 : 2, 10, 11, 20]['oyYJ@!'.indexOf(match) + 1];
        var digits = new RegExp('^-?\\d{1,' + size + '}');
        var num = value.substring(iValue).match(digits);
        if (!num) {
          throw ($.calendars.local.missingNumberAt || $.calendars.regionalOptions[''].missingNumberAt).replace(/\{0\}/, iValue);
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      };
      // Extract a name from the string value and convert to an index
      var calendar = this;
      var getName = function getName(match, shortNames, longNames, step) {
        var names = doubled(match, step) ? longNames : shortNames;
        var index = -1;
        for (var i = 0; i < names.length; i++) {
          if (value.substr(iValue, names[i].length).toLowerCase() === names[i].toLowerCase()) {
            if (index === -1) {
              index = i;
            } else if (names[i].length > names[index].length) {
              index = i;
            }
          }
        }
        if (index > -1) {
          iValue += names[index].length;
          return index + calendar.minMonth;
        }
        throw ($.calendars.local.unknownNameAt || $.calendars.regionalOptions[''].unknownNameAt).replace(/\{0\}/, iValue);
      };
      // Confirm that a literal character matches the string value
      var checkLiteral = function checkLiteral() {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw ($.calendars.local.unexpectedLiteralAt || $.calendars.regionalOptions[''].unexpectedLiteralAt).replace(/\{0\}/, iValue);
        }
        iValue++;
      };
      var iValue = 0;
      for (var iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !doubled('\'')) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              day = getNumber('d');
              break;
            case 'D':
              getName('D', dayNamesShort, dayNames);
              break;
            case 'o':
              doy = getNumber('o');
              break;
            case 'w':
              getNumber('w');
              break;
            case 'm':
              month = getNumber('m');
              break;
            case 'M':
              month = getName('M', monthNamesShort, monthNames);
              break;
            case 'y':
              var iSave = iFormat;
              shortYear = !doubled('y', 2);
              iFormat = iSave;
              year = getNumber('y', 2);
              break;
            case 'Y':
              year = getNumber('Y', 2);
              break;
            case 'J':
              jd = getNumber('J') + 0.5;
              if (value.charAt(iValue) === '.') {
                iValue++;
                getNumber('J');
              }
              break;
            case '@':
              jd = getNumber('@') / this.SECS_PER_DAY + this.UNIX_EPOCH;
              break;
            case '!':
              jd = getNumber('!') / this.TICKS_PER_DAY + this.TICKS_EPOCH;
              break;
            case '*':
              iValue = value.length;
              break;
            case '\'':
              if (doubled('\'')) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        throw $.calendars.local.unexpectedText || $.calendars.regionalOptions[''].unexpectedText;
      }
      if (year === -1) {
        year = this.today().year();
      } else if (year < 100 && shortYear) {
        year += shortYearCutoff === -1 ? 1900 : this.today().year() - this.today().year() % 100 - (year <= shortYearCutoff ? 0 : 100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        for (var dim = this.daysInMonth(year, month); day > dim; dim = this.daysInMonth(year, month)) {
          month++;
          day -= dim;
        }
      }
      return jd > -1 ? this.fromJD(jd) : this.newDate(year, month, day);
    },
    /** A date may be specified as an exact value or a relative one.
    	Found in the <code>jquery.calendars.plus.js</code> module.
    	@memberof BaseCalendar
    	@param {CDate|number|string} dateSpec The date as an object or string in the given format or
    			an offset - numeric days from today, or string amounts and periods, e.g. '+1m +2w'.
    	@param {CDate} defaultDate The date to use if no other supplied, may be <code>null</code>.
    	@param {CDate} [currentDate=null] The current date as a possible basis for relative dates,
    			if <code>null</code> today is used.
    	@param {string} [dateFormat] The expected date format -
    			see {@linkcode BaseCalendar.formatDate|formatDate}. Use '' for the calendar default format.
    	@param {object} [settings] Additional options whose attributes include:
    	@param {number} [settings.shortYearCutoff] The cutoff year for determining the century.
    	@param {string[]} [settings.dayNamesShort] Abbreviated names of the days from day 0 (Sunday).
    	@param {string[]} [settings.dayNames] Names of the days from day 0 (Sunday).
    	@param {string[]} [settings.monthNamesShort] Abbreviated names of the months.
    	@param {string[]} [settings.monthNames] Names of the months.
    	@return {CDate} The decoded date. */
    determineDate: function determineDate(dateSpec, defaultDate, currentDate, dateFormat, settings) {
      if (currentDate && _typeof(currentDate) !== 'object') {
        settings = dateFormat;
        dateFormat = currentDate;
        currentDate = null;
      }
      if (typeof dateFormat !== 'string') {
        settings = dateFormat;
        dateFormat = '';
      }
      var calendar = this;
      var offsetString = function offsetString(offset) {
        try {
          return calendar.parseDate(dateFormat, offset, settings);
        } catch (e) {
          // Ignore
        }
        offset = offset.toLowerCase();
        var date = (offset.match(/^c/) && currentDate ? currentDate.newDate() : null) || calendar.today();
        var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
        var matches = pattern.exec(offset);
        while (matches) {
          date.add(parseInt(matches[1], 10), matches[2] || 'd');
          matches = pattern.exec(offset);
        }
        return date;
      };
      defaultDate = defaultDate ? defaultDate.newDate() : null;
      dateSpec = typeof dateSpec === 'undefined' || dateSpec === null ? defaultDate : typeof dateSpec === 'string' ? offsetString(dateSpec) : typeof dateSpec === 'number' ? isNaN(dateSpec) || dateSpec === Infinity || dateSpec === -Infinity ? defaultDate : calendar.today().add(dateSpec, 'd') : calendar.newDate(dateSpec);
      return dateSpec;
    }
  });
})(jQuery);

/* http://keith-wood.name/calendars.html
   Calendars date picker for jQuery v2.1.0.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  var pluginName = 'calendarsPicker';

  /** Create the calendars datepicker plugin.
  	<p>Sets an <code>input</code> field to popup a calendar for date entry,
  		or a <code>div</code> or <code>span</code> to show an inline calendar.</p>
  	<p>Expects HTML like:</p>
  	<pre>&lt;input type="text"> or &lt;div>&lt;/div></pre>
  	<p>Provide inline configuration like:</p>
  	<pre>&lt;input type="text" data-calendarsPicker="name: 'value'"/></pre>
  	@class CalendarsPicker
  	@augments JQPlugin
  	@example $(selector).calendarsPicker()
  $(selector).calendarsPicker({minDate: 0, maxDate: '+1m +1w'}) */
  $.JQPlugin.createPlugin({
    /** The name of the plugin.
    	@memberof CalendarsPicker
    	@default 'calendarsPicker' */
    name: pluginName,
    /** Default template for generating a datepicker.
    	Insert anywhere:
    	<ul>
    	<li>'{l10n:<em>name</em>}' to insert localised value for <em>name</em>,</li>
    	<li>'{link:<em>name</em>}' to insert a link trigger for command <em>name</em>,</li>
    	<li>'{button:<em>name</em>}' to insert a button trigger for command <em>name</em>,</li>
    	<li>'{popup:start}...{popup:end}' to mark a section for inclusion in a popup datepicker only,</li>
    	<li>'{inline:start}...{inline:end}' to mark a section for inclusion in an inline datepicker only.</li>
    	</ul>
    	@memberof CalendarsPicker
    	@property {string} picker Overall structure: '{months}' to insert calendar months.
    	@property {string} monthRow One row of months: '{months}' to insert calendar months.
    	@property {string} month A single month: '{monthHeader<em>:dateFormat</em>}' to insert the month header -
    		<em>dateFormat</em> is optional and defaults to 'MM yyyy',
    		'{weekHeader}' to insert a week header, '{weeks}' to insert the month's weeks.
    	@property {string} weekHeader A week header: '{days}' to insert individual day names.
    	@property {string} dayHeader Individual day header: '{day}' to insert day name.
    	@property {string} week One week of the month: '{days}' to insert the week's days,
    		'{weekOfYear}' to insert week of year.
    	@property {string} day An individual day: '{day}' to insert day value.
    	@property {string} monthSelector jQuery selector, relative to picker, for a single month.
    	@property {string} daySelector jQuery selector, relative to picker, for individual days.
    	@property {string} rtlClass Class for right-to-left (RTL) languages.
    	@property {string} multiClass Class for multi-month datepickers.
    	@property {string} defaultClass Class for selectable dates.
    	@property {string} selectedClass Class for currently selected dates.
    	@property {string} highlightedClass Class for highlighted dates.
    	@property {string} todayClass Class for today.
    	@property {string} otherMonthClass Class for days from other months.
    	@property {string} weekendClass Class for days on weekends.
    	@property {string} commandClass Class prefix for commands.
    	@property {string} commandButtonClass Extra class(es) for commands that are buttons.
    	@property {string} commandLinkClass Extra class(es) for commands that are links.
    	@property {string} disabledClass Class for disabled commands. */
    defaultRenderer: {
      picker: '<div class="calendars">' + '<div class="calendars-nav">{link:prev}{link:today}{link:next}</div>{months}' + '{popup:start}<div class="calendars-ctrl">{link:clear}{link:close}</div>{popup:end}' + '<div class="calendars-clear-fix"></div></div>',
      monthRow: '<div class="calendars-month-row">{months}</div>',
      month: '<div class="calendars-month"><div class="calendars-month-header">{monthHeader}</div>' + '<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
      weekHeader: '<tr>{days}</tr>',
      dayHeader: '<th>{day}</th>',
      week: '<tr>{days}</tr>',
      day: '<td>{day}</td>',
      monthSelector: '.calendars-month',
      daySelector: 'td',
      rtlClass: 'calendars-rtl',
      multiClass: 'calendars-multi',
      defaultClass: '',
      selectedClass: 'calendars-selected',
      highlightedClass: 'calendars-highlight',
      todayClass: 'calendars-today',
      otherMonthClass: 'calendars-other-month',
      weekendClass: 'calendars-weekend',
      commandClass: 'calendars-cmd',
      commandButtonClass: '',
      commandLinkClass: '',
      disabledClass: 'calendars-disabled'
    },
    /** Command actions that may be added to a layout by name.
    	<ul>
    	<li>prev - Show the previous month (based on <code>monthsToStep</code> option) - <em>PageUp</em></li>
    	<li>prevJump - Show the previous year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageUp</em></li>
    	<li>next - Show the next month (based on <code>monthsToStep</code> option) - <em>PageDown</em></li>
    	<li>nextJump - Show the next year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageDown</em></li>
    	<li>current - Show the currently selected month or today's if none selected - <em>Ctrl+Home</em></li>
    	<li>today - Show today's month - <em>Ctrl+Home</em></li>
    	<li>clear - Erase the date and close the datepicker popup - <em>Ctrl+End</em></li>
    	<li>close - Close the datepicker popup - <em>Esc</em></li>
    	<li>prevWeek - Move the cursor to the previous week - <em>Ctrl+Up</em></li>
    	<li>prevDay - Move the cursor to the previous day - <em>Ctrl+Left</em></li>
    	<li>nextDay - Move the cursor to the next day - <em>Ctrl+Right</em></li>
    	<li>nextWeek - Move the cursor to the next week - <em>Ctrl+Down</em></li>
    	</ul>
    	The command name is the key name and is used to add the command to a layout
    	with '{button:<em>name</em>}' or '{link:<em>name</em>}'. Each has the following attributes.
    	@memberof CalendarsPicker
    	@property {string} text The field in the regional settings for the displayed text.
    	@property {string} status The field in the regional settings for the status text.
    	@property {object} keystroke The keystroke to trigger the action, with attributes:
    	@property {number} keystroke.keyCode the code for the keystroke,
    	@property {boolean} [keystroke.ctrlKey] <code>true</code> if <em>Ctrl</em> is required,
    	@property {boolean} [keystroke.altKey] <code>true</code> if <em>Alt</em> is required,
    	@property {boolean} [keystroke.shiftKey] <code>true</code> if <em>Shift</em> is required.
    	@property {CalendarsPickerCommandEnabled} enabled The function that indicates the command is enabled.
    	@property {CalendarsPickerCommandDate} date The function to get the date associated with this action.
    	@property {CalendarsPickerCommandAction} action The function that implements the action. */
    commands: {
      prev: {
        text: 'prevText',
        status: 'prevStatus',
        // Previous month
        keystroke: {
          keyCode: 33
        },
        // Page up
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          return !minDate || inst.drawDate.newDate().add(1 - inst.options.monthsToStep - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay).add(-1, 'd').compareTo(minDate) !== -1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(-inst.options.monthsToStep - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay);
        },
        action: function action(inst) {
          plugin.changeMonth(this, -inst.options.monthsToStep);
        }
      },
      prevJump: {
        text: 'prevJumpText',
        status: 'prevJumpStatus',
        // Previous year
        keystroke: {
          keyCode: 33,
          ctrlKey: true
        },
        // Ctrl + Page up
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          return !minDate || inst.drawDate.newDate().add(1 - inst.options.monthsToJump - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay).add(-1, 'd').compareTo(minDate) !== -1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(-inst.options.monthsToJump - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay);
        },
        action: function action(inst) {
          plugin.changeMonth(this, -inst.options.monthsToJump);
        }
      },
      next: {
        text: 'nextText',
        status: 'nextStatus',
        // Next month
        keystroke: {
          keyCode: 34
        },
        // Page down
        enabled: function enabled(inst) {
          var maxDate = inst.get('maxDate');
          return !maxDate || inst.drawDate.newDate().add(inst.options.monthsToStep - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay).compareTo(maxDate) !== +1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(inst.options.monthsToStep - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay);
        },
        action: function action(inst) {
          plugin.changeMonth(this, inst.options.monthsToStep);
        }
      },
      nextJump: {
        text: 'nextJumpText',
        status: 'nextJumpStatus',
        // Next year
        keystroke: {
          keyCode: 34,
          ctrlKey: true
        },
        // Ctrl + Page down
        enabled: function enabled(inst) {
          var maxDate = inst.get('maxDate');
          return !maxDate || inst.drawDate.newDate().add(inst.options.monthsToJump - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay).compareTo(maxDate) !== +1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(inst.options.monthsToJump - inst.options.monthsOffset, 'm').day(inst.options.calendar.minDay);
        },
        action: function action(inst) {
          plugin.changeMonth(this, inst.options.monthsToJump);
        }
      },
      current: {
        text: 'currentText',
        status: 'currentStatus',
        // Current month
        keystroke: {
          keyCode: 36,
          ctrlKey: true
        },
        // Ctrl + Home
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          var maxDate = inst.get('maxDate');
          var curDate = inst.selectedDates[0] || inst.options.calendar.today();
          return (!minDate || curDate.compareTo(minDate) !== -1) && (!maxDate || curDate.compareTo(maxDate) !== +1);
        },
        date: function date(inst) {
          return inst.selectedDates[0] || inst.options.calendar.today();
        },
        action: function action(inst) {
          var curDate = inst.selectedDates[0] || inst.options.calendar.today();
          plugin.showMonth(this, curDate.year(), curDate.month());
        }
      },
      today: {
        text: 'todayText',
        status: 'todayStatus',
        // Today's month
        keystroke: {
          keyCode: 36,
          ctrlKey: true
        },
        // Ctrl + Home
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          var maxDate = inst.get('maxDate');
          return (!minDate || inst.options.calendar.today().compareTo(minDate) !== -1) && (!maxDate || inst.options.calendar.today().compareTo(maxDate) !== +1);
        },
        date: function date(inst) {
          return inst.options.calendar.today();
        },
        action: function action() {
          plugin.showMonth(this);
        }
      },
      clear: {
        text: 'clearText',
        status: 'clearStatus',
        // Clear the datepicker
        keystroke: {
          keyCode: 35,
          ctrlKey: true
        },
        // Ctrl + End
        enabled: function enabled() {
          return true;
        },
        date: function date() {
          return null;
        },
        action: function action() {
          plugin.clear(this);
        }
      },
      close: {
        text: 'closeText',
        status: 'closeStatus',
        // Close the datepicker
        keystroke: {
          keyCode: 27
        },
        // Escape
        enabled: function enabled() {
          return true;
        },
        date: function date() {
          return null;
        },
        action: function action() {
          plugin.hide(this);
        }
      },
      prevWeek: {
        text: 'prevWeekText',
        status: 'prevWeekStatus',
        // Previous week
        keystroke: {
          keyCode: 38,
          ctrlKey: true
        },
        // Ctrl + Up
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          return !minDate || inst.drawDate.newDate().add(-inst.options.calendar.daysInWeek(), 'd').compareTo(minDate) !== -1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(-inst.options.calendar.daysInWeek(), 'd');
        },
        action: function action(inst) {
          plugin.changeDay(this, -inst.options.calendar.daysInWeek());
        }
      },
      prevDay: {
        text: 'prevDayText',
        status: 'prevDayStatus',
        // Previous day
        keystroke: {
          keyCode: 37,
          ctrlKey: true
        },
        // Ctrl + Left
        enabled: function enabled(inst) {
          var minDate = inst.curMinDate();
          return !minDate || inst.drawDate.newDate().add(-1, 'd').compareTo(minDate) !== -1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(-1, 'd');
        },
        action: function action() {
          plugin.changeDay(this, -1);
        }
      },
      nextDay: {
        text: 'nextDayText',
        status: 'nextDayStatus',
        // Next day
        keystroke: {
          keyCode: 39,
          ctrlKey: true
        },
        // Ctrl + Right
        enabled: function enabled(inst) {
          var maxDate = inst.get('maxDate');
          return !maxDate || inst.drawDate.newDate().add(1, 'd').compareTo(maxDate) !== +1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(1, 'd');
        },
        action: function action() {
          plugin.changeDay(this, 1);
        }
      },
      nextWeek: {
        text: 'nextWeekText',
        status: 'nextWeekStatus',
        // Next week
        keystroke: {
          keyCode: 40,
          ctrlKey: true
        },
        // Ctrl + Down
        enabled: function enabled(inst) {
          var maxDate = inst.get('maxDate');
          return !maxDate || inst.drawDate.newDate().add(inst.options.calendar.daysInWeek(), 'd').compareTo(maxDate) !== +1;
        },
        date: function date(inst) {
          return inst.drawDate.newDate().add(inst.options.calendar.daysInWeek(), 'd');
        },
        action: function action(inst) {
          plugin.changeDay(this, inst.options.calendar.daysInWeek());
        }
      }
    },
    /** Determine whether a command is enabled.
    	@callback CalendarsPickerCommandEnabled
    	@param {object} inst The current instance settings.
    	@return {boolean} <code>true</code> if this command is enabled, <code>false</code> if not.
    	@example enabled: function(inst) {
    return !!inst.curMinDate();
    } */

    /** Calculate the representative date for a command.
    	@callback CalendarsPickerCommandDate
    	@param {object} inst The current instance settings.
    	@return {CDate} A date appropriate for this command.
    	@example date: function(inst) {
    return inst.curMinDate();
    } */

    /** Perform the action for a command.
    	@callback CalendarsPickerCommandAction
    	@param {object} inst The current instance settings.
    	@example date: function(inst) {
    $.datepick.setDate(inst.elem, inst.curMinDate());
    } */

    /** Calculate the week of the year for a date.
    	@callback CalendarsPickerCalculateWeek
    	@param {CDate} date The date to evaluate.
    	@return {number} The week of the year.
    	@example calculateWeek: function(date) {
    var startYear = date.newDate(date.year(), 1, 1);
    return Math.floor((date.dayOfYear() - startYear.dayOfYear()) / 7) + 1;
    } */

    /** Provide information about an individual date shown in the calendar.
    	@callback CalendarsPickerOnDate
    	@param {CDate} date The date to evaluate.
    	@return {object} Information about that date, with the properties above.
    	@property {boolean} selectable <code>true</code> if this date can be selected.
    	@property {string} dateClass Class(es) to be applied to the date.
    	@property {string} content The date cell content.
    	@property {string} tooltip A popup tooltip for the date.
    	@example onDate: function(date) {
    return {selectable: date.day() > 0 && date.day() < 5,
      dateClass: date.day() === 4 ? 'last-day' : ''};
    } */

    /** Update the datepicker display.
    	@callback CalendarsPickerOnShow
    	@param {jQuery} picker The datepicker <code>div</code> to be shown.
    	@param {object} inst The current instance settings.
    	@example onShow: function(picker, inst) {
    picker.append('<button type="button">Hi</button>').
      find('button:last').click(function() {
        alert('Hi!');
      });
    } */

    /** React to navigating through the months/years.
    	@callback CalendarsPickerOnChangeMonthYear
    	@param {number} year The new year.
    	@param {number} month The new month (calendar minimum month to maximum month).
    	@example onChangeMonthYear: function(year, month) {
    alert('Now in ' + month + '/' + year);
    } */

    /** Datepicker on select callback.
    	Triggered when a date is selected.
    	@callback CalendarsPickerOnSelect
    	@param {CDate[]} dates The selected date(s).
    	@example onSelect: function(dates) {
    alert('Selected ' + dates);
    } */

    /** Datepicker on close callback.
    	Triggered when a popup calendar is closed.
    	@callback CalendarsPickerOnClose
    	@param {CDate[]} dates The selected date(s).
    	@example onClose: function(dates) {
    alert('Selected ' + dates);
    } */

    /** Default settings for the plugin.
    	@memberof CalendarsPicker
    	@property {Calendar} [calendar=$.calendars.instance()] The calendar for this datepicker.
    	@property {string} [pickerClass=''] CSS class to add to this instance of the datepicker.
    	@property {boolean} [showOnFocus=true] <code>true</code> for popup on focus, <code>false</code> for not.
    	@property {string|Element|jQuery} [showTrigger=null] Element to be cloned for a trigger,
    		<code>null</code> for none.
    	@property {string} [showAnim='show'] Name of jQuery animation for popup, '' for no animation.
    	@property {object} [showOptions=null] Options for enhanced animations.
    	@property {string|number} [showSpeed='normal'] Duration of display/closure, named or in milliseconds.
    	@property {string|Element|jQuery} [popupContainer=null] The element to which a popup calendar is added,
    		<code>null</code> for body.
    	@property {string} [alignment='bottom'] Alignment of popup - with nominated corner of input:
    		'top' or 'bottom' aligns depending on language direction,
    		'topLeft', 'topRight', 'bottomLeft', 'bottomRight'.
    	@property {boolean} [fixedWeeks=false] <code>true</code> to always show 6 weeks,
    		<code>false</code> to only show as many as are needed.
    	@property {number} [firstDay=null] First day of the week, 0 = Sunday, 1 = Monday, etc.,
    		<code>null</code> for <code>calendar</code> default.
    	@property {CalendarsPickerCalculateWeek} [calculateWeek=null] Calculate week of the year from a date,
    		<code>null</code> for <code>calendar</code> default.
    	@property {boolean} [localNumbers=false] <code>true</code> to localise numbers (if available),
    		<code>false</code> to use normal Arabic numerals.
    	@property {number|number[]} [monthsToShow=1] How many months to show, cols or [rows, cols].
    	@property {number} [monthsOffset=0] How many months to offset the primary month by;
    		may be a function that takes the date and returns the offset.
    	@property {number} [monthsToStep=1] How many months to move when prev/next clicked.
    	@property {number} [monthsToJump=12] How many months to move when large prev/next clicked.
    	@property {boolean} [useMouseWheel=true] <code>true</code> to use mousewheel if available,
    		<code>false</code> to never use it.
    	@property {boolean} [changeMonth=true] <code>true</code> to change month/year via drop-down,
    		<code>false</code> for navigation only.
    	@property {string} [yearRange='c-10:c+10'] Range of years to show in drop-down: 'any' for direct text entry
    		or 'start:end', where start/end are '+-nn' for relative to today
    		or 'c+-nn' for relative to the currently selected date
    		or 'nnnn' for an absolute year.
    	@property {boolean} [showOtherMonths=false] <code>true</code> to show dates from other months,
    		<code>false</code> to not show them.
    	@property {boolean} [selectOtherMonths=false] <code>true</code> to allow selection of dates
    		from other months too.
    	@property {string|number|CDate} [defaultDate=null] Date to show if no other selected.
    	@property {boolean} [selectDefaultDate=false] <code>true</code> to pre-select the default date
    		if no other is chosen.
    	@property {string|number|CDate} [minDate=null] The minimum selectable date.
    	@property {string|number|CDate} [maxDate=null] The maximum selectable date.
    	@property {string} [dateFormat='mm/dd/yyyy'] Format for dates.
    	@property {boolean} [autoSize=false] <code>true</code> to size the input field according to the date format.
    	@property {boolean} [rangeSelect=false] Allows for selecting a date range on one date picker.
    	@property {string} [rangeSeparator=' - '] Text between two dates in a range.
    	@property {number} [multiSelect=0] Maximum number of selectable dates, zero for single select.
    	@property {string} [multiSeparator=','] Text between multiple dates.
    	@property {CalendarsPickerOnDate} [onDate=null] Callback as a date is added to the datepicker.
    	@property {CalendarsPickerOnShow} [onShow=null] Callback just before a datepicker is shown.
    	@property {CalendarsPickerOnChangeMonthYear} [onChangeMonthYear=null] Callback when a new month/year
    		is selected.
    	@property {CalendarsPickerOnSelect} [onSelect=null] Callback when a date is selected.
    	@property {CalendarsPickerOnClose} [onClose=null] Callback when a datepicker is closed.
    	@property {string|Element|jQuery} [altField=null] Alternate field to update in synch with the datepicker.
    	@property {string} [altFormat=null] Date format for alternate field, defaults to <code>dateFormat</code>.
    	@property {boolean} [constrainInput=true] <code>true</code> to constrain typed input to
    		<code>dateFormat</code> allowed characters.
    	@property {boolean} [commandsAsDateFormat=false] <code>true</code> to apply
    		<code><a href="#formatDate">formatDate</a></code> to the command texts.
    	@property {object} [commands=this.commands] Command actions that may be added to a layout by name.
    	@example $(selector).calendarsPicker({calendar: $.calendars.instance('persian')})
    $(selector).calendarsPicker({monthsToShow: [2, 3], monthsToStep: 6})
    $(selector).calendarsPicker({minDate: $.calendars.newDate(2001, 1, 1),
    maxDate: $.calendars.newDate(2010, 12, 31)}) */
    defaultOptions: {
      calendar: $.calendars.instance(),
      pickerClass: '',
      showOnFocus: true,
      showTrigger: null,
      showAnim: 'show',
      showOptions: {},
      showSpeed: 'normal',
      popupContainer: null,
      alignment: 'bottom',
      fixedWeeks: false,
      firstDay: null,
      calculateWeek: null,
      localNumbers: false,
      monthsToShow: 1,
      monthsOffset: 0,
      monthsToStep: 1,
      monthsToJump: 12,
      useMouseWheel: true,
      changeMonth: true,
      yearRange: 'c-10:c+10',
      showOtherMonths: false,
      selectOtherMonths: false,
      defaultDate: null,
      selectDefaultDate: false,
      minDate: null,
      maxDate: null,
      dateFormat: null,
      autoSize: false,
      rangeSelect: false,
      rangeSeparator: ' - ',
      multiSelect: 0,
      multiSeparator: ',',
      onDate: null,
      onShow: null,
      onChangeMonthYear: null,
      onSelect: null,
      onClose: null,
      altField: null,
      altFormat: null,
      constrainInput: true,
      commandsAsDateFormat: false,
      commands: {} // this.commands
    },

    /** Localisations for the plugin.
    	Entries are objects indexed by the language code ('' being the default US/English).
    	Each object has the following attributes.
    	@memberof CalendarsPicker
    	@property {string} [renderer=this.defaultRenderer] The rendering templates.
    	@property {string} [prevText='&lt;Prev'] Text for the previous month command.
    	@property {string} [prevStatus='Show the previous month'] Status text for the
    				previous month command.
    	@property {string} [prevJumpText='&lt;&lt;']  Text for the previous year command.
    	@property {string} [prevJumpStatus='Show the previous year'] Status text for the
    				previous year command.
    	@property {string} [nextText='Next&gt;'] Text for the next month command.
    	@property {string} [nextStatus='Show the next month'] Status text for the next month command.
    	@property {string} [nextJumpText='&gt;&gt;'] Text for the next year command.
    	@property {string} [nextJumpStatus='Show the next year'] Status text for the
    				next year command.
    	@property {string} [currentText='Current'] Text for the current month command.
    	@property {string} [currentStatus='Show the current month']  Status text for the
    				current month command.
    	@property {string} [todayText='Today'] Text for the today's month command.
    	@property {string} [todayStatus='Show today\'s month']  Status text for the today's month command.
    	@property {string} [clearText='Clear'] Text for the clear command.
    	@property {string} [clearStatus='Clear all the dates'] Status text for the clear command.
    	@property {string} [closeText='Close'] Text for the close command.
    	@property {string} [closeStatus='Close the datepicker']  Status text for the close command.
    	@property {string} [yearStatus='Change the year'] Status text for year selection.
    	@property {string} [earlierText='&#160;&#160;▲'] Text for earlier years.
    	@property {string} [laterText='&#160;&#160;▼'] Text for later years.
    	@property {string} [monthStatus='Change the month'] Status text for month selection.
    	@property {string} [weekText='Wk'] Text for week of the year column header.
    	@property {string} [weekStatus='Week of the year'] Status text for week of the year
    				column header.
    	@property {string} [dayStatus='Select DD, M d, yyyy'] Status text for selectable days.
    	@property {string} [defaultStatus='Select a date'] Status text shown by default.
    	@property {boolean} [isRTL=false] <code>true</code> if language is right-to-left. */
    regionalOptions: {
      // Available regional settings, indexed by language/country code
      '': {
        // Default regional settings - English/US
        renderer: {},
        // this.defaultRenderer
        prevText: '&lt;Prev',
        prevStatus: 'Show the previous month',
        prevJumpText: '&lt;&lt;',
        prevJumpStatus: 'Show the previous year',
        nextText: 'Next&gt;',
        nextStatus: 'Show the next month',
        nextJumpText: '&gt;&gt;',
        nextJumpStatus: 'Show the next year',
        currentText: 'Current',
        currentStatus: 'Show the current month',
        todayText: 'Today',
        todayStatus: 'Show today\'s month',
        clearText: 'Clear',
        clearStatus: 'Clear all the dates',
        closeText: 'Close',
        closeStatus: 'Close the datepicker',
        yearStatus: 'Change the year',
        earlierText: '&#160;&#160;▲',
        laterText: '&#160;&#160;▼',
        monthStatus: 'Change the month',
        weekText: 'Wk',
        weekStatus: 'Week of the year',
        dayStatus: 'Select DD, M d, yyyy',
        defaultStatus: 'Select a date',
        isRTL: false
      }
    },
    _disabled: [],
    _popupClass: 'calendars-popup',
    // Marker for popup division
    _triggerClass: 'calendars-trigger',
    // Marker for trigger element
    _disableClass: 'calendars-disable',
    // Marker for disabled element
    _monthYearClass: 'calendars-month-year',
    // Marker for month/year inputs
    _curMonthClass: 'calendars-month-',
    // Marker for current month/year
    _anyYearClass: 'calendars-any-year',
    // Marker for year direct input
    _curDoWClass: 'calendars-dow-',
    // Marker for day of week

    _init: function _init() {
      this.defaultOptions.commands = this.commands;
      this.regionalOptions[''].renderer = this.defaultRenderer;
      this._super();
    },
    _instSettings: function _instSettings(elem, options) {
      // jshint unused:false
      return {
        selectedDates: [],
        drawDate: null,
        pickingRange: false,
        inline: $.inArray(elem[0].nodeName.toLowerCase(), ['div', 'span']) > -1,
        get: function get(name) {
          // Get a setting value, computing if necessary
          if ($.inArray(name, ['defaultDate', 'minDate', 'maxDate']) > -1) {
            // Decode date settings
            return this.options.calendar.determineDate(this.options[name], null, this.selectedDates[0], this.get('dateFormat'), this.getConfig());
          }
          if (name === 'dateFormat') {
            return this.options.dateFormat || this.options.calendar.local.dateFormat;
          }
          return this.options[name];
        },
        curMinDate: function curMinDate() {
          return this.pickingRange ? this.selectedDates[0] : this.get('minDate');
        },
        getConfig: function getConfig() {
          return {
            dayNamesShort: this.options.dayNamesShort,
            dayNames: this.options.dayNames,
            monthNamesShort: this.options.monthNamesShort,
            monthNames: this.options.monthNames,
            calculateWeek: this.options.calculateWeek,
            shortYearCutoff: this.options.shortYearCutoff
          };
        }
      };
    },
    _postAttach: function _postAttach(elem, inst) {
      if (inst.inline) {
        inst.drawDate = plugin._checkMinMax((inst.selectedDates[0] || inst.get('defaultDate') || inst.options.calendar.today()).newDate(), inst);
        inst.prevDate = inst.drawDate.newDate();
        this._update(elem[0]);
        if ($.fn.mousewheel) {
          elem.mousewheel(this._doMouseWheel);
        }
      } else {
        this._attachments(elem, inst);
        elem.on('keydown.' + inst.name, this._keyDown).on('keypress.' + inst.name, this._keyPress).on('keyup.' + inst.name, this._keyUp);
        if (elem.attr('disabled')) {
          this.disable(elem[0]);
        }
      }
    },
    _optionsChanged: function _optionsChanged(elem, inst, options) {
      if (options.calendar && options.calendar !== inst.options.calendar) {
        var discardDate = function discardDate(name) {
          return _typeof(inst.options[name]) === 'object' ? null : inst.options[name];
        };
        options = $.extend({
          defaultDate: discardDate('defaultDate'),
          minDate: discardDate('minDate'),
          maxDate: discardDate('maxDate')
        }, options);
        inst.selectedDates = [];
        inst.drawDate = null;
      }
      var dates = inst.selectedDates;
      $.extend(inst.options, options);
      this.setDate(elem[0], dates, null, false, true);
      inst.pickingRange = false;
      var calendar = inst.options.calendar;
      var defaultDate = inst.get('defaultDate');
      inst.drawDate = this._checkMinMax((defaultDate ? defaultDate : inst.drawDate) || defaultDate || calendar.today(), inst).newDate();
      if (!inst.inline) {
        this._attachments(elem, inst);
      }
      if (inst.inline || inst.div) {
        this._update(elem[0]);
      }
    },
    /** Attach events and trigger, if necessary.
    	@memberof CalendarsPicker
    	@private
    	@param {jQuery} elem The control to affect.
    	@param {object} inst The current instance settings. */
    _attachments: function _attachments(elem, inst) {
      elem.off('focus.' + inst.name);
      if (inst.options.showOnFocus) {
        elem.on('focus.' + inst.name, this.show);
      }
      if (inst.trigger) {
        inst.trigger.remove();
      }
      var trigger = inst.options.showTrigger;
      inst.trigger = !trigger ? $([]) : $(trigger).clone().removeAttr('id').addClass(this._triggerClass)[inst.options.isRTL ? 'insertBefore' : 'insertAfter'](elem).click(function () {
        if (!plugin.isDisabled(elem[0])) {
          plugin[plugin.curInst === inst ? 'hide' : 'show'](elem[0]);
        }
      });
      this._autoSize(elem, inst);
      var dates = this._extractDates(inst, elem.val());
      if (dates) {
        this.setDate(elem[0], dates, null, true);
      }
      var defaultDate = inst.get('defaultDate');
      if (inst.options.selectDefaultDate && defaultDate && inst.selectedDates.length === 0) {
        this.setDate(elem[0], (defaultDate || inst.options.calendar.today()).newDate());
      }
    },
    /** Apply the maximum length for the date format.
    	@memberof CalendarsPicker
    	@private
    	@param {jQuery} elem The control to affect.
    	@param {object} inst The current instance settings. */
    _autoSize: function _autoSize(elem, inst) {
      if (inst.options.autoSize && !inst.inline) {
        var calendar = inst.options.calendar;
        var date = calendar.newDate(2009, 10, 20); // Ensure double digits
        var dateFormat = inst.get('dateFormat');
        if (dateFormat.match(/[DM]/)) {
          var findMax = function findMax(names) {
            var max = 0;
            var maxI = 0;
            for (var i = 0; i < names.length; i++) {
              if (names[i].length > max) {
                max = names[i].length;
                maxI = i;
              }
            }
            return maxI;
          };
          date.month(findMax(calendar.local[dateFormat.match(/MM/) ?
          // Longest month
          'monthNames' : 'monthNamesShort']) + 1);
          date.day(findMax(calendar.local[dateFormat.match(/DD/) ?
          // Longest day
          'dayNames' : 'dayNamesShort']) + 20 - date.dayOfWeek());
        }
        inst.elem.attr('size', date.formatDate(dateFormat, {
          localNumbers: inst.options.localnumbers
        }).length);
      }
    },
    _preDestroy: function _preDestroy(elem, inst) {
      if (inst.trigger) {
        inst.trigger.remove();
      }
      elem.empty().off('.' + inst.name);
      if (inst.inline && $.fn.mousewheel) {
        elem.unmousewheel();
      }
      if (!inst.inline && inst.options.autoSize) {
        elem.removeAttr('size');
      }
    },
    /** Apply multiple event functions.
    	@memberof CalendarsPicker
    	@param {function} fns The functions to apply.
    	@example onShow: multipleEvents(fn1, fn2, ...) */
    multipleEvents: function multipleEvents(fns) {
      // jshint unused:false
      var funcs = arguments;
      return function () {
        for (var i = 0; i < funcs.length; i++) {
          funcs[i].apply(this, arguments);
        }
      };
    },
    /** Enable the control.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to affect.
    	@example $(selector).datepick('enable') */
    enable: function enable(elem) {
      elem = $(elem);
      if (!elem.hasClass(this._getMarker())) {
        return;
      }
      var inst = this._getInst(elem);
      if (inst.inline) {
        elem.children('.' + this._disableClass).remove().end().find('button,select').prop('disabled', false).end().find('a').attr('href', '#');
      } else {
        elem.prop('disabled', false);
        inst.trigger.filter('button.' + this._triggerClass).prop('disabled', false).end().filter('img.' + this._triggerClass).css({
          opacity: '1.0',
          cursor: ''
        });
      }
      this._disabled = $.map(this._disabled, function (value) {
        return value === elem[0] ? null : value;
      }); // Delete entry
    },

    /** Disable the control.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to affect.
    	@example $(selector).datepick('disable') */
    disable: function disable(elem) {
      elem = $(elem);
      if (!elem.hasClass(this._getMarker())) {
        return;
      }
      var inst = this._getInst(elem);
      if (inst.inline) {
        var inline = elem.children(':last');
        var offset = inline.offset();
        var relOffset = {
          left: 0,
          top: 0
        };
        inline.parents().each(function () {
          if ($(this).css('position') === 'relative') {
            relOffset = $(this).offset();
            return false;
          }
        });
        var zIndex = elem.css('zIndex');
        zIndex = (zIndex === 'auto' ? 0 : parseInt(zIndex, 10)) + 1;
        elem.prepend('<div class="' + this._disableClass + '" style="' + 'width: ' + inline.outerWidth() + 'px; height: ' + inline.outerHeight() + 'px; left: ' + (offset.left - relOffset.left) + 'px; top: ' + (offset.top - relOffset.top) + 'px; z-index: ' + zIndex + '"></div>').find('button,select').prop('disabled', true).end().find('a').removeAttr('href');
      } else {
        elem.prop('disabled', true);
        inst.trigger.filter('button.' + this._triggerClass).prop('disabled', true).end().filter('img.' + this._triggerClass).css({
          opacity: '0.5',
          cursor: 'default'
        });
      }
      this._disabled = $.map(this._disabled, function (value) {
        return value === elem[0] ? null : value;
      }); // Delete entry
      this._disabled.push(elem[0]);
    },
    /** Is the first field in a jQuery collection disabled as a datepicker?
    	@memberof CalendarsPicker
    	@param {Element} elem The control to examine.
    	@return {boolean} <code>true</code> if disabled, <code>false</code> if enabled.
    	@example if ($(selector).datepick('isDisabled')) {...} */
    isDisabled: function isDisabled(elem) {
      return elem && $.inArray(elem, this._disabled) > -1;
    },
    /** Show a popup datepicker.
    	@memberof CalendarsPicker
    	@param {Event|Element} elem a focus event or the control to use.
    	@example $(selector).datepick('show') */
    show: function show(elem) {
      elem = $(elem.target || elem);
      var inst = plugin._getInst(elem);
      if (plugin.curInst === inst) {
        return;
      }
      if (plugin.curInst) {
        plugin.hide(plugin.curInst, true);
      }
      if (!$.isEmptyObject(inst)) {
        // Retrieve existing date(s)
        inst.lastVal = null;
        inst.selectedDates = plugin._extractDates(inst, elem.val());
        inst.pickingRange = false;
        inst.drawDate = plugin._checkMinMax((inst.selectedDates[0] || inst.get('defaultDate') || inst.options.calendar.today()).newDate(), inst);
        inst.prevDate = inst.drawDate.newDate();
        plugin.curInst = inst;
        // Generate content
        plugin._update(elem[0], true);
        // Adjust position before showing
        var offset = plugin._checkOffset(inst);
        inst.div.css({
          left: offset.left,
          top: offset.top
        });
        // And display
        var showAnim = inst.options.showAnim;
        var showSpeed = inst.options.showSpeed;
        showSpeed = showSpeed === 'normal' && $.ui && parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed;
        if ($.effects && ($.effects[showAnim] || $.effects.effect && $.effects.effect[showAnim])) {
          var data = inst.div.data(); // Update old effects data
          for (var key in data) {
            if (key.match(/^ec\.storage\./)) {
              data[key] = inst._mainDiv.css(key.replace(/ec\.storage\./, ''));
            }
          }
          inst.div.data(data).show(showAnim, inst.options.showOptions, showSpeed);
        } else {
          inst.div[showAnim || 'show'](showAnim ? showSpeed : 0);
        }
      }
    },
    /** Extract possible dates from a string.
    	@memberof CalendarsPicker
    	@private
    	@param {object} inst The current instance settings.
    	@param {string} text The text to extract from.
    	@return {CDate[]} The extracted dates. */
    _extractDates: function _extractDates(inst, datesText) {
      if (datesText === inst.lastVal) {
        return;
      }
      inst.lastVal = datesText;
      datesText = datesText.split(inst.options.multiSelect ? inst.options.multiSeparator : inst.options.rangeSelect ? inst.options.rangeSeparator : '\x00');
      var dates = [];
      for (var i = 0; i < datesText.length; i++) {
        try {
          var date = inst.options.calendar.parseDate(inst.get('dateFormat'), datesText[i]);
          if (date) {
            var found = false;
            for (var j = 0; j < dates.length; j++) {
              if (dates[j].compareTo(date) === 0) {
                found = true;
                break;
              }
            }
            if (!found) {
              dates.push(date);
            }
          }
        } catch (e) {
          // Ignore
        }
      }
      dates.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), dates.length);
      if (inst.options.rangeSelect && dates.length === 1) {
        dates[1] = dates[0];
      }
      return dates;
    },
    /** Update the datepicker display.
    	@memberof CalendarsPicker
    	@private
    	@param {Event|Element} elem A focus event or the control to use.
    	@param {boolean} hidden <code>true</code> to initially hide the datepicker. */
    _update: function _update(elem, hidden) {
      elem = $(elem.target || elem);
      var inst = plugin._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        if (inst.inline || plugin.curInst === inst) {
          if ($.isFunction(inst.options.onChangeMonthYear) && (!inst.prevDate || inst.prevDate.year() !== inst.drawDate.year() || inst.prevDate.month() !== inst.drawDate.month())) {
            inst.options.onChangeMonthYear.apply(elem[0], [inst.drawDate.year(), inst.drawDate.month()]);
          }
        }
        if (inst.inline) {
          var index = $('a, :input', elem).index($(':focus', elem));
          elem.html(this._generateContent(elem[0], inst));
          var focus = elem.find('a, :input');
          focus.eq(Math.max(Math.min(index, focus.length - 1), 0)).focus();
        } else if (plugin.curInst === inst) {
          if (!inst.div) {
            inst.div = $('<div></div>').addClass(this._popupClass).css({
              display: hidden ? 'none' : 'static',
              position: 'absolute',
              left: elem.offset().left,
              top: elem.offset().top + elem.outerHeight()
            }).appendTo($(inst.options.popupContainer || 'body'));
            if ($.fn.mousewheel) {
              inst.div.mousewheel(this._doMouseWheel);
            }
          }
          inst.div.html(this._generateContent(elem[0], inst));
          elem.focus();
        }
      }
    },
    /** Update the input field and any alternate field with the current dates.
    	@memberof CalendarsPicker
    	@private
    	@param {Element} elem The control to use.
    	@param {boolean} keyUp <code>true</code> if coming from <code>keyUp</code> processing (internal). */
    _updateInput: function _updateInput(elem, keyUp) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        var value = '';
        var altValue = '';
        var sep = inst.options.multiSelect ? inst.options.multiSeparator : inst.options.rangeSeparator;
        var calendar = inst.options.calendar;
        var dateFormat = inst.get('dateFormat');
        var altFormat = inst.options.altFormat || dateFormat;
        var settings = {
          localNumbers: inst.options.localNumbers
        };
        for (var i = 0; i < inst.selectedDates.length; i++) {
          value += keyUp ? '' : (i > 0 ? sep : '') + calendar.formatDate(dateFormat, inst.selectedDates[i], settings);
          altValue += (i > 0 ? sep : '') + calendar.formatDate(altFormat, inst.selectedDates[i], settings);
        }
        if (!inst.inline && !keyUp) {
          $(elem).val(value);
        }
        $(inst.options.altField).val(altValue);
        if ($.isFunction(inst.options.onSelect) && !keyUp && !inst.inSelect) {
          inst.inSelect = true; // Prevent endless loops
          inst.options.onSelect.apply(elem, [inst.selectedDates]);
          inst.inSelect = false;
        }
        $(elem).change();
      }
    },
    /** Retrieve the size of left and top borders for an element.
    	@memberof CalendarsPicker
    	@private
    	@param {jQuery} elem The element of interest.
    	@return {number[]} The left and top borders. */
    _getBorders: function _getBorders(elem) {
      var convert = function convert(value) {
        return {
          thin: 1,
          medium: 3,
          thick: 5
        }[value] || value;
      };
      return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))];
    },
    /** Check positioning to remain on the screen.
    	@memberof CalendarsPicker
    	@private
    	@param {object} inst The current instance settings.
    	@return {object} The updated offset for the datepicker. */
    _checkOffset: function _checkOffset(inst) {
      var base = inst.elem.is(':hidden') && inst.trigger ? inst.trigger : inst.elem;
      var offset = base.offset();
      var browserWidth = $(window).width();
      var browserHeight = $(window).height();
      if (browserWidth === 0) {
        return offset;
      }
      var isFixed = false;
      $(inst.elem).parents().each(function () {
        isFixed = isFixed || $(this).css('position') === 'fixed';
        return !isFixed;
      });
      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      var above = offset.top - (isFixed ? scrollY : 0) - inst.div.outerHeight();
      var below = offset.top - (isFixed ? scrollY : 0) + base.outerHeight();
      var alignL = offset.left - (isFixed ? scrollX : 0);
      var alignR = offset.left - (isFixed ? scrollX : 0) + base.outerWidth() - inst.div.outerWidth();
      var tooWide = offset.left - scrollX + inst.div.outerWidth() > browserWidth;
      var tooHigh = offset.top - scrollY + inst.elem.outerHeight() + inst.div.outerHeight() > browserHeight;
      inst.div.css('position', isFixed ? 'fixed' : 'absolute');
      var alignment = inst.options.alignment;
      if (alignment === 'topLeft') {
        offset = {
          left: alignL,
          top: above
        };
      } else if (alignment === 'topRight') {
        offset = {
          left: alignR,
          top: above
        };
      } else if (alignment === 'bottomLeft') {
        offset = {
          left: alignL,
          top: below
        };
      } else if (alignment === 'bottomRight') {
        offset = {
          left: alignR,
          top: below
        };
      } else if (alignment === 'top') {
        offset = {
          left: inst.options.isRTL || tooWide ? alignR : alignL,
          top: above
        };
      } else {
        // bottom
        offset = {
          left: inst.options.isRTL || tooWide ? alignR : alignL,
          top: tooHigh ? above : below
        };
      }
      offset.left = Math.max(isFixed ? 0 : scrollX, offset.left);
      offset.top = Math.max(isFixed ? 0 : scrollY, offset.top);
      return offset;
    },
    /** Close date picker if clicked elsewhere.
    	@memberof CalendarsPicker
    	@private
    	@param {MouseEvent} event The mouse click to check. */
    _checkExternalClick: function _checkExternalClick(event) {
      if (!plugin.curInst) {
        return;
      }
      var elem = $(event.target);
      if (elem.closest('.' + plugin._popupClass + ',.' + plugin._triggerClass).length === 0 && !elem.hasClass(plugin._getMarker())) {
        plugin.hide(plugin.curInst);
      }
    },
    /** Hide a popup datepicker.
    	@memberof CalendarsPicker
    	@param {Element|object} elem The control to use or the current instance settings.
    	@param {boolean} immediate <code>true</code> to close immediately without animation (internal).
    	@example $(selector).datepick('hide') */
    hide: function hide(elem, immediate) {
      if (!elem) {
        return;
      }
      var inst = this._getInst(elem);
      if ($.isEmptyObject(inst)) {
        inst = elem;
      }
      if (inst && inst === plugin.curInst) {
        var showAnim = immediate ? '' : inst.options.showAnim;
        var showSpeed = inst.options.showSpeed;
        showSpeed = showSpeed === 'normal' && $.ui && parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed;
        var postProcess = function postProcess() {
          if (!inst.div) {
            return;
          }
          inst.div.remove();
          inst.div = null;
          plugin.curInst = null;
          if ($.isFunction(inst.options.onClose)) {
            inst.options.onClose.apply(elem, [inst.selectedDates]);
          }
        };
        inst.div.stop();
        if ($.effects && ($.effects[showAnim] || $.effects.effect && $.effects.effect[showAnim])) {
          inst.div.hide(showAnim, inst.options.showOptions, showSpeed, postProcess);
        } else {
          var hideAnim = showAnim === 'slideDown' ? 'slideUp' : showAnim === 'fadeIn' ? 'fadeOut' : 'hide';
          inst.div[hideAnim](showAnim ? showSpeed : '', postProcess);
        }
        if (!showAnim) {
          postProcess();
        }
      }
    },
    /** Handle keystrokes in the datepicker.
    	@memberof CalendarsPicker
    	@private
    	@param {KeyEvent} event The keystroke.
    	@return {boolean} <code>true</code> if not handled, <code>false</code> if handled. */
    _keyDown: function _keyDown(event) {
      var elem = event.data && event.data.elem || event.target;
      var inst = plugin._getInst(elem);
      var handled = false;
      var command;
      if (inst.inline || inst.div) {
        if (event.keyCode === 9) {
          // Tab - close
          plugin.hide(elem);
        } else if (event.keyCode === 13) {
          // Enter - select
          plugin.selectDate(elem, $('a.' + inst.options.renderer.highlightedClass, inst.div)[0]);
          handled = true;
        } else {
          // Command keystrokes
          var commands = inst.options.commands;
          for (var name in commands) {
            if (inst.options.commands.hasOwnProperty(name)) {
              command = commands[name];
              /* jshint -W018 */ // Dislikes !!
              if (command.keystroke.keyCode === event.keyCode && !!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) && !!command.keystroke.altKey === event.altKey && !!command.keystroke.shiftKey === event.shiftKey) {
                /* jshint +W018 */
                plugin.performAction(elem, name);
                handled = true;
                break;
              }
            }
          }
        }
      } else {
        // Show on 'current' keystroke
        command = inst.options.commands.current;
        /* jshint -W018 */ // Dislikes !!
        if (command.keystroke.keyCode === event.keyCode && !!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) && !!command.keystroke.altKey === event.altKey && !!command.keystroke.shiftKey === event.shiftKey) {
          /* jshint +W018 */
          plugin.show(elem);
          handled = true;
        }
      }
      inst.ctrlKey = event.keyCode < 48 && event.keyCode !== 32 || event.ctrlKey || event.metaKey;
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
      return !handled;
    },
    /** Filter keystrokes in the datepicker.
    	@memberof CalendarsPicker
    	@private
    	@param {KeyEvent} event The keystroke.
    	@return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
    _keyPress: function _keyPress(event) {
      var inst = plugin._getInst(event.data && event.data.elem || event.target);
      if (!$.isEmptyObject(inst) && inst.options.constrainInput) {
        var ch = String.fromCharCode(event.keyCode || event.charCode);
        var allowedChars = plugin._allowedChars(inst);
        return event.metaKey || inst.ctrlKey || ch < ' ' || !allowedChars || allowedChars.indexOf(ch) > -1;
      }
      return true;
    },
    /** Determine the set of characters allowed by the date format.
    	@memberof CalendarsPicker
    	@private
    	@param {object} inst The current instance settings.
    	@return {string} The set of allowed characters, or <code>null</code> if anything allowed. */
    _allowedChars: function _allowedChars(inst) {
      var allowedChars = inst.options.multiSelect ? inst.options.multiSeparator : inst.options.rangeSelect ? inst.options.rangeSeparator : '';
      var literal = false;
      var hasNum = false;
      var dateFormat = inst.get('dateFormat');
      for (var i = 0; i < dateFormat.length; i++) {
        var ch = dateFormat.charAt(i);
        if (literal) {
          if (ch === '\'' && dateFormat.charAt(i + 1) !== '\'') {
            literal = false;
          } else {
            allowedChars += ch;
          }
        } else {
          switch (ch) {
            case 'd':
            case 'm':
            case 'o':
            case 'w':
              allowedChars += hasNum ? '' : '0123456789';
              hasNum = true;
              break;
            case 'y':
            case '@':
            case '!':
              allowedChars += (hasNum ? '' : '0123456789') + '-';
              hasNum = true;
              break;
            case 'J':
              allowedChars += (hasNum ? '' : '0123456789') + '-.';
              hasNum = true;
              break;
            case 'D':
            case 'M':
            case 'Y':
              return null;
            // Accept anything
            case '\'':
              if (dateFormat.charAt(i + 1) === '\'') {
                allowedChars += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              allowedChars += ch;
          }
        }
      }
      return allowedChars;
    },
    /** Synchronise datepicker with the field.
    	@memberof CalendarsPicker
    	@private
    	@param {KeyEvent} event The keystroke.
    	@return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
    _keyUp: function _keyUp(event) {
      var elem = event.data && event.data.elem || event.target;
      var inst = plugin._getInst(elem);
      if (!$.isEmptyObject(inst) && !inst.ctrlKey && inst.lastVal !== inst.elem.val()) {
        try {
          var dates = plugin._extractDates(inst, inst.elem.val());
          if (dates.length > 0) {
            plugin.setDate(elem, dates, null, true);
          }
        } catch (e) {
          // Ignore
        }
      }
      return true;
    },
    /** Increment/decrement month/year on mouse wheel activity.
    	@memberof CalendarsPicker
    	@private
    	@param {event} event The mouse wheel event.
    	@param {number} delta The amount of change. */
    _doMouseWheel: function _doMouseWheel(event, delta) {
      var elem = plugin.curInst && plugin.curInst.elem[0] || $(event.target).closest('.' + plugin._getMarker())[0];
      if (plugin.isDisabled(elem)) {
        return;
      }
      var inst = plugin._getInst(elem);
      if (inst.options.useMouseWheel) {
        delta = delta < 0 ? -1 : +1;
        plugin.changeMonth(elem, -inst.options[event.ctrlKey ? 'monthsToJump' : 'monthsToStep'] * delta);
      }
      event.preventDefault();
    },
    /** Clear an input and close a popup datepicker.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to use.
    	@example $(selector).datepick('clear') */
    clear: function clear(elem) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        inst.selectedDates = [];
        this.hide(elem);
        var defaultDate = inst.get('defaultDate');
        if (inst.options.selectDefaultDate && defaultDate) {
          this.setDate(elem, (defaultDate || inst.options.calendar.today()).newDate());
        } else {
          this._updateInput(elem);
        }
      }
    },
    /** Retrieve the selected date(s) for a datepicker.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to examine.
    	@return {CDate[]} The selected date(s).
    	@example var dates = $(selector).datepick('getDate') */
    getDate: function getDate(elem) {
      var inst = this._getInst(elem);
      return !$.isEmptyObject(inst) ? inst.selectedDates : [];
    },
    /** Set the selected date(s) for a datepicker.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to examine.
    	@param {CDate|number|string|array} dates The selected date(s).
    	@param {CDate|number|string} [endDate] The ending date for a range.
    	@param {boolean} [keyUp] <code>true</code> if coming from <code>keyUp</code> processing (internal).
    	@param {boolean} [setOpt] <code>true</code> if coming from option processing (internal).
    	@example $(selector).datepick('setDate', new Date(2014, 12-1, 25))
    $(selector).datepick('setDate', '12/25/2014', '01/01/2015')
    $(selector).datepick('setDate', [date1, date2, date3]) */
    setDate: function setDate(elem, dates, endDate, keyUp, setOpt) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        if (!$.isArray(dates)) {
          dates = [dates];
          if (endDate) {
            dates.push(endDate);
          }
        }
        var minDate = inst.get('minDate');
        var maxDate = inst.get('maxDate');
        var curDate = inst.selectedDates[0];
        inst.selectedDates = [];
        for (var i = 0; i < dates.length; i++) {
          var date = inst.options.calendar.determineDate(dates[i], null, curDate, inst.get('dateFormat'), inst.getConfig());
          if (date) {
            if ((!minDate || date.compareTo(minDate) !== -1) && (!maxDate || date.compareTo(maxDate) !== +1)) {
              var found = false;
              for (var j = 0; j < inst.selectedDates.length; j++) {
                if (inst.selectedDates[j].compareTo(date) === 0) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                inst.selectedDates.push(date);
              }
            }
          }
        }
        inst.selectedDates.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), inst.selectedDates.length);
        if (inst.options.rangeSelect) {
          switch (inst.selectedDates.length) {
            case 1:
              inst.selectedDates[1] = inst.selectedDates[0];
              break;
            case 2:
              inst.selectedDates[1] = inst.selectedDates[0].compareTo(inst.selectedDates[1]) === +1 ? inst.selectedDates[0] : inst.selectedDates[1];
              break;
          }
          inst.pickingRange = false;
        }
        inst.prevDate = inst.drawDate ? inst.drawDate.newDate() : null;
        inst.drawDate = this._checkMinMax((inst.selectedDates[0] || inst.get('defaultDate') || inst.options.calendar.today()).newDate(), inst);
        if (!setOpt) {
          this._update(elem);
          this._updateInput(elem, keyUp);
        }
      }
    },
    /** Determine whether a date is selectable for this datepicker.
    	@memberof CalendarsPicker
    	@private
    	@param {Element} elem The control to check.
    	@param {CDate|string|number} date The date to check.
    	@return {boolean} <code>true</code> if selectable, <code>false</code> if not.
    	@example var selectable = $(selector).datepick('isSelectable', date) */
    isSelectable: function isSelectable(elem, date) {
      var inst = this._getInst(elem);
      if ($.isEmptyObject(inst)) {
        return false;
      }
      date = inst.options.calendar.determineDate(date, inst.selectedDates[0] || inst.options.calendar.today(), null, inst.options.dateFormat, inst.getConfig());
      return this._isSelectable(elem, date, inst.options.onDate, inst.get('minDate'), inst.get('maxDate'));
    },
    /** Internally determine whether a date is selectable for this datepicker.
    	@memberof CalendarsPicker
    	@private
    	@param {Element} elem The control to check.
    	@param {CDate} date The date to check.
    	@param {function|boolean} onDate Any <code>onDate</code> callback or <code>callback.selectable</code>.
    	@param {CDate} minDate The minimum allowed date.
    	@param {CDate} maxDate The maximum allowed date.
    	@return {boolean} <code>true</code> if selectable, <code>false</code> if not. */
    _isSelectable: function _isSelectable(elem, date, onDate, minDate, maxDate) {
      var dateInfo = typeof onDate === 'boolean' ? {
        selectable: onDate
      } : !$.isFunction(onDate) ? {} : onDate.apply(elem, [date, true]);
      return dateInfo.selectable !== false && (!minDate || date.toJD() >= minDate.toJD()) && (!maxDate || date.toJD() <= maxDate.toJD());
    },
    /** Perform a named action for a datepicker.
    	@memberof CalendarsPicker
    	@param {element} elem The control to affect.
    	@param {string} action The name of the {@link CalendarsPicker.commands|action}.
    	@example $(selector).calendarsPicker('performAction', 'next') */
    performAction: function performAction(elem, action) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
        var commands = inst.options.commands;
        if (commands[action] && commands[action].enabled.apply(elem, [inst])) {
          commands[action].action.apply(elem, [inst]);
        }
      }
    },
    /** Set the currently shown month, defaulting to today's.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to affect.
    	@param {number} [year] The year to show.
    	@param {number} [month] The month to show (calendar minimum month to maximum month).
    	@param {number} [day] The day to show.
    	@example $(selector).datepick('showMonth', 2014, 12, 25) */
    showMonth: function showMonth(elem, year, month, day) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst) && (typeof day !== 'undefined' && day !== null || inst.drawDate.year() !== year || inst.drawDate.month() !== month)) {
        inst.prevDate = inst.drawDate.newDate();
        var calendar = inst.options.calendar;
        var show = this._checkMinMax(typeof year !== 'undefined' && year !== null ? calendar.newDate(year, month, 1) : calendar.today(), inst);
        inst.drawDate.date(show.year(), show.month(), typeof day !== 'undefined' && day !== null ? day : Math.min(inst.drawDate.day(), calendar.daysInMonth(show.year(), show.month())));
        this._update(elem);
      }
    },
    /** Adjust the currently shown month.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to affect.
    	@param {number} offset The number of months to change by.
    	@example $(selector).datepick('changeMonth', 2)*/
    changeMonth: function changeMonth(elem, offset) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        var date = inst.drawDate.newDate().add(offset, 'm');
        this.showMonth(elem, date.year(), date.month());
      }
    },
    /** Adjust the currently shown day.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to affect.
    	@param {number} offset The number of days to change by.
    	@example $(selector).datepick('changeDay', 7)*/
    changeDay: function changeDay(elem, offset) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst)) {
        var date = inst.drawDate.newDate().add(offset, 'd');
        this.showMonth(elem, date.year(), date.month(), date.day());
      }
    },
    /** Restrict a date to the minimum/maximum specified.
    	@memberof CalendarsPicker
    	@private
    	@param {CDate} date The date to check.
    	@param {object} inst The current instance settings. */
    _checkMinMax: function _checkMinMax(date, inst) {
      var minDate = inst.get('minDate');
      var maxDate = inst.get('maxDate');
      date = minDate && date.compareTo(minDate) === -1 ? minDate.newDate() : date;
      date = maxDate && date.compareTo(maxDate) === +1 ? maxDate.newDate() : date;
      return date;
    },
    /** Retrieve the date associated with an entry in the datepicker.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to examine.
    	@param {Element} target The selected datepicker element.
    	@return {CDate} The corresponding date, or <code>null</code>.
    	@example var date = $(selector).datepick('retrieveDate',
    $('div.datepick-popup a:contains(10)')[0]) */
    retrieveDate: function retrieveDate(elem, target) {
      var inst = this._getInst(elem);
      return $.isEmptyObject(inst) ? null : inst.options.calendar.fromJD(parseFloat(target.className.replace(/^.*jd(\d+\.5).*$/, '$1')));
    },
    /** Select a date for this datepicker.
    	@memberof CalendarsPicker
    	@param {Element} elem The control to examine.
    	@param {Element} target The selected datepicker element.
    	@example $(selector).datepick('selectDate', $('div.datepick-popup a:contains(10)')[0]) */
    selectDate: function selectDate(elem, target) {
      var inst = this._getInst(elem);
      if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
        var date = this.retrieveDate(elem, target);
        if (inst.options.multiSelect) {
          var found = false;
          for (var i = 0; i < inst.selectedDates.length; i++) {
            if (date.compareTo(inst.selectedDates[i]) === 0) {
              inst.selectedDates.splice(i, 1);
              found = true;
              break;
            }
          }
          if (!found && inst.selectedDates.length < inst.options.multiSelect) {
            inst.selectedDates.push(date);
          }
        } else if (inst.options.rangeSelect) {
          if (inst.pickingRange) {
            inst.selectedDates[1] = date;
          } else {
            inst.selectedDates = [date, date];
          }
          inst.pickingRange = !inst.pickingRange;
        } else {
          inst.selectedDates = [date];
        }
        inst.prevDate = inst.drawDate = date.newDate();
        this._updateInput(elem);
        if (inst.inline || inst.pickingRange || inst.selectedDates.length < (inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1))) {
          this._update(elem);
        } else {
          this.hide(elem);
        }
      }
    },
    /** Generate the datepicker content for this control.
    	@memberof CalendarsPicker
    	@private
    	@param {Element} elem The control to affect.
    	@param {object} inst The current instance settings.
    	@return {jQuery} The datepicker content */
    _generateContent: function _generateContent(elem, inst) {
      var monthsToShow = inst.options.monthsToShow;
      monthsToShow = $.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow];
      inst.drawDate = this._checkMinMax(inst.drawDate || inst.get('defaultDate') || inst.options.calendar.today(), inst);
      var drawDate = inst.drawDate.newDate().add(-inst.options.monthsOffset, 'm');
      // Generate months
      var monthRows = '';
      for (var row = 0; row < monthsToShow[0]; row++) {
        var months = '';
        for (var col = 0; col < monthsToShow[1]; col++) {
          months += this._generateMonth(elem, inst, drawDate.year(), drawDate.month(), inst.options.calendar, inst.options.renderer, row === 0 && col === 0);
          drawDate.add(1, 'm');
        }
        monthRows += this._prepare(inst.options.renderer.monthRow, inst).replace(/\{months\}/, months);
      }
      var picker = this._prepare(inst.options.renderer.picker, inst).replace(/\{months\}/, monthRows).replace(/\{weekHeader\}/g, this._generateDayHeaders(inst, inst.options.calendar, inst.options.renderer));
      // Add commands
      var addCommand = function addCommand(type, open, close, name, classes) {
        if (picker.indexOf('{' + type + ':' + name + '}') === -1) {
          return;
        }
        var command = inst.options.commands[name];
        var date = inst.options.commandsAsDateFormat ? command.date.apply(elem, [inst]) : null;
        picker = picker.replace(new RegExp('\\{' + type + ':' + name + '\\}', 'g'), '<' + open + (command.status ? ' title="' + inst.options[command.status] + '"' : '') + ' class="' + inst.options.renderer.commandClass + ' ' + inst.options.renderer.commandClass + '-' + name + ' ' + classes + (command.enabled(inst) ? '' : ' ' + inst.options.renderer.disabledClass) + '">' + (date ? date.formatDate(inst.options[command.text], {
          localNumbers: inst.options.localNumbers
        }) : inst.options[command.text]) + '</' + close + '>');
      };
      for (var name in inst.options.commands) {
        if (inst.options.commands.hasOwnProperty(name)) {
          addCommand('button', 'button type="button"', 'button', name, inst.options.renderer.commandButtonClass);
          addCommand('link', 'a href="javascript:void(0)"', 'a', name, inst.options.renderer.commandLinkClass);
        }
      }
      picker = $(picker);
      if (monthsToShow[1] > 1) {
        var count = 0;
        $(inst.options.renderer.monthSelector, picker).each(function () {
          var nth = ++count % monthsToShow[1];
          $(this).addClass(nth === 1 ? 'first' : nth === 0 ? 'last' : '');
        });
      }
      // Add datepicker behaviour
      var self = this;
      function removeHighlight(elem) {
        (inst.inline ? $(elem).closest('.' + self._getMarker()) : inst.div).find(inst.options.renderer.daySelector + ' a').removeClass(inst.options.renderer.highlightedClass);
      }
      picker.find(inst.options.renderer.daySelector + ' a').hover(function () {
        removeHighlight(this);
        $(this).addClass(inst.options.renderer.highlightedClass);
      }, function () {
        removeHighlight(this);
      }).click(function () {
        self.selectDate(elem, this);
      }).end().find('select.' + this._monthYearClass + ':not(.' + this._anyYearClass + ')').change(function () {
        var monthYear = $(this).val().split('/');
        self.showMonth(elem, parseInt(monthYear[1], 10), parseInt(monthYear[0], 10));
      }).end().find('select.' + this._anyYearClass).click(function () {
        $(this).css('visibility', 'hidden').next('input').css({
          left: this.offsetLeft,
          top: this.offsetTop,
          width: this.offsetWidth,
          height: this.offsetHeight
        }).show().focus();
      }).end().find('input.' + self._monthYearClass).change(function () {
        try {
          var year = parseInt($(this).val(), 10);
          year = isNaN(year) ? inst.drawDate.year() : year;
          self.showMonth(elem, year, inst.drawDate.month(), inst.drawDate.day());
        } catch (e) {
          // Ignore
        }
      }).keydown(function (event) {
        if (event.keyCode === 13) {
          // Enter
          $(event.elem).change();
        } else if (event.keyCode === 27) {
          // Escape
          $(event.elem).hide().prev('select').css('visibility', 'visible');
          inst.elem.focus();
        }
      });
      // Add keyboard handling
      var data = {
        elem: inst.elem[0]
      };
      picker.keydown(data, this._keyDown).keypress(data, this._keyPress).keyup(data, this._keyUp);
      // Add command behaviour
      picker.find('.' + inst.options.renderer.commandClass).click(function () {
        if (!$(this).hasClass(inst.options.renderer.disabledClass)) {
          var action = this.className.replace(new RegExp('^.*' + inst.options.renderer.commandClass + '-([^ ]+).*$'), '$1');
          plugin.performAction(elem, action);
        }
      });
      // Add classes
      if (inst.options.isRTL) {
        picker.addClass(inst.options.renderer.rtlClass);
      }
      if (monthsToShow[0] * monthsToShow[1] > 1) {
        picker.addClass(inst.options.renderer.multiClass);
      }
      if (inst.options.pickerClass) {
        picker.addClass(inst.options.pickerClass);
      }
      // Resize
      $('body').append(picker);
      var width = 0;
      picker.find(inst.options.renderer.monthSelector).each(function () {
        width += $(this).outerWidth();
      });
      picker.width(width / monthsToShow[0]);
      // Pre-show customisation
      if ($.isFunction(inst.options.onShow)) {
        inst.options.onShow.apply(elem, [picker, inst.options.calendar, inst]);
      }
      return picker;
    },
    /** Generate the content for a single month.
    	@memberof CalendarsPicker
    	@private
    	@param {Element} elem The control to affect.
    	@param {object} inst The current instance settings.
    	@param {number} year The year to generate.
    	@param {number} month The month to generate.
    	@param {BaseCalendar} calendar The current calendar.
    	@param {object} renderer The rendering templates.
    	@param {boolean} first <code>true</code> if first of multiple months.
    	@return {string} The month content. */
    _generateMonth: function _generateMonth(elem, inst, year, month, calendar, renderer, first) {
      var daysInMonth = calendar.daysInMonth(year, month);
      var monthsToShow = inst.options.monthsToShow;
      monthsToShow = $.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow];
      var fixedWeeks = inst.options.fixedWeeks || monthsToShow[0] * monthsToShow[1] > 1;
      var firstDay = inst.options.firstDay;
      firstDay = typeof firstDay === 'undefined' || firstDay === null ? calendar.local.firstDay : firstDay;
      var leadDays = (calendar.dayOfWeek(year, month, calendar.minDay) - firstDay + calendar.daysInWeek()) % calendar.daysInWeek();
      var numWeeks = fixedWeeks ? 6 : Math.ceil((leadDays + daysInMonth) / calendar.daysInWeek());
      var selectOtherMonths = inst.options.selectOtherMonths && inst.options.showOtherMonths;
      var minDate = inst.pickingRange ? inst.selectedDates[0] : inst.get('minDate');
      var maxDate = inst.get('maxDate');
      var showWeeks = renderer.week.indexOf('{weekOfYear}') > -1;
      var today = calendar.today();
      var drawDate = calendar.newDate(year, month, calendar.minDay);
      drawDate.add(-leadDays - (fixedWeeks && (drawDate.dayOfWeek() === firstDay || drawDate.daysInMonth() < calendar.daysInWeek()) ? calendar.daysInWeek() : 0), 'd');
      var jd = drawDate.toJD();
      // Localise numbers if requested and available
      var localiseNumbers = function localiseNumbers(value) {
        return inst.options.localNumbers && calendar.local.digits ? calendar.local.digits(value) : value;
      };
      // Generate weeks
      var weeks = '';
      for (var week = 0; week < numWeeks; week++) {
        var weekOfYear = !showWeeks ? '' : '<span class="jd' + jd + '">' + ($.isFunction(inst.options.calculateWeek) ? inst.options.calculateWeek(drawDate) : drawDate.weekOfYear()) + '</span>';
        var days = '';
        for (var day = 0; day < calendar.daysInWeek(); day++) {
          var selected = false;
          if (inst.options.rangeSelect && inst.selectedDates.length > 0) {
            selected = drawDate.compareTo(inst.selectedDates[0]) !== -1 && drawDate.compareTo(inst.selectedDates[1]) !== +1;
          } else {
            for (var i = 0; i < inst.selectedDates.length; i++) {
              if (inst.selectedDates[i].compareTo(drawDate) === 0) {
                selected = true;
                break;
              }
            }
          }
          var dateInfo = !$.isFunction(inst.options.onDate) ? {} : inst.options.onDate.apply(elem, [drawDate, drawDate.month() === month]);
          var selectable = (selectOtherMonths || drawDate.month() === month) && this._isSelectable(elem, drawDate, dateInfo.selectable, minDate, maxDate);
          days += this._prepare(renderer.day, inst).replace(/\{day\}/g, (selectable ? '<a href="javascript:void(0)"' : '<span') + ' class="jd' + jd + ' ' + (dateInfo.dateClass || '') + (selected && (selectOtherMonths || drawDate.month() === month) ? ' ' + renderer.selectedClass : '') + (selectable ? ' ' + renderer.defaultClass : '') + (drawDate.weekDay() ? '' : ' ' + renderer.weekendClass) + (drawDate.month() === month ? '' : ' ' + renderer.otherMonthClass) + (drawDate.compareTo(today) === 0 && drawDate.month() === month ? ' ' + renderer.todayClass : '') + (drawDate.compareTo(inst.drawDate) === 0 && drawDate.month() === month ? ' ' + renderer.highlightedClass : '') + '"' + (dateInfo.title || inst.options.dayStatus && selectable ? ' title="' + (dateInfo.title || drawDate.formatDate(inst.options.dayStatus, {
            localNumbers: inst.options.localNumbers
          })) + '"' : '') + '>' + (inst.options.showOtherMonths || drawDate.month() === month ? dateInfo.content || localiseNumbers(drawDate.day()) : '&#160;') + (selectable ? '</a>' : '</span>'));
          drawDate.add(1, 'd');
          jd++;
        }
        weeks += this._prepare(renderer.week, inst).replace(/\{days\}/g, days).replace(/\{weekOfYear\}/g, weekOfYear);
      }
      var monthHeader = this._prepare(renderer.month, inst).match(/\{monthHeader(:[^\}]+)?\}/);
      monthHeader = monthHeader[0].length <= 13 ? 'MM yyyy' : monthHeader[0].substring(13, monthHeader[0].length - 1);
      monthHeader = first ? this._generateMonthSelection(inst, year, month, minDate, maxDate, monthHeader, calendar, renderer) : calendar.formatDate(monthHeader, calendar.newDate(year, month, calendar.minDay), {
        localNumbers: inst.options.localNumbers
      });
      var weekHeader = this._prepare(renderer.weekHeader, inst).replace(/\{days\}/g, this._generateDayHeaders(inst, calendar, renderer));
      return this._prepare(renderer.month, inst).replace(/\{monthHeader(:[^\}]+)?\}/g, monthHeader).replace(/\{weekHeader\}/g, weekHeader).replace(/\{weeks\}/g, weeks);
    },
    /** Generate the HTML for the day headers.
    	@memberof CalendarsPicker
    	@private
    	@param {object} inst The current instance settings.
    	@param {BaseCalendar} calendar The current calendar.
    	@param {object} renderer The rendering templates.
    	@return {string} A week's worth of day headers. */
    _generateDayHeaders: function _generateDayHeaders(inst, calendar, renderer) {
      var firstDay = inst.options.firstDay;
      firstDay = typeof firstDay === 'undefined' || firstDay === null ? calendar.local.firstDay : firstDay;
      var header = '';
      for (var day = 0; day < calendar.daysInWeek(); day++) {
        var dow = (day + firstDay) % calendar.daysInWeek();
        header += this._prepare(renderer.dayHeader, inst).replace(/\{day\}/g, '<span class="' + this._curDoWClass + dow + '" title="' + calendar.local.dayNames[dow] + '">' + calendar.local.dayNamesMin[dow] + '</span>');
      }
      return header;
    },
    /** Generate the selection controls for a month.
    	@memberof CalendarsPicker
    	@private
    	@param {object} inst The current instance settings.
    	@param {number} year The year to generate.
    	@param {number} month The month to generate.
    	@param {CDate} minDate The minimum date allowed.
    	@param {CDate} maxDate The maximum date allowed.
    	@param {string} monthHeader The month/year format.
    	@param {BaseCalendar} calendar The current calendar.
    	@return {string} The month selection content. */
    _generateMonthSelection: function _generateMonthSelection(inst, year, month, minDate, maxDate, monthHeader, calendar) {
      if (!inst.options.changeMonth) {
        return calendar.formatDate(monthHeader, calendar.newDate(year, month, 1), {
          localNumbers: inst.options.localNumbers
        });
      }
      // Months
      var monthNames = calendar.local['monthNames' + (monthHeader.match(/mm/i) ? '' : 'Short')];
      var html = monthHeader.replace(/m+/i, '\\x2E').replace(/y+/i, '\\x2F');
      var selector = '<select class="' + this._monthYearClass + '" title="' + inst.options.monthStatus + '">';
      var maxMonth = calendar.monthsInYear(year) + calendar.minMonth;
      for (var m = calendar.minMonth; m < maxMonth; m++) {
        if ((!minDate || calendar.newDate(year, m, calendar.daysInMonth(year, m) - 1 + calendar.minDay).compareTo(minDate) !== -1) && (!maxDate || calendar.newDate(year, m, calendar.minDay).compareTo(maxDate) !== +1)) {
          selector += '<option value="' + m + '/' + year + '"' + (month === m ? ' selected="selected"' : '') + '>' + monthNames[m - calendar.minMonth] + '</option>';
        }
      }
      selector += '</select>';
      html = html.replace(/\\x2E/, selector);
      // Years
      var localiseNumbers = function localiseNumbers(value) {
        return inst.options.localNumbers && calendar.local.digits ? calendar.local.digits(value) : value;
      };
      var yearRange = inst.options.yearRange;
      if (yearRange === 'any') {
        selector = '<select class="' + this._monthYearClass + ' ' + this._anyYearClass + '" title="' + inst.options.yearStatus + '">' + '<option value="' + year + '">' + localiseNumbers(year) + '</option></select>' + '<input class="' + this._monthYearClass + ' ' + this._curMonthClass + month + '" value="' + year + '">';
      } else {
        yearRange = yearRange.split(':');
        var todayYear = calendar.today().year();
        var start = yearRange[0].match('c[+-].*') ? year + parseInt(yearRange[0].substring(1), 10) : (yearRange[0].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[0], 10);
        var end = yearRange[1].match('c[+-].*') ? year + parseInt(yearRange[1].substring(1), 10) : (yearRange[1].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[1], 10);
        selector = '<select class="' + this._monthYearClass + '" title="' + inst.options.yearStatus + '">';
        start = calendar.newDate(start + 1, calendar.firstMonth, calendar.minDay).add(-1, 'd');
        end = calendar.newDate(end, calendar.firstMonth, calendar.minDay);
        var addYear = function addYear(y, yDisplay) {
          if (y !== 0 || calendar.hasYearZero) {
            selector += '<option value="' + Math.min(month, calendar.monthsInYear(y) - 1 + calendar.minMonth) + '/' + y + '"' + (year === y ? ' selected="selected"' : '') + '>' + (yDisplay || localiseNumbers(y)) + '</option>';
          }
        };
        var earlierLater, y;
        if (start.toJD() < end.toJD()) {
          start = (minDate && minDate.compareTo(start) === +1 ? minDate : start).year();
          end = (maxDate && maxDate.compareTo(end) === -1 ? maxDate : end).year();
          earlierLater = Math.floor((end - start) / 2);
          if (!minDate || minDate.year() < start) {
            addYear(start - earlierLater, inst.options.earlierText);
          }
          for (y = start; y <= end; y++) {
            addYear(y);
          }
          if (!maxDate || maxDate.year() > end) {
            addYear(end + earlierLater, inst.options.laterText);
          }
        } else {
          start = (maxDate && maxDate.compareTo(start) === -1 ? maxDate : start).year();
          end = (minDate && minDate.compareTo(end) === +1 ? minDate : end).year();
          earlierLater = Math.floor((start - end) / 2);
          if (!maxDate || maxDate.year() > start) {
            addYear(start + earlierLater, inst.options.earlierText);
          }
          for (y = start; y >= end; y--) {
            addYear(y);
          }
          if (!minDate || minDate.year() < end) {
            addYear(end - earlierLater, inst.options.laterText);
          }
        }
        selector += '</select>';
      }
      html = html.replace(/\\x2F/, selector);
      return html;
    },
    /** Prepare a render template for use.
    	Exclude popup/inline sections that are not applicable.
    	Localise text of the form: {l10n:<em>name</em>}.
    	@memberof CalendarsPicker
    	@private
    	@param {string} text The text to localise.
    	@param {object} inst The current instance settings.
    	@return {string} The localised text. */
    _prepare: function _prepare(text, inst) {
      var replaceSection = function replaceSection(type, retain) {
        while (true) {
          var start = text.indexOf('{' + type + ':start}');
          if (start === -1) {
            return;
          }
          var end = text.substring(start).indexOf('{' + type + ':end}');
          if (end > -1) {
            text = text.substring(0, start) + (retain ? text.substr(start + type.length + 8, end - type.length - 8) : '') + text.substring(start + end + type.length + 6);
          }
        }
      };
      replaceSection('inline', inst.inline);
      replaceSection('popup', !inst.inline);
      var pattern = /\{l10n:([^\}]+)\}/;
      var matches = pattern.exec(text);
      while (matches) {
        text = text.replace(matches[0], inst.options[matches[1]]);
        matches = pattern.exec(text);
      }
      return text;
    }
  });
  var plugin = $.calendarsPicker; // Singleton instance

  $(function () {
    $(document).on('mousedown.' + pluginName, plugin._checkExternalClick).on('resize.' + pluginName, function () {
      plugin.hide(plugin.curInst);
    });
  });
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.coptic-ar.js":
/*!*********************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.coptic-ar.js ***!
  \*********************************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   Arabic localisation for UmmAlQura calendar for jQuery v2.1.0.
   Written by Amro Osama March 2013.
   Updated by Fahad Alqahtani April 2016. */
(function ($) {
  'use strict';

  $.calendars.calendars.coptic.prototype.regionalOptions.ar = {
    name: 'Coptic',
    // The calendar name
    epochs: ['BAM', 'AM'],
    monthNames: ['توت', 'بابة', 'هاتور', 'كياهك', 'طوبة', 'أمشير', 'برمهات', 'برمودة', 'بشنس', 'بؤونة', 'أبيب', 'مسرى', 'نسيئ'],
    monthNamesShort: ['توت', 'بابة', 'هاتور', 'كياهك', 'طوبة', 'أمشير', 'برمهات', 'برمودة', 'بشنس', 'بؤونة', 'أبيب', 'مسرى', 'نسيئ'],
    dayNames: ['Tkyriaka', 'Pesnau', 'Pshoment', 'Peftoou', 'Ptiou', 'Psoou', 'Psabbaton'],
    dayNamesShort: ['Tky', 'Pes', 'Psh', 'Pef', 'Pti', 'Pso', 'Psa'],
    dayNamesMin: ['Tk', 'Pes', 'Psh', 'Pef', 'Pt', 'Pso', 'Psa'],
    digits: null,
    dateFormat: 'yyyy/MM/dd',
    firstDay: 1,
    isRTL: true
  };
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.coptic.js":
/*!******************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.coptic.js ***!
  \******************************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   Coptic calendar for jQuery v2.1.0.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  /** Implementation of the Coptic calendar.
  	See <a href="http://en.wikipedia.org/wiki/Coptic_calendar">http://en.wikipedia.org/wiki/Coptic_calendar</a>.
  	See also Calendrical Calculations: The Millennium Edition
  	(<a href="http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml">http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml</a>).
  	@class CopticCalendar
  	@param {string} [language=''] The language code (default English) for localisation. */
  function CopticCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
  }
  CopticCalendar.prototype = new $.calendars.baseCalendar();
  $.extend(CopticCalendar.prototype, {
    /** The calendar name.
    	@memberof CopticCalendar */
    name: 'Coptic',
    /** Julian date of start of Coptic epoch: 29 August 284 CE (Gregorian).
    	@memberof CopticCalendar */
    jdEpoch: 1825029.5,
    /** Days per month in a common year.
    	@memberof CopticCalendar */
    daysPerMonth: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
    	@memberof CopticCalendar */
    hasYearZero: false,
    /** The minimum month number.
    	@memberof CopticCalendar */
    minMonth: 1,
    /** The first month in the year.
    	@memberof CopticCalendar */
    firstMonth: 1,
    /** The minimum day number.
    	@memberof CopticCalendar */
    minDay: 1,
    /** Localisations for the plugin.
    	Entries are objects indexed by the language code ('' being the default US/English).
    	Each object has the following attributes.
    	@memberof CopticCalendar
    	@property {string} name The calendar name.
    	@property {string[]} epochs The epoch names (before/after year 0).
    	@property {string[]} monthNames The long names of the months of the year.
    	@property {string[]} monthNamesShort The short names of the months of the year.
    	@property {string[]} dayNames The long names of the days of the week.
    	@property {string[]} dayNamesShort The short names of the days of the week.
    	@property {string[]} dayNamesMin The minimal names of the days of the week.
    	@property {string} dateFormat The date format for this calendar.
    			See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
    	@property {number} firstDay The number of the first day of the week, starting at 0.
    	@property {boolean} isRTL <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: {
      // Localisations
      '': {
        name: 'Coptic',
        epochs: ['BAM', 'AM'],
        monthNames: ['Thout', 'Paopi', 'Hathor', 'Koiak', 'Tobi', 'Meshir', 'Paremhat', 'Paremoude', 'Pashons', 'Paoni', 'Epip', 'Mesori', 'Pi Kogi Enavot'],
        monthNamesShort: ['Tho', 'Pao', 'Hath', 'Koi', 'Tob', 'Mesh', 'Pat', 'Pad', 'Pash', 'Pao', 'Epi', 'Meso', 'PiK'],
        dayNames: ['Tkyriaka', 'Pesnau', 'Pshoment', 'Peftoou', 'Ptiou', 'Psoou', 'Psabbaton'],
        dayNamesShort: ['Tky', 'Pes', 'Psh', 'Pef', 'Pti', 'Pso', 'Psa'],
        dayNamesMin: ['Tk', 'Pes', 'Psh', 'Pef', 'Pt', 'Pso', 'Psa'],
        digits: null,
        dateFormat: 'dd/mm/yyyy',
        firstDay: 0,
        isRTL: false
      }
    },
    /** Determine whether this date is in a leap year.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@throws Error if an invalid year or a different calendar used. */
    leapYear: function leapYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear);
      year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
      return year % 4 === 3 || year % 4 === -1;
    },
    /** Retrieve the number of months in a year.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of months.
    	@throws Error if an invalid year or a different calendar used. */
    monthsInYear: function monthsInYear(year) {
      this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return 13;
    },
    /** Determine the week of the year for a date.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] the month to examine (if only <code>year</code> specified above).
    	@param {number} [day] The day to examine (if only <code>year</code> specified above).
    	@return {number} The week of the year.
    	@throws Error if an invalid date or a different calendar used. */
    weekOfYear: function weekOfYear(year, month, day) {
      // Find Sunday of this week starting on Sunday
      var checkDate = this.newDate(year, month, day);
      checkDate.add(-checkDate.dayOfWeek(), 'd');
      return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },
    /** Retrieve the number of days in a month.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to examine or the year of the month.
    	@param {number} [month] The month (if only <code>year</code> specified above).
    	@return {number} The number of days in this month.
    	@throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function daysInMonth(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth);
      return this.daysPerMonth[date.month() - 1] + (date.month() === 13 && this.leapYear(date.year()) ? 1 : 0);
    },
    /** Determine whether this date is a week day.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} month The month to examine (if only <code>year</code> specified above).
    	@param {number} day The day to examine (if only <code>year</code> specified above).
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@throws Error if an invalid date or a different calendar used. */
    weekDay: function weekDay(year, month, day) {
      return (this.dayOfWeek(year, month, day) || 7) < 6;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof CopticCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] the month to convert (if only <code>year</code> specified above).
    	@param {number} [day] The day to convert (if only <code>year</code> specified above).
    	@return {number} The equivalent Julian date.
    	@throws Error if an invalid date or a different calendar used. */
    toJD: function toJD(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate);
      year = date.year();
      if (year < 0) {
        year++;
      } // No year zero
      return date.day() + (date.month() - 1) * 30 + (year - 1) * 365 + Math.floor(year / 4) + this.jdEpoch - 1;
    },
    /** Create a new date from a Julian date.
    	@memberof CopticCalendar
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date. */
    fromJD: function fromJD(jd) {
      var c = Math.floor(jd) + 0.5 - this.jdEpoch;
      var year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
      if (year <= 0) {
        year--;
      } // No year zero
      c = Math.floor(jd) + 0.5 - this.newDate(year, 1, 1).toJD();
      var month = Math.floor(c / 30) + 1;
      var day = c - (month - 1) * 30 + 1;
      return this.newDate(year, month, day);
    }
  });

  // Coptic calendar implementation
  $.calendars.calendars.coptic = CopticCalendar;
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.js":
/*!***********************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.js ***!
  \***********************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   Calendars for jQuery v2.1.0.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  function Calendars() {
    this.regionalOptions = [];
    /** Localised values.
    	@memberof Calendars
    	@property {string} [invalidCalendar='Calendar {0} not found']
    		Error message for an unknown calendar.
    	@property {string} [invalidDate='Invalid {0} date']
    		Error message for an invalid date for this calendar.
    	@property {string} [invalidMonth='Invalid {0} month']
    		Error message for an invalid month for this calendar.
    	@property {string} [invalidYear='Invalid {0} year']
    		Error message for an invalid year for this calendar.
    	@property {string} [differentCalendars='Cannot mix {0} and {1} dates']
    		Error message for mixing different calendars. */
    this.regionalOptions[''] = {
      invalidCalendar: 'Calendar {0} not found',
      invalidDate: 'Invalid {0} date',
      invalidMonth: 'Invalid {0} month',
      invalidYear: 'Invalid {0} year',
      differentCalendars: 'Cannot mix {0} and {1} dates'
    };
    this.local = this.regionalOptions[''];
    this.calendars = {};
    this._localCals = {};
  }

  /** Create the calendars plugin.
  	<p>Provides support for various world calendars in a consistent manner.</p>
  	<p>Use the global instance, <code>$.calendars</code>, to access the functionality.</p>
  	@class Calendars
  	@example $.calendars.instance('julian').newDate(2014, 12, 25) */
  $.extend(Calendars.prototype, {
    /** Obtain a calendar implementation and localisation.
    	@memberof Calendars
    	@param {string} [name='gregorian'] The name of the calendar, e.g. 'gregorian', 'persian', 'islamic'.
    	@param {string} [language=''] The language code to use for localisation (default is English).
    	@return {Calendar} The calendar and localisation.
    	@throws Error if calendar not found.
    	@example $.calendars.instance()
    $.calendars.instance('persian')
    $.calendars.instance('hebrew', 'he') */
    instance: function instance(name, language) {
      name = (name || 'gregorian').toLowerCase();
      language = language || '';
      var cal = this._localCals[name + '-' + language];
      if (!cal && this.calendars[name]) {
        cal = new this.calendars[name](language);
        this._localCals[name + '-' + language] = cal;
      }
      if (!cal) {
        throw (this.local.invalidCalendar || this.regionalOptions[''].invalidCalendar).replace(/\{0\}/, name);
      }
      return cal;
    },
    /** Create a new date - for today if no other parameters given.
    	@memberof Calendars
    	@param {CDate|number} [year] The date to copy or the year for the date.
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@param {BaseCalendar|string} [calendar='gregorian'] The underlying calendar or the name of the calendar.
    	@param {string} [language=''] The language to use for localisation (default English).
    	@return {CDate} The new date.
    	@throws Error if an invalid date.
    	@example $.calendars.newDate()
    $.calendars.newDate(otherDate)
    $.calendars.newDate(2001, 1, 1)
    $.calendars.newDate(1379, 10, 12, 'persian') */
    newDate: function newDate(year, month, day, calendar, language) {
      calendar = (typeof year !== 'undefined' && year !== null && year.year ? year.calendar() : typeof calendar === 'string' ? this.instance(calendar, language) : calendar) || this.instance();
      return calendar.newDate(year, month, day);
    },
    /** A simple digit substitution function for localising numbers via the
    	{@linkcode GregorianCalendar.regionalOptions|Calendar digits} option.
    	@memberof Calendars
    	@param {string[]} digits The substitute digits, for 0 through 9.
    	@return {CalendarsDigits} The substitution function.
    	@example digits: $.calendars.substituteDigits(['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']) */
    substituteDigits: function substituteDigits(digits) {
      return function (value) {
        return (value + '').replace(/[0-9]/g, function (digit) {
          return digits[digit];
        });
      };
    },
    /** Digit substitution function for localising Chinese style numbers via the
    	{@linkcode GregorianCalendar.regionalOptions|Calendar digits} option.
    	@memberof Calendars
    	@param {string[]} digits The substitute digits, for 0 through 9.
    	@param {string[]} powers The characters denoting powers of 10, i.e. 1, 10, 100, 1000.
    	@return {CalendarsDigits} The substitution function.
    	@example digits: $.calendars.substituteChineseDigits(
    ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'], ['', '十', '百', '千']) */
    substituteChineseDigits: function substituteChineseDigits(digits, powers) {
      return function (value) {
        var localNumber = '';
        var power = 0;
        while (value > 0) {
          var units = value % 10;
          localNumber = (units === 0 ? '' : digits[units] + powers[power]) + localNumber;
          power++;
          value = Math.floor(value / 10);
        }
        if (localNumber.indexOf(digits[1] + powers[1]) === 0) {
          localNumber = localNumber.substr(1);
        }
        return localNumber || digits[0];
      };
    }
  });

  /** Generic date, based on a particular calendar.
  	@class CDate
  	@param {BaseCalendar} calendar The underlying calendar implementation.
  	@param {number} year The year for this date.
  	@param {number} month The month for this date.
  	@param {number} day The day for this date.
  	@return {CDate} The date object.
  	@throws Error if an invalid date. */
  function CDate(calendar, year, month, day) {
    this._calendar = calendar;
    this._year = year;
    this._month = month;
    this._day = day;
    if (this._calendar._validateLevel === 0 && !this._calendar.isValid(this._year, this._month, this._day)) {
      throw ($.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate).replace(/\{0\}/, this._calendar.local.name);
    }
  }

  /** Pad a numeric value with leading zeroes.
  	@private
  	@param {number} value The number to format.
  	@param {number} length The minimum length.
  	@return {string} The formatted number. */
  function pad(value, length) {
    value = '' + value;
    return '000000'.substring(0, length - value.length) + value;
  }
  $.extend(CDate.prototype, {
    /** Create a new date.
    	@memberof CDate
    	@param {CDate|number} [year] The date to copy or the year for the date (default to this date).
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@return {CDate} The new date.
    	@throws Error if an invalid date.
    	@example date.newDate()
    date.newDate(otherDate)
    date.newDate(2001, 1, 1) */
    newDate: function newDate(year, month, day) {
      return this._calendar.newDate(typeof year === 'undefined' || year === null ? this : year, month, day);
    },
    /** Set or retrieve the year for this date.
    	@memberof CDate
    	@param {number} [year] The year for the date.
    	@return {number|CDate} The date's year (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.year(2001)
    var year = date.year() */
    year: function year(_year) {
      return arguments.length === 0 ? this._year : this.set(_year, 'y');
    },
    /** Set or retrieve the month for this date.
    	@memberof CDate
    	@param {number} [month] The month for the date.
    	@return {number|CDate} The date's month (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.month(1)
    var month = date.month() */
    month: function month(_month) {
      return arguments.length === 0 ? this._month : this.set(_month, 'm');
    },
    /** Set or retrieve the day for this date.
    	@memberof CDate
    	@param {number} [day] The day for the date.
    	@return {number|CData} The date's day (if no parameter) or the updated date.
    	@throws Error if an invalid date.
    	@example date.day(1)
    var day = date.day() */
    day: function day(_day) {
      return arguments.length === 0 ? this._day : this.set(_day, 'd');
    },
    /** Set new values for this date.
    	@memberof CDate
    	@param {number} year The year for the date.
    	@param {number} month The month for the date.
    	@param {number} day The day for the date.
    	@return {CDate} The updated date.
    	@throws Error if an invalid date.
    	@example date.date(2001, 1, 1) */
    date: function date(year, month, day) {
      if (!this._calendar.isValid(year, month, day)) {
        throw ($.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate).replace(/\{0\}/, this._calendar.local.name);
      }
      this._year = year;
      this._month = month;
      this._day = day;
      return this;
    },
    /** Determine whether this date is in a leap year.
    	@memberof CDate
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@example if (date.leapYear()) ...*/
    leapYear: function leapYear() {
      return this._calendar.leapYear(this);
    },
    /** Retrieve the epoch designator for this date, e.g. BCE or CE.
    	@memberof CDate
    	@return {string} The current epoch.
    	@example var epoch = date.epoch() */
    epoch: function epoch() {
      return this._calendar.epoch(this);
    },
    /** Format the year, if not a simple sequential number.
    	@memberof CDate
    	@return {string} The formatted year.
    	@example var year = date.formatYear() */
    formatYear: function formatYear() {
      return this._calendar.formatYear(this);
    },
    /** Retrieve the month of the year for this date,
    	i.e. the month's position within a numbered year.
    	@memberof CDate
    	@return {number} The month of the year: <code>minMonth</code> to months per year.
    	@example var month = date.monthOfYear() */
    monthOfYear: function monthOfYear() {
      return this._calendar.monthOfYear(this);
    },
    /** Retrieve the week of the year for this date.
    	@memberof CDate
    	@return {number} The week of the year: 1 to weeks per year.
    	@example var week = date.weekOfYear() */
    weekOfYear: function weekOfYear() {
      return this._calendar.weekOfYear(this);
    },
    /** Retrieve the number of days in the year for this date.
    	@memberof CDate
    	@return {number} The number of days in this year.
    	@example var days = date.daysInYear() */
    daysInYear: function daysInYear() {
      return this._calendar.daysInYear(this);
    },
    /** Retrieve the day of the year for this date.
    	@memberof CDate
    	@return {number} The day of the year: 1 to days per year.
    	@example var doy = date.dayOfYear() */
    dayOfYear: function dayOfYear() {
      return this._calendar.dayOfYear(this);
    },
    /** Retrieve the number of days in the month for this date.
    	@memberof CDate
    	@return {number} The number of days.
    	@example var days = date.daysInMonth() */
    daysInMonth: function daysInMonth() {
      return this._calendar.daysInMonth(this);
    },
    /** Retrieve the day of the week for this date.
    	@memberof CDate
    	@return {number} The day of the week: 0 to number of days - 1.
    	@example var dow = date.dayOfWeek() */
    dayOfWeek: function dayOfWeek() {
      return this._calendar.dayOfWeek(this);
    },
    /** Determine whether this date is a week day.
    	@memberof CDate
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@example if (date.weekDay()) ... */
    weekDay: function weekDay() {
      return this._calendar.weekDay(this);
    },
    /** Retrieve additional information about this date.
    	@memberof CDate
    	@return {object} Additional information - contents depends on calendar.
    	@example var info = date.extraInfo() */
    extraInfo: function extraInfo() {
      return this._calendar.extraInfo(this);
    },
    /** Add period(s) to a date.
    	@memberof CDate
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date.
    	@example date.add(10, 'd') */
    add: function add(offset, period) {
      return this._calendar.add(this, offset, period);
    },
    /** Set a portion of the date.
    	@memberof CDate
    	@param {number} value The new value for the period.
    	@param {string} period One of 'y' for year, 'm' for month, 'd' for day.
    	@return {CDate} The updated date.
    	@throws Error if not a valid date.
    	@example date.set(10, 'd') */
    set: function set(value, period) {
      return this._calendar.set(this, value, period);
    },
    /** Compare this date to another date.
    	@memberof CDate
    	@param {CDate} date The other date.
    	@return {number} -1 if this date is before the other date,
    			0 if they are equal, or +1 if this date is after the other date.
    	@example if (date1.compareTo(date2) < 0) ... */
    compareTo: function compareTo(date) {
      if (this._calendar.name !== date._calendar.name) {
        throw ($.calendars.local.differentCalendars || $.calendars.regionalOptions[''].differentCalendars).replace(/\{0\}/, this._calendar.local.name).replace(/\{1\}/, date._calendar.local.name);
      }
      var c = this._year !== date._year ? this._year - date._year : this._month !== date._month ? this.monthOfYear() - date.monthOfYear() : this._day - date._day;
      return c === 0 ? 0 : c < 0 ? -1 : +1;
    },
    /** Retrieve the calendar backing this date.
    	@memberof CDate
    	@return {BaseCalendar} The calendar implementation.
    	@example var cal = date.calendar() */
    calendar: function calendar() {
      return this._calendar;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof CDate
    	@return {number} The equivalent Julian date.
    	@example var jd = date.toJD() */
    toJD: function toJD() {
      return this._calendar.toJD(this);
    },
    /** Create a new date from a Julian date.
    	@memberof CDate
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date.
    	@example var date2 = date1.fromJD(jd) */
    fromJD: function fromJD(jd) {
      return this._calendar.fromJD(jd);
    },
    /** Convert this date to a standard (Gregorian) JavaScript Date.
    	@memberof CDate
    	@return {Date} The equivalent JavaScript date.
    	@example var jsd = date.toJSDate() */
    toJSDate: function toJSDate() {
      return this._calendar.toJSDate(this);
    },
    /** Create a new date from a standard (Gregorian) JavaScript Date.
    	@memberof CDate
    	@param {Date} jsd The JavaScript date to convert.
    	@return {CDate} The equivalent date.
    	@example var date2 = date1.fromJSDate(jsd) */
    fromJSDate: function fromJSDate(jsd) {
      return this._calendar.fromJSDate(jsd);
    },
    /** Convert to a string for display.
    	@memberof CDate
    	@return {string} This date as a string. */
    toString: function toString() {
      return (this.year() < 0 ? '-' : '') + pad(Math.abs(this.year()), 4) + '-' + pad(this.month(), 2) + '-' + pad(this.day(), 2);
    }
  });

  /** Basic functionality for all calendars.
  	Other calendars should extend this:
  	<pre>OtherCalendar.prototype = new BaseCalendar();</pre>
  	@class BaseCalendar */
  function BaseCalendar() {
    this.shortYearCutoff = '+10';
  }
  $.extend(BaseCalendar.prototype, {
    _validateLevel: 0,
    // "Stack" to turn validation on/off

    /** Create a new date within this calendar - today if no parameters given.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to duplicate or the year for the date.
    	@param {number} [month] The month for the date (if numeric <code>year</code> specified above).
    	@param {number} [day] The day for the date (if numeric <code>year</code> specified above).
    	@return {CDate} The new date.
    	@throws Error if not a valid date or a different calendar is used.
    	@example var date = calendar.newDate(2014, 1, 26)
    var date2 = calendar.newDate(date1)
    var today = calendar.newDate() */
    newDate: function newDate(year, month, day) {
      if (typeof year === 'undefined' || year === null) {
        return this.today();
      }
      if (year.year) {
        this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
        day = year.day();
        month = year.month();
        year = year.year();
      }
      return new CDate(this, year, month, day);
    },
    /** Create a new date for today.
    	@memberof BaseCalendar
    	@return {CDate} Today's date.
    	@example var today = calendar.today() */
    today: function today() {
      return this.fromJSDate(new Date());
    },
    /** Retrieve the epoch designator for this date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {string} The current epoch.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var epoch = calendar.epoch(date) 
    var epoch = calendar.epoch(2014) */
    epoch: function epoch(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return date.year() < 0 ? this.local.epochs[0] : this.local.epochs[1];
    },
    /** Format the year, if not a simple sequential number
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to format or the year to format.
    	@return {string} The formatted year.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var year = calendar.formatYear(date)
    var year = calendar.formatYear(2014) */
    formatYear: function formatYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return (date.year() < 0 ? '-' : '') + pad(Math.abs(date.year()), 4);
    },
    /** Retrieve the number of months in a year.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of months.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var months = calendar.monthsInYear(date)
    var months = calendar.monthsInYear(2014) */
    monthsInYear: function monthsInYear(year) {
      this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return 12;
    },
    /** Calculate the month's ordinal position within the year -
    	for those calendars that don't start at month 1!
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@return {number} The ordinal position, starting from <code>minMonth</code>.
    	@throws Error if an invalid year/month or a different calendar is used.
    	@example var pos = calendar.monthOfYear(date)
    var pos = calendar.monthOfYear(2014, 7) */
    monthOfYear: function monthOfYear(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return (date.month() + this.monthsInYear(date) - this.firstMonth) % this.monthsInYear(date) + this.minMonth;
    },
    /** Calculate actual month from ordinal position, starting from <code>minMonth</code>.
    	@memberof BaseCalendar
    	@param {number} year The year to examine.
    	@param {number} ord The month's ordinal position.
    	@return {number} The month's number.
    	@throws Error if an invalid year/month.
    	@example var month = calendar.fromMonthOfYear(2014, 7) */
    fromMonthOfYear: function fromMonthOfYear(year, ord) {
      var m = (ord + this.firstMonth - 2 * this.minMonth) % this.monthsInYear(year) + this.minMonth;
      this._validate(year, m, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return m;
    },
    /** Retrieve the number of days in a year.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of days.
    	@throws Error if an invalid year or a different calendar is used.
    	@example var days = calendar.daysInYear(date)
    var days = calendar.daysInYear(2014) */
    daysInYear: function daysInYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      return this.leapYear(date) ? 366 : 365;
    },
    /** Retrieve the day of the year for a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {number} The day of the year: 1 to days per year.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var doy = calendar.dayOfYear(date)
    var doy = calendar.dayOfYear(2014, 7, 1) */
    dayOfYear: function dayOfYear(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return date.toJD() - this.newDate(date.year(), this.fromMonthOfYear(date.year(), this.minMonth), this.minDay).toJD() + 1;
    },
    /** Retrieve the number of days in a week.
    	@memberof BaseCalendar
    	@return {number} The number of days.
    	@example var days = calendar.daysInWeek() */
    daysInWeek: function daysInWeek() {
      return 7;
    },
    /** Retrieve the day of the week for a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {number} The day of the week: 0 to number of days - 1.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var dow = calendar.dayOfWeek(date)
    var dow = calendar.dayOfWeek(2014, 1, 26) */
    dayOfWeek: function dayOfWeek(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return (Math.floor(this.toJD(date)) + 2) % this.daysInWeek();
    },
    /** Retrieve additional information about a date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {object} Additional information - content depends on calendar.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var info = calendar.extraInfo(date)
    var info = calendar.extraInfo(2014, 1, 26) */
    extraInfo: function extraInfo(year, month, day) {
      this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return {};
    },
    /** Add period(s) to a date.
    	Cater for no year zero.
    	@memberof BaseCalendar
    	@param {CDate} date The starting date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date.
    	@throws Error if a different calendar is used.
    	@example calendar.add(date, 10, 'd') */
    add: function add(date, offset, period) {
      this._validate(date, this.minMonth, this.minDay, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return this._correctAdd(date, this._add(date, offset, period), offset, period);
    },
    /** Add period(s) to a date.
    	@memberof BaseCalendar
    	@private
    	@param {CDate} date The starting date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {number[]} The updated date as year, month, and day. */
    _add: function _add(date, offset, period) {
      this._validateLevel++;
      var d;
      if (period === 'd' || period === 'w') {
        var jd = date.toJD() + offset * (period === 'w' ? this.daysInWeek() : 1);
        d = date.calendar().fromJD(jd);
        this._validateLevel--;
        return [d.year(), d.month(), d.day()];
      }
      try {
        var y = date.year() + (period === 'y' ? offset : 0);
        var m = date.monthOfYear() + (period === 'm' ? offset : 0);
        d = date.day();
        var resyncYearMonth = function resyncYearMonth(calendar) {
          while (m < calendar.minMonth) {
            y--;
            m += calendar.monthsInYear(y);
          }
          var yearMonths = calendar.monthsInYear(y);
          while (m > yearMonths - 1 + calendar.minMonth) {
            y++;
            m -= yearMonths;
            yearMonths = calendar.monthsInYear(y);
          }
        };
        if (period === 'y') {
          if (date.month() !== this.fromMonthOfYear(y, m)) {
            // Hebrew
            m = this.newDate(y, date.month(), this.minDay).monthOfYear();
          }
          m = Math.min(m, this.monthsInYear(y));
          d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
        } else if (period === 'm') {
          resyncYearMonth(this);
          d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
        }
        var ymd = [y, this.fromMonthOfYear(y, m), d];
        this._validateLevel--;
        return ymd;
      } catch (e) {
        this._validateLevel--;
        throw e;
      }
    },
    /** Correct a candidate date after adding period(s) to a date.
    	Handle no year zero if necessary.
    	@memberof BaseCalendar
    	@private
    	@param {CDate} date The starting date.
    	@param {number[]} ymd The added date.
    	@param {number} offset The number of periods to adjust by.
    	@param {string} period One of 'y' for years, 'm' for months, 'w' for weeks, 'd' for days.
    	@return {CDate} The updated date. */
    _correctAdd: function _correctAdd(date, ymd, offset, period) {
      if (!this.hasYearZero && (period === 'y' || period === 'm')) {
        if (ymd[0] === 0 ||
        // In year zero
        date.year() > 0 !== ymd[0] > 0) {
          // Crossed year zero
          var adj = {
            y: [1, 1, 'y'],
            m: [1, this.monthsInYear(-1), 'm'],
            w: [this.daysInWeek(), this.daysInYear(-1), 'd'],
            d: [1, this.daysInYear(-1), 'd']
          }[period];
          var dir = offset < 0 ? -1 : +1;
          ymd = this._add(date, offset * adj[0] + dir * adj[1], adj[2]);
        }
      }
      return date.date(ymd[0], ymd[1], ymd[2]);
    },
    /** Set a portion of the date.
    	@memberof BaseCalendar
    	@param {CDate} date The starting date.
    	@param {number} value The new value for the period.
    	@param {string} period One of 'y' for year, 'm' for month, 'd' for day.
    	@return {CDate} The updated date.
    	@throws Error if an invalid date or a different calendar is used.
    	@example calendar.set(date, 10, 'd') */
    set: function set(date, value, period) {
      this._validate(date, this.minMonth, this.minDay, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      var y = period === 'y' ? value : date.year();
      var m = period === 'm' ? value : date.month();
      var d = period === 'd' ? value : date.day();
      if (period === 'y' || period === 'm') {
        d = Math.min(d, this.daysInMonth(y, m));
      }
      return date.date(y, m, d);
    },
    /** Determine whether a date is valid for this calendar.
    	@memberof BaseCalendar
    	@param {number} year The year to examine.
    	@param {number} month The month to examine.
    	@param {number} day The day to examine.
    	@return {boolean} <code>true</code> if a valid date, <code>false</code> if not.
    	@example if (calendar.isValid(2014, 2, 31)) ... */
    isValid: function isValid(year, month, day) {
      this._validateLevel++;
      var valid = this.hasYearZero || year !== 0;
      if (valid) {
        var date = this.newDate(year, month, this.minDay);
        valid = month >= this.minMonth && month - this.minMonth < this.monthsInYear(date) && day >= this.minDay && day - this.minDay < this.daysInMonth(date);
      }
      this._validateLevel--;
      return valid;
    },
    /** Convert the date to a standard (Gregorian) JavaScript Date.
    	@memberof BaseCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {Date} The equivalent JavaScript date.
    	@throws Error if an invalid date or a different calendar is used.
    	@example var jsd = calendar.toJSDate(date)
    var jsd = calendar.toJSDate(2014, 1, 26) */
    toJSDate: function toJSDate(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      return $.calendars.instance().fromJD(this.toJD(date)).toJSDate();
    },
    /** Convert the date from a standard (Gregorian) JavaScript Date.
    	@memberof BaseCalendar
    	@param {Date} jsd The JavaScript date.
    	@return {CDate} The equivalent calendar date.
    	@example var date = calendar.fromJSDate(jsd) */
    fromJSDate: function fromJSDate(jsd) {
      return this.fromJD($.calendars.instance().fromJSDate(jsd).toJD());
    },
    /** Check that a candidate date is from the same calendar and is valid.
    	@memberof BaseCalendar
    	@private
    	@param {CDate|number} year The date to validate or the year to validate.
    	@param {number} [month] The month to validate (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to validate (if numeric <code>year</code> specified above).
    	@param {string} error Error message if invalid.
    	@throws Error if an invalid date or a different calendar is used. */
    _validate: function _validate(year, month, day, error) {
      if (year.year) {
        if (this._validateLevel === 0 && this.name !== year.calendar().name) {
          throw ($.calendars.local.differentCalendars || $.calendars.regionalOptions[''].differentCalendars).replace(/\{0\}/, this.local.name).replace(/\{1\}/, year.calendar().local.name);
        }
        return year;
      }
      try {
        this._validateLevel++;
        if (this._validateLevel === 1 && !this.isValid(year, month, day)) {
          throw error.replace(/\{0\}/, this.local.name);
        }
        var date = this.newDate(year, month, day);
        this._validateLevel--;
        return date;
      } catch (e) {
        this._validateLevel--;
        throw e;
      }
    }
  });

  /** Implementation of the Proleptic Gregorian Calendar.
  	See <a href=":http://en.wikipedia.org/wiki/Gregorian_calendar">http://en.wikipedia.org/wiki/Gregorian_calendar</a>
  	and <a href="http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar">http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar</a>.
  	@class GregorianCalendar
  	@augments BaseCalendar
  	@param {string} [language=''] The language code (default English) for localisation. */
  function GregorianCalendar(language) {
    this.local = this.regionalOptions[language] || this.regionalOptions[''];
  }
  GregorianCalendar.prototype = new BaseCalendar();
  $.extend(GregorianCalendar.prototype, {
    /** The calendar name.
    	@memberof GregorianCalendar */
    name: 'Gregorian',
    /** Julian date of start of Gregorian epoch: 1 January 0001 CE.
    	@memberof GregorianCalendar */
    jdEpoch: 1721425.5,
    /** Days per month in a common year.
    	@memberof GregorianCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
    	@memberof GregorianCalendar */
    hasYearZero: false,
    /** The minimum month number.
    	@memberof GregorianCalendar */
    minMonth: 1,
    /** The first month in the year.
    	@memberof GregorianCalendar */
    firstMonth: 1,
    /** The minimum day number.
    	@memberof GregorianCalendar */
    minDay: 1,
    /** Convert a number into a localised form.
    	@callback CalendarsDigits
    	@param {number} value The number to convert.
    	@return {string} The localised number.
    	@example digits: $.calendars.substituteDigits(['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']) */

    /** Localisations for the plugin.
    	Entries are objects indexed by the language code ('' being the default US/English).
    	Each object has the following attributes.
    	@memberof GregorianCalendar
    	@property {string} [name='Gregorian'] The calendar name.
    	@property {string[]} [epochs=['BCE','CE']] The epoch names.
    	@property {string[]} [monthNames=[...]] The long names of the months of the year.
    	@property {string[]} [monthNamesShort=[...]] The short names of the months of the year.
    	@property {string[]} [dayNames=[...]] The long names of the days of the week.
    	@property {string[]} [dayNamesShort=[...]] The short names of the days of the week.
    	@property {string[]} [dayNamesMin=[...]] The minimal names of the days of the week.
    	@property {CalendarsDigits} [digits=null] Convert numbers to localised versions.
    	@property {string} [dateFormat='mm/dd/yyyy'] The date format for this calendar.
    			See the options on {@linkcode BaseCalendar.formatDate|formatDate} for details.
    	@property {number} [firstDay=0] The number of the first day of the week, starting at 0.
    	@property {boolean} [isRTL=false] <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: {
      // Localisations
      '': {
        name: 'Gregorian',
        epochs: ['BCE', 'CE'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        digits: null,
        dateFormat: 'mm/dd/yyyy',
        firstDay: 0,
        isRTL: false
      }
    },
    /** Determine whether this date is in a leap year.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@throws Error if an invalid year or a different calendar is used. */
    leapYear: function leapYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear || $.calendars.regionalOptions[''].invalidYear);
      year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    },
    /** Determine the week of the year for a date - ISO 8601.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {number} The week of the year, starting from 1.
    	@throws Error if an invalid date or a different calendar is used. */
    weekOfYear: function weekOfYear(year, month, day) {
      // Find Thursday of this week starting on Monday
      var checkDate = this.newDate(year, month, day);
      checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
      return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },
    /** Retrieve the number of days in a month.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year of the month.
    	@param {number} [month] The month (if numeric <code>year</code> specified above).
    	@return {number} The number of days in this month.
    	@throws Error if an invalid month/year or a different calendar is used. */
    daysInMonth: function daysInMonth(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth || $.calendars.regionalOptions[''].invalidMonth);
      return this.daysPerMonth[date.month() - 1] + (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },
    /** Determine whether this date is a week day.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to examine (if numeric <code>year</code> specified above).
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@throws Error if an invalid date or a different calendar is used. */
    weekDay: function weekDay(year, month, day) {
      return (this.dayOfWeek(year, month, day) || 7) < 6;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {number} The equivalent Julian date.
    	@throws Error if an invalid date or a different calendar is used. */
    toJD: function toJD(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      year = date.year();
      month = date.month();
      day = date.day();
      if (year < 0) {
        year++;
      } // No year zero
      // Jean Meeus algorithm, "Astronomical Algorithms", 1991
      if (month < 3) {
        month += 12;
        year--;
      }
      var a = Math.floor(year / 100);
      var b = 2 - a + Math.floor(a / 4);
      return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    },
    /** Create a new date from a Julian date.
    	@memberof GregorianCalendar
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date. */
    fromJD: function fromJD(jd) {
      // Jean Meeus algorithm, "Astronomical Algorithms", 1991
      var z = Math.floor(jd + 0.5);
      var a = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + a - Math.floor(a / 4);
      var b = a + 1524;
      var c = Math.floor((b - 122.1) / 365.25);
      var d = Math.floor(365.25 * c);
      var e = Math.floor((b - d) / 30.6001);
      var day = b - d - Math.floor(e * 30.6001);
      var month = e - (e > 13.5 ? 13 : 1);
      var year = c - (month > 2.5 ? 4716 : 4715);
      if (year <= 0) {
        year--;
      } // No year zero
      return this.newDate(year, month, day);
    },
    /** Convert this date to a standard (Gregorian) JavaScript Date.
    	@memberof GregorianCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if numeric <code>year</code> specified above).
    	@param {number} [day] The day to convert (if numeric <code>year</code> specified above).
    	@return {Date} The equivalent JavaScript date.
    	@throws Error if an invalid date or a different calendar is used. */
    toJSDate: function toJSDate(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate || $.calendars.regionalOptions[''].invalidDate);
      var jsd = new Date(date.year(), date.month() - 1, date.day());
      jsd.setHours(0);
      jsd.setMinutes(0);
      jsd.setSeconds(0);
      jsd.setMilliseconds(0);
      // Hours may be non-zero on daylight saving cut-over:
      // > 12 when midnight changeover, but then cannot generate
      // midnight datetime, so jump to 1AM, otherwise reset.
      jsd.setHours(jsd.getHours() > 12 ? jsd.getHours() + 2 : 0);
      return jsd;
    },
    /** Create a new date from a standard (Gregorian) JavaScript Date.
    	@memberof GregorianCalendar
    	@param {Date} jsd The JavaScript date to convert.
    	@return {CDate} The equivalent date. */
    fromJSDate: function fromJSDate(jsd) {
      return this.newDate(jsd.getFullYear(), jsd.getMonth() + 1, jsd.getDate());
    }
  });

  // Singleton manager
  $.calendars = new Calendars();

  // Date template
  $.calendars.cdate = CDate;

  // Base calendar template
  $.calendars.baseCalendar = BaseCalendar;

  // Gregorian calendar implementation
  $.calendars.calendars.gregorian = GregorianCalendar;
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.ummalqura-ar.js":
/*!************************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.ummalqura-ar.js ***!
  \************************************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   Arabic localisation for UmmAlQura calendar for jQuery v2.1.0.
   Written by Amro Osama March 2013.
   Updated by Fahad Alqahtani April 2016. */
(function ($) {
  'use strict';

  $.calendars.calendars.ummalqura.prototype.regionalOptions.ar = {
    name: 'UmmAlQura',
    // The calendar name
    epochs: ['BAM', 'AM'],
    monthNames: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأول_جمادى الآخر_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
    monthNamesShort: 'محرم_صفر_ربيع1_ربيع2_جمادى1_جمادى2_رجب_شعبان_رمضان_شوال_القعدة_الحجة'.split('_'),
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    dayNamesMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    digits: $.calendars.substituteDigits(['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']),
    dateFormat: 'yyyy/mm/dd',
    firstDay: 1,
    isRTL: true
  };
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.calendars.ummalqura.js":
/*!*********************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.calendars.ummalqura.js ***!
  \*********************************************************************/
/***/ (() => {

/* http://keith-wood.name/calendars.html
   UmmAlQura calendar for jQuery v2.1.0.
   Written by Amro Osama March 2013.
   Modified by Binnooh.com & www.elm.sa - 2014 - Added dates back to 1276 Hijri year.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function ($) {
  // Hide scope, no $ conflict
  'use strict';

  /** Implementation of the UmmAlQura or 'saudi' calendar.
  	See also <a href="http://en.wikipedia.org/wiki/Islamic_calendar#Saudi_Arabia.27s_Umm_al-Qura_calendar">http://en.wikipedia.org/wiki/Islamic_calendar#Saudi_Arabia.27s_Umm_al-Qura_calendar</a>.
  	<a href="http://www.ummulqura.org.sa/About.aspx">http://www.ummulqura.org.sa/About.aspx</a>
  	<a href="http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm">http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm</a>
  	@class UmmAlQuraCalendar
  	@param {string} [language=''] The language code (default English) for localisation. */
  function UmmAlQuraCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
  }
  UmmAlQuraCalendar.prototype = new $.calendars.baseCalendar();
  $.extend(UmmAlQuraCalendar.prototype, {
    /** The calendar name.
    	@memberof UmmAlQuraCalendar */
    name: 'UmmAlQura',
    //jdEpoch: 1948440, // Julian date of start of UmmAlQura epoch: 14 March 1937 CE
    //daysPerMonth: // Days per month in a common year, replaced by a method.
    /** <code>true</code> if has a year zero, <code>false</code> if not.
    	@memberof UmmAlQuraCalendar */
    hasYearZero: false,
    /** The minimum month number.
    	@memberof UmmAlQuraCalendar */
    minMonth: 1,
    /** The first month in the year.
    	@memberof UmmAlQuraCalendar */
    firstMonth: 1,
    /** The minimum day number.
    	@memberof UmmAlQuraCalendar */
    minDay: 1,
    /** Localisations for the plugin.
    	Entries are objects indexed by the language code ('' being the default US/English).
    	Each object has the following attributes.
    	@memberof UmmAlQuraCalendar
    	@property {string} name The calendar name.
    	@property {string[]} epochs The epoch names (before/after year 0).
    	@property {string[]} monthNames The long names of the months of the year.
    	@property {string[]} monthNamesShort The short names of the months of the year.
    	@property {string[]} dayNames The long names of the days of the week.
    	@property {string[]} dayNamesShort The short names of the days of the week.
    	@property {string[]} dayNamesMin The minimal names of the days of the week.
    	@property {string} dateFormat The date format for this calendar.
    			See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
    	@property {number} firstDay The number of the first day of the week, starting at 0.
    	@property {boolean} isRTL <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: {
      // Localisations
      '': {
        name: 'Umm al-Qura',
        epochs: ['BH', 'AH'],
        monthNames: ['Al-Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani', 'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
        monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
        dayNames: ['Yawm al-Ahad', 'Yawm al-Ithnain', 'Yawm al-Thalāthā’', 'Yawm al-Arba‘ā’', 'Yawm al-Khamīs', 'Yawm al-Jum‘a', 'Yawm al-Sabt'],
        dayNamesShort: ['Ahd', 'Ith', 'Thu', 'Arb', 'Khm', 'Jum', 'Sbt'],
        dayNamesMin: ['Ah', 'Ith', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'],
        digits: null,
        dateFormat: 'yyyy/mm/dd',
        firstDay: 6,
        isRTL: true
      }
    },
    /** Determine whether this date is in a leap year.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
    	@throws Error if an invalid year or a different calendar used. */
    leapYear: function leapYear(year) {
      var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear);
      return this.daysInYear(date.year()) === 355;
    },
    /** Determine the week of the year for a date.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if only <code>year</code> specified above).
    	@param {number} [day] The day to examine (if only <code>year</code> specified above).
    	@return {number} The week of the year.
    	@throws Error if an invalid date or a different calendar used. */
    weekOfYear: function weekOfYear(year, month, day) {
      // Find Sunday of this week starting on Sunday
      var checkDate = this.newDate(year, month, day);
      checkDate.add(-checkDate.dayOfWeek(), 'd');
      return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },
    /** Retrieve the number of days in a year.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@return {number} The number of days.
    	@throws Error if an invalid year or a different calendar used. */
    daysInYear: function daysInYear(year) {
      var daysCount = 0;
      for (var i = 1; i <= 12; i++) {
        daysCount += this.daysInMonth(year, i);
      }
      return daysCount;
    },
    /** Retrieve the number of days in a month.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to examine or the year of the month.
    	@param {number} [month] The month (if only <code>year</code> specified above).
    	@return {number} The number of days in this month.
    	@throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function daysInMonth(year, month) {
      var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth);
      var mcjdn = date.toJD() - 2400000 + 0.5; // Modified Chronological Julian Day Number (MCJDN)
      // the MCJDN's of the start of the lunations in the Umm al-Qura calendar are stored in the 'ummalquraData' array
      var index = 0;
      for (var i = 0; i < ummalquraData.length; i++) {
        if (ummalquraData[i] > mcjdn) {
          return ummalquraData[index] - ummalquraData[index - 1];
        }
        index++;
      }
      return 30; // Unknown outside
    },

    /** Determine whether this date is a week day.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to examine or the year to examine.
    	@param {number} [month] The month to examine (if only <code>year</code> specified above).
    	@param {number} [day] The day to examine (if only <code>year</code> specified above).
    	@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
    	@throws Error if an invalid date or a different calendar used. */
    weekDay: function weekDay(year, month, day) {
      return this.dayOfWeek(year, month, day) !== 5;
    },
    /** Retrieve the Julian date equivalent for this date,
    	i.e. days since January 1, 4713 BCE Greenwich noon.
    	@memberof UmmAlQuraCalendar
    	@param {CDate|number} year The date to convert or the year to convert.
    	@param {number} [month] The month to convert (if only <code>year</code> specified above).
    	@param {number} [day] The day to convert (if only <code>year</code> specified above).
    	@return {number} The equivalent Julian date.
    	@throws Error if an invalid date or a different calendar used. */
    toJD: function toJD(year, month, day) {
      var date = this._validate(year, month, day, $.calendars.local.invalidDate);
      var index = 12 * (date.year() - 1) + date.month() - 15292;
      var mcjdn = date.day() + ummalquraData[index - 1] - 1;
      return mcjdn + 2400000 - 0.5; // Modified Chronological Julian Day Number (MCJDN)
    },

    /** Create a new date from a Julian date.
    	@memberof UmmAlQuraCalendar
    	@param {number} jd The Julian date to convert.
    	@return {CDate} The equivalent date. */
    fromJD: function fromJD(jd) {
      var mcjdn = jd - 2400000 + 0.5; // Modified Chronological Julian Day Number (MCJDN)
      // the MCJDN's of the start of the lunations in the Umm al-Qura calendar 
      // are stored in the 'ummalquraData' array
      var index = 0;
      for (var i = 0; i < ummalquraData.length; i++) {
        if (ummalquraData[i] > mcjdn) {
          break;
        }
        index++;
      }
      var lunation = index + 15292; //UmmAlQura Lunation Number
      var ii = Math.floor((lunation - 1) / 12);
      var year = ii + 1;
      var month = lunation - 12 * ii;
      var day = mcjdn - ummalquraData[index - 1] + 1;
      return this.newDate(year, month, day);
    },
    /** Determine whether a date is valid for this calendar.
    	@memberof UmmAlQuraCalendar
    	@param {number} year The year to examine.
    	@param {number} month The month to examine.
    	@param {number} day The day to examine.
    	@return {boolean} <code>true</code> if a valid date, <code>false</code> if not. */
    isValid: function isValid(year, month, day) {
      // jshint unused:false
      var valid = $.calendars.baseCalendar.prototype.isValid.apply(this, arguments);
      if (valid) {
        year = typeof year.year !== 'undefined' && year.year !== null ? year.year : year;
        valid = year >= 1276 && year <= 1500;
      }
      return valid;
    },
    /** Check that a candidate date is from the same calendar and is valid.
    	@memberof UmmAlQuraCalendar
    	@private
    	@param {CDate|number} year The date to validate or the year to validate.
    	@param {number} month The month to validate (if only <code>year</code> specified above).
    	@param {number} day The day to validate (if only <code>year</code> specified above).
    	@param {string} error Error message if invalid.
    	@throws Error if different calendars used or invalid date. */
    _validate: function _validate(year, month, day, error) {
      var date = $.calendars.baseCalendar.prototype._validate.apply(this, arguments);
      if (date.year < 1276 || date.year > 1500) {
        throw error.replace(/\{0\}/, this.local.name);
      }
      return date;
    }
  });

  // UmmAlQura calendar implementation
  $.calendars.calendars.ummalqura = UmmAlQuraCalendar;
  var ummalquraData = [20, 50, 79, 109, 138, 168, 197, 227, 256, 286, 315, 345, 374, 404, 433, 463, 492, 522, 551, 581, 611, 641, 670, 700, 729, 759, 788, 818, 847, 877, 906, 936, 965, 995, 1024, 1054, 1083, 1113, 1142, 1172, 1201, 1231, 1260, 1290, 1320, 1350, 1379, 1409, 1438, 1468, 1497, 1527, 1556, 1586, 1615, 1645, 1674, 1704, 1733, 1763, 1792, 1822, 1851, 1881, 1910, 1940, 1969, 1999, 2028, 2058, 2087, 2117, 2146, 2176, 2205, 2235, 2264, 2294, 2323, 2353, 2383, 2413, 2442, 2472, 2501, 2531, 2560, 2590, 2619, 2649, 2678, 2708, 2737, 2767, 2796, 2826, 2855, 2885, 2914, 2944, 2973, 3003, 3032, 3062, 3091, 3121, 3150, 3180, 3209, 3239, 3268, 3298, 3327, 3357, 3386, 3416, 3446, 3476, 3505, 3535, 3564, 3594, 3623, 3653, 3682, 3712, 3741, 3771, 3800, 3830, 3859, 3889, 3918, 3948, 3977, 4007, 4036, 4066, 4095, 4125, 4155, 4185, 4214, 4244, 4273, 4303, 4332, 4362, 4391, 4421, 4450, 4480, 4509, 4539, 4568, 4598, 4627, 4657, 4686, 4716, 4745, 4775, 4804, 4834, 4863, 4893, 4922, 4952, 4981, 5011, 5040, 5070, 5099, 5129, 5158, 5188, 5218, 5248, 5277, 5307, 5336, 5366, 5395, 5425, 5454, 5484, 5513, 5543, 5572, 5602, 5631, 5661, 5690, 5720, 5749, 5779, 5808, 5838, 5867, 5897, 5926, 5956, 5985, 6015, 6044, 6074, 6103, 6133, 6162, 6192, 6221, 6251, 6281, 6311, 6340, 6370, 6399, 6429, 6458, 6488, 6517, 6547, 6576, 6606, 6635, 6665, 6694, 6724, 6753, 6783, 6812, 6842, 6871, 6901, 6930, 6960, 6989, 7019, 7048, 7078, 7107, 7137, 7166, 7196, 7225, 7255, 7284, 7314, 7344, 7374, 7403, 7433, 7462, 7492, 7521, 7551, 7580, 7610, 7639, 7669, 7698, 7728, 7757, 7787, 7816, 7846, 7875, 7905, 7934, 7964, 7993, 8023, 8053, 8083, 8112, 8142, 8171, 8201, 8230, 8260, 8289, 8319, 8348, 8378, 8407, 8437, 8466, 8496, 8525, 8555, 8584, 8614, 8643, 8673, 8702, 8732, 8761, 8791, 8821, 8850, 8880, 8909, 8938, 8968, 8997, 9027, 9056, 9086, 9115, 9145, 9175, 9205, 9234, 9264, 9293, 9322, 9352, 9381, 9410, 9440, 9470, 9499, 9529, 9559, 9589, 9618, 9648, 9677, 9706, 9736, 9765, 9794, 9824, 9853, 9883, 9913, 9943, 9972, 10002, 10032, 10061, 10090, 10120, 10149, 10178, 10208, 10237, 10267, 10297, 10326, 10356, 10386, 10415, 10445, 10474, 10504, 10533, 10562, 10592, 10621, 10651, 10680, 10710, 10740, 10770, 10799, 10829, 10858, 10888, 10917, 10947, 10976, 11005, 11035, 11064, 11094, 11124, 11153, 11183, 11213, 11242, 11272, 11301, 11331, 11360, 11389, 11419, 11448, 11478, 11507, 11537, 11567, 11596, 11626, 11655, 11685, 11715, 11744, 11774, 11803, 11832, 11862, 11891, 11921, 11950, 11980, 12010, 12039, 12069, 12099, 12128, 12158, 12187, 12216, 12246, 12275, 12304, 12334, 12364, 12393, 12423, 12453, 12483, 12512, 12542, 12571, 12600, 12630, 12659, 12688, 12718, 12747, 12777, 12807, 12837, 12866, 12896, 12926, 12955, 12984, 13014, 13043, 13072, 13102, 13131, 13161, 13191, 13220, 13250, 13280, 13310, 13339, 13368, 13398, 13427, 13456, 13486, 13515, 13545, 13574, 13604, 13634, 13664, 13693, 13723, 13752, 13782, 13811, 13840, 13870, 13899, 13929, 13958, 13988, 14018, 14047, 14077, 14107, 14136, 14166, 14195, 14224, 14254, 14283, 14313, 14342, 14372, 14401, 14431, 14461, 14490, 14520, 14550, 14579, 14609, 14638, 14667, 14697, 14726, 14756, 14785, 14815, 14844, 14874, 14904, 14933, 14963, 14993, 15021, 15051, 15081, 15110, 15140, 15169, 15199, 15228, 15258, 15287, 15317, 15347, 15377, 15406, 15436, 15465, 15494, 15524, 15553, 15582, 15612, 15641, 15671, 15701, 15731, 15760, 15790, 15820, 15849, 15878, 15908, 15937, 15966, 15996, 16025, 16055, 16085, 16114, 16144, 16174, 16204, 16233, 16262, 16292, 16321, 16350, 16380, 16409, 16439, 16468, 16498, 16528, 16558, 16587, 16617, 16646, 16676, 16705, 16734, 16764, 16793, 16823, 16852, 16882, 16912, 16941, 16971, 17001, 17030, 17060, 17089, 17118, 17148, 17177, 17207, 17236, 17266, 17295, 17325, 17355, 17384, 17414, 17444, 17473, 17502, 17532, 17561, 17591, 17620, 17650, 17679, 17709, 17738, 17768, 17798, 17827, 17857, 17886, 17916, 17945, 17975, 18004, 18034, 18063, 18093, 18122, 18152, 18181, 18211, 18241, 18270, 18300, 18330, 18359, 18388, 18418, 18447, 18476, 18506, 18535, 18565, 18595, 18625, 18654, 18684, 18714, 18743, 18772, 18802, 18831, 18860, 18890, 18919, 18949, 18979, 19008, 19038, 19068, 19098, 19127, 19156, 19186, 19215, 19244, 19274, 19303, 19333, 19362, 19392, 19422, 19452, 19481, 19511, 19540, 19570, 19599, 19628, 19658, 19687, 19717, 19746, 19776, 19806, 19836, 19865, 19895, 19924, 19954, 19983, 20012, 20042, 20071, 20101, 20130, 20160, 20190, 20219, 20249, 20279, 20308, 20338, 20367, 20396, 20426, 20455, 20485, 20514, 20544, 20573, 20603, 20633, 20662, 20692, 20721, 20751, 20780, 20810, 20839, 20869, 20898, 20928, 20957, 20987, 21016, 21046, 21076, 21105, 21135, 21164, 21194, 21223, 21253, 21282, 21312, 21341, 21371, 21400, 21430, 21459, 21489, 21519, 21548, 21578, 21607, 21637, 21666, 21696, 21725, 21754, 21784, 21813, 21843, 21873, 21902, 21932, 21962, 21991, 22021, 22050, 22080, 22109, 22138, 22168, 22197, 22227, 22256, 22286, 22316, 22346, 22375, 22405, 22434, 22464, 22493, 22522, 22552, 22581, 22611, 22640, 22670, 22700, 22730, 22759, 22789, 22818, 22848, 22877, 22906, 22936, 22965, 22994, 23024, 23054, 23083, 23113, 23143, 23173, 23202, 23232, 23261, 23290, 23320, 23349, 23379, 23408, 23438, 23467, 23497, 23527, 23556, 23586, 23616, 23645, 23674, 23704, 23733, 23763, 23792, 23822, 23851, 23881, 23910, 23940, 23970, 23999, 24029, 24058, 24088, 24117, 24147, 24176, 24206, 24235, 24265, 24294, 24324, 24353, 24383, 24413, 24442, 24472, 24501, 24531, 24560, 24590, 24619, 24648, 24678, 24707, 24737, 24767, 24796, 24826, 24856, 24885, 24915, 24944, 24974, 25003, 25032, 25062, 25091, 25121, 25150, 25180, 25210, 25240, 25269, 25299, 25328, 25358, 25387, 25416, 25446, 25475, 25505, 25534, 25564, 25594, 25624, 25653, 25683, 25712, 25742, 25771, 25800, 25830, 25859, 25888, 25918, 25948, 25977, 26007, 26037, 26067, 26096, 26126, 26155, 26184, 26214, 26243, 26272, 26302, 26332, 26361, 26391, 26421, 26451, 26480, 26510, 26539, 26568, 26598, 26627, 26656, 26686, 26715, 26745, 26775, 26805, 26834, 26864, 26893, 26923, 26952, 26982, 27011, 27041, 27070, 27099, 27129, 27159, 27188, 27218, 27248, 27277, 27307, 27336, 27366, 27395, 27425, 27454, 27484, 27513, 27542, 27572, 27602, 27631, 27661, 27691, 27720, 27750, 27779, 27809, 27838, 27868, 27897, 27926, 27956, 27985, 28015, 28045, 28074, 28104, 28134, 28163, 28193, 28222, 28252, 28281, 28310, 28340, 28369, 28399, 28428, 28458, 28488, 28517, 28547, 28577,
  // From 1356
  28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167, 29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759, 29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348, 30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939, 30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530, 31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120, 32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711, 32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302, 33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893, 33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483, 34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074, 35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665, 35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254, 36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845, 36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436, 37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027, 38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617, 38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208, 39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798, 39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389, 40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980, 41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570, 41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161, 42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751, 42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342, 43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932, 43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523, 44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114, 45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704, 45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295, 46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885, 46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476, 47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066, 48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657, 48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248, 49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838, 49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429, 50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019, 51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611, 51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200, 52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792, 52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383, 53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53914, 53943, 53973, 54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564, 54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154, 55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745, 55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335, 56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926, 56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517, 57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107, 58137, 58167, 58196, 58226, 58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698, 58727, 58757, 58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288, 59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820, 59850, 59879, 59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352, 60381, 60411, 60440, 60469, 60499, 60528, 60558, 60588, 60618, 60647, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883, 60912, 60942, 60972, 61002, 61031, 61061, 61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415, 61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651, 61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947, 61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242, 62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478, 62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832, 62862, 62891, 62921, 62950, 62980, 63009, 63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423, 63453, 63482, 63512, 63541, 63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014, 64043, 64073, 64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603, 64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136, 65166, 65195, 65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667, 65697, 65726, 65755, 65785, 65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199, 66228, 66258, 66287, 66317, 66346, 66376, 66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730, 66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967, 66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262, 67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557, 67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793, 67823, 67852, 67882, 67911, 67941, 67971, 68000, 68030, 68060, 68089, 68119, 68148, 68177, 68207, 68236, 68266, 68295, 68325, 68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738, 68768, 68797, 68827, 68857, 68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330, 69359, 69388, 69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919, 69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451, 70481, 70510, 70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983, 71013, 71042, 71071, 71101, 71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514, 71543, 71573, 71602, 71632, 71662, 71691, 71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046, 72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282, 72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577, 72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872, 72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109, 73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464, 73493, 73523, 73552, 73581, 73611, 73640, 73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053, 74083, 74113, 74142, 74172, 74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74585, 74615, 74645, 74675, 74704, 74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235, 75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766, 75796, 75826, 75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299, 76328, 76358, 76387, 76416, 76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830, 76859, 76889, 76918, 76948, 76977, 77007, 77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361, 77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598, 77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893, 77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188, 78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425, 78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779, 78808, 78838, 78867, 78897, 78926, 78956, 78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369, 79399, 79428, 79458, 79487, 79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960, 79990];
})(jQuery);

/***/ }),

/***/ "./resources/assets/calendars/js/jquery.plugin.min.js":
/*!************************************************************!*\
  !*** ./resources/assets/calendars/js/jquery.plugin.min.js ***!
  \************************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*! Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
!function () {
  "use strict";

  var a = !1;
  window.JQClass = function () {}, JQClass.classes = {}, JQClass.extend = function b(c) {
    function d() {
      !a && this._init && this._init.apply(this, arguments);
    }
    var e = this.prototype;
    a = !0;
    var f = new this();
    a = !1;
    for (var g in c) {
      if ("function" == typeof c[g] && "function" == typeof e[g]) f[g] = function (a, b) {
        return function () {
          var c = this._super;
          this._super = function (b) {
            return e[a].apply(this, b || []);
          };
          var d = b.apply(this, arguments);
          return this._super = c, d;
        };
      }(g, c[g]);else if ("object" == _typeof(c[g]) && "object" == _typeof(e[g]) && "defaultOptions" === g) {
        var h,
          i = e[g],
          j = c[g],
          k = {};
        for (h in i) {
          k[h] = i[h];
        }
        for (h in j) {
          k[h] = j[h];
        }
        f[g] = k;
      } else f[g] = c[g];
    }
    return d.prototype = f, d.prototype.constructor = d, d.extend = b, d;
  };
}(),
/*! Abstract base class for collection plugins v1.0.2.
Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
Licensed under the MIT license (http://keith-wood.name/licence.html). */
function ($) {
  "use strict";

  function camelCase(a) {
    return a.replace(/-([a-z])/g, function (a, b) {
      return b.toUpperCase();
    });
  }
  JQClass.classes.JQPlugin = JQClass.extend({
    name: "plugin",
    defaultOptions: {},
    regionalOptions: {},
    deepMerge: !0,
    _getMarker: function _getMarker() {
      return "is-" + this.name;
    },
    _init: function _init() {
      $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
      var a = camelCase(this.name);
      $[a] = this, $.fn[a] = function (b) {
        var c = Array.prototype.slice.call(arguments, 1),
          d = this,
          e = this;
        return this.each(function () {
          if ("string" == typeof b) {
            if ("_" === b[0] || !$[a][b]) throw "Unknown method: " + b;
            var f = $[a][b].apply($[a], [this].concat(c));
            if (f !== d && void 0 !== f) return e = f, !1;
          } else $[a]._attach(this, b);
        }), e;
      };
    },
    setDefaults: function setDefaults(a) {
      $.extend(this.defaultOptions, a || {});
    },
    _attach: function _attach(a, b) {
      if (a = $(a), !a.hasClass(this._getMarker())) {
        a.addClass(this._getMarker()), b = $.extend(this.deepMerge, {}, this.defaultOptions, this._getMetadata(a), b || {});
        var c = $.extend({
          name: this.name,
          elem: a,
          options: b
        }, this._instSettings(a, b));
        a.data(this.name, c), this._postAttach(a, c), this.option(a, b);
      }
    },
    _instSettings: function _instSettings(a, b) {
      return {};
    },
    _postAttach: function _postAttach(a, b) {},
    _getMetadata: function _getMetadata(elem) {
      try {
        var data = elem.data(this.name.toLowerCase()) || "";
        data = data.replace(/(\\?)'/g, function (a, b) {
          return b ? "'" : '"';
        }).replace(/([a-zA-Z0-9]+):/g, function (a, b, c) {
          var d = data.substring(0, c).match(/"/g);
          return d && d.length % 2 !== 0 ? b + ":" : '"' + b + '":';
        }).replace(/\\:/g, ":"), data = $.parseJSON("{" + data + "}");
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var value = data[key];
            "string" == typeof value && value.match(/^new Date\(([-0-9,\s]*)\)$/) && (data[key] = eval(value));
          }
        }
        return data;
      } catch (a) {
        return {};
      }
    },
    _getInst: function _getInst(a) {
      return $(a).data(this.name) || {};
    },
    option: function option(a, b, c) {
      a = $(a);
      var d = a.data(this.name),
        e = b || {};
      return !b || "string" == typeof b && "undefined" == typeof c ? (e = (d || {}).options, e && b ? e[b] : e) : void (a.hasClass(this._getMarker()) && ("string" == typeof b && (e = {}, e[b] = c), this._optionsChanged(a, d, e), $.extend(d.options, e)));
    },
    _optionsChanged: function _optionsChanged(a, b, c) {},
    destroy: function destroy(a) {
      a = $(a), a.hasClass(this._getMarker()) && (this._preDestroy(a, this._getInst(a)), a.removeData(this.name).removeClass(this._getMarker()));
    },
    _preDestroy: function _preDestroy(a, b) {}
  }), $.JQPlugin = {
    createPlugin: function createPlugin(a, b) {
      "object" == _typeof(a) && (b = a, a = "JQPlugin"), a = camelCase(a);
      var c = camelCase(b.name);
      JQClass.classes[c] = JQClass.classes[a].extend(b), new JQClass.classes[c]();
    }
  };
}(jQuery);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************************!*\
  !*** ./resources/assets/calendars/js/calendars.js ***!
  \****************************************************/
__webpack_require__(/*! ./jquery.plugin.min.js */ "./resources/assets/calendars/js/jquery.plugin.min.js");
__webpack_require__(/*! ./jquery.calendars.js */ "./resources/assets/calendars/js/jquery.calendars.js");
__webpack_require__(/*! ./jquery.calendars.all */ "./resources/assets/calendars/js/jquery.calendars.all.js");
__webpack_require__(/*! ./jquery.calendars.ummalqura.js */ "./resources/assets/calendars/js/jquery.calendars.ummalqura.js");
__webpack_require__(/*! ./jquery.calendars.ummalqura-ar.js */ "./resources/assets/calendars/js/jquery.calendars.ummalqura-ar.js");
__webpack_require__(/*! ./jquery.calendars.coptic */ "./resources/assets/calendars/js/jquery.calendars.coptic.js");
__webpack_require__(/*! ./jquery.calendars.coptic-ar */ "./resources/assets/calendars/js/jquery.calendars.coptic-ar.js");
__webpack_require__(/*! ./jquery.calendars-ar-EG */ "./resources/assets/calendars/js/jquery.calendars-ar-EG.js");
})();

/******/ })()
;