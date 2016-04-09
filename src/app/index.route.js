(function() {
  'use strict';

  angular
    .module('hotelscan')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve:{
          HotelData:['hotelService', function getHotels(hotelService)
          {
            return hotelService.getHotels();
          }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
