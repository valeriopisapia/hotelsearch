(function() {
  'use strict';

  angular
    .module('hotelscan')
    .constant('moment', moment)
    .constant("DATAURL", "http://localhost:3000/app/data/hotels.json")
    .constant("LIMIT", 1000)
    .constant("PageCount", 25);
})();
