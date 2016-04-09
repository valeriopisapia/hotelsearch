(function() {
  'use strict';

  angular
    .module('hotelscan')
    .controller('MainController', MainController)
    .controller('OtherController', OtherController);

  /** @ngInject */
  function MainController(HotelData, NgMap, $filter, $log, PageCount) {
    var vm = this;

    console.log("START: ", HotelData);

    vm.hotels = HotelData;
    vm.hotelsOriginal = [];

    angular.copy(vm.hotels, vm.hotelsOriginal);

    vm.pageSize = PageCount;
    vm.currentPage = 1;

    $log.info("vm.hotels: ", vm.hotels);
    $log.info("vm.hotelsOriginal: ", vm.hotelsOriginal);

    vm.slider = {
      minValue: vm.hotelsOriginal[0].detail.id,
      maxValue: vm.hotelsOriginal[0].detail.id * 1.1,
      options: {
        ceil: _.last(vm.hotelsOriginal).detail.id,
        floor: vm.hotelsOriginal[0].detail.id,
        step: 1,
        onChange:function(){
          $log.info("vm.slider.minValue: ", vm.slider.minValue);
          $log.info("vm.slider.maxValue: ", vm.slider.maxValue);
          vm.hotels = $filter('rangeId')(vm.hotelsOriginal, vm.slider.minValue, vm.slider.maxValue);
        }
      }
    };

    vm.clearFilter = function (){
      vm.hotels = vm.hotelsOriginal;
      vm.search = null;
    };

    //Maps Configuration
    NgMap.getMap().then(function(map) {
      vm.map = map;
      $log.info(map.getCenter());
      $log.info('markers', map.markers);
      $log.info('shapes', map.shapes);
    });

    //TODO: InfoWindow on 'View' directly(maybe there is a little bug in the NgMap lib)
    vm.showInfoWindow = function (event, hotel) {
      var infowindow = new google.maps.InfoWindow();
      var center = new google.maps.LatLng(hotel.position[0],hotel.position[1]);

      infowindow.setContent(
        '<h4>' + hotel.detail.name + '</h4>');

      infowindow.setPosition(center);
      infowindow.open(vm.map);
    };
  }


  function OtherController() {
      //
  }
})();
