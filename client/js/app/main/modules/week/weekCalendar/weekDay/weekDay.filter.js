/**
 * @ng-Inject
 */
module.exports = function ($filter, calendarService) {
  var dateFilter = $filter('date');

  return function (date) {
    if (calendarService.isDateEquals(new Date(), date))
      return 'today';
    return dateFilter(date, 'EEE');
  };
};