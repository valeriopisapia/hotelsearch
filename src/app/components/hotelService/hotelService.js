(function() {
  'use strict';

  angular
    .module('hotelscan')
    .service('hotelService', hotelService);

  hotelService.$inject = ['$http', '$q', '$log', 'DATAURL', 'LIMIT'];

  /** @ngInject */
  function hotelService($http, $q, $log, DATAURL, LIMIT){

    return{
      getHotels: getHotels
    }

    function getHotels() {
      var deferred = $q.defer();

      $http({method: 'GET', url: DATAURL + "?limit=" + LIMIT})
        .then(getHotels)
        .catch(getHotelsFailed);

      function getHotels(response) {
        var res = response['data']['results'];
        $log.info('SERVICE: getHotels() response ', response);
        deferred.resolve(formattingData(res));
      }

      function getHotelsFailed(errors) {
        $log.error('SERVICE: getHotels() FAILED', errors);
      }

      function formattingData(data){
        var array = [];
        angular.forEach(data, function(item){
          array.push({
            position: [item.lat, item.lng],
            detail:{
              id: item.hotel_id,
              name: item.name,
              address: item.address,
              city: item.city,
              stars: item.stars
            }
          });
        });

        return array;
      }

      return deferred.promise
    }
  }
})();
