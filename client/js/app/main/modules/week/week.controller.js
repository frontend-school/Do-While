/**
 * @ngInject
 */
module.exports = function (todayService, $filter, nowValue) {
    var vm = this,
        oneDay = 86400000,
        parsedDate = Date.parse(nowValue);
    this.tasks = [];
    this.todayLong = $filter('date')(nowValue, "d MMM yyyy").toLowerCase();

    this.weekDays = [
      {
        date:parsedDate,
        dateFiltered: $filter('date')(parsedDate, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + oneDay,
        dateFiltered: $filter('date')(parsedDate + oneDay, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + 2*oneDay,
        dateFiltered: $filter('date')(parsedDate + 2*oneDay, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + 3*oneDay,
        dateFiltered: $filter('date')(parsedDate + 3*oneDay, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + 4*oneDay,
        dateFiltered: $filter('date')(parsedDate + 4*oneDay, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + 5*oneDay,
        dateFiltered: $filter('date')(parsedDate + 5*oneDay, "d MMM yyyy").toLowerCase()
      },
      {
        date:parsedDate + 6*oneDay,
        dateFiltered: $filter('date')(parsedDate + 6*oneDay, "d MMM yyyy").toLowerCase()
      }
    ];

    todayService.getTasks(function (res) {
        vm.tasks = res.data;
    });

    console.log(oneDay);
    console.log(parsedDate);
    console.log(nowValue);

    // $scope.todayLong = $filter('date')(day, "d MMM yyyy").toLowerCase();
    //      $scope.todayShort = $filter('date')(day, "dd MMM").toLowerCase();
    // +    $scope.todayDate = $filter('date')(day, "dd").toLowerCase();
    // +    $scope.todayDay = $filter('date')(day, "MMM").toLowerCase();
    // +
    // +    $scope.weeks = [
    // +      daysService.today,
    // +      daysService.dayAfterToday,
    // +      daysService.twoDaysAfterToday,
    // +      daysService.threeDaysAfterToday,
    // +      daysService.fourDaysAfterToday,
    // +      daysService.fiveDaysAfterToday,
    // +      daysService.sixDaysAfterToday,
    // +    ];


    // .service("daysService", function(todayValue, $filter){
    // +      /*var oneDay = 86400000,
    //+          parsedDate = Date.parse(todayValue);*/
    // +      this.today = {
    // +        date: $filter('date')(todayValue, "d").toLowerCase(),
    // +        day: "today",
    // +        weekDate: $filter('date')(todayValue, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(todayValue, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(todayValue, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.dayAfterToday = {
    // +        date: $filter('date')(parsedDate + oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.twoDaysAfterToday = {
    // +        date: $filter('date')(parsedDate + 2*oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + 2*oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + 2*oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + 2*oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + 2*oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.threeDaysAfterToday = {
    // +        date: $filter('date')(parsedDate + 3*oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + 3*oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + 3*oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + 3*oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + 3*oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.fourDaysAfterToday = {
    // +        date: $filter('date')(parsedDate + 4*oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + 4*oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + 4*oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + 4*oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + 4*oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.fiveDaysAfterToday = {
    // +        date: $filter('date')(parsedDate + 5*oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + 5*oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + 5*oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + 5*oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + 5*oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +      this.sixDaysAfterToday = {
    // +        date: $filter('date')(parsedDate + 6*oneDay, "d").toLowerCase(),
    // +        day: $filter('date')(parsedDate + 6*oneDay, "EEE").toLowerCase(),
    // +        weekDate: $filter('date')(parsedDate + 6*oneDay, "d EEE").toLowerCase(),
    // +        projectDate: $filter('date')(parsedDate + 6*oneDay, "dd MMM").toLowerCase(),
    // +        longDate: $filter('date')(parsedDate + 6*oneDay, "d MMM yyyy").toLowerCase()
    // +      };
    // +    })
};
