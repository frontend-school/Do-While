/*@ngInject*/
module.exports = function () {
	return {
		getNextDaysForWeek: getNextDaysForWeek,
		getNextDays: getNextDays,
		getNextDay: getNextDay,
		isDateEquals: isDateEquals
	};

	function getNextDaysForWeek () {
		return getNextDays(7);
	}

	function getNextDays(dayCount) {
		return getNextDaysFrom(new Date(), dayCount);
	}

	function getNextDaysFrom(date, dayCount) {
		return enumerate(dayCount).reduce(function (dates) {
			dates.push(date);
			date = getNextDay(date);
			return dates;
		}, []);
	}

	function enumerate(count) {
		return {
			reduce: reduce
		};

		function reduce(callback, accumulator) {
			if (!accumulator)
				accumulator = [];
			while (count)
				accumulator = callback(accumulator, count--);
			return accumulator;
		}
	}

	function getNextDay(date) {
		var milisecondsInDay = 1000 * 60 * 60 * 24;
		return new Date(date.valueOf() + milisecondsInDay);
	}

	function isDateEquals(a, b) {
		a = new Date(a);
		b = new Date(b);
		return a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDay() === b.getDay();
	}
};
