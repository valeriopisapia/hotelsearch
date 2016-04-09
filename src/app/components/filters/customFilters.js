angular
  .module("customFilters", [])
  .filter("rangeId", function (){
    return function (data, min, max){
      if (angular.isArray(data) && angular.isNumber(min) && angular.isNumber(max)) {
        var array = [];
        _.forEach(data, function(itm){
          if (itm.detail.id >= min && itm.detail.id <=max){
            array.push(itm);
          }
        });
          return array;
      } else{
        return data;
      }
    }
  })
  .filter("filtering", function ($filter, PageCount){
    return function (data, city, stars){
      var filterArray = data;

      if (city != '' && city != undefined) {
        var expression = { detail : { city: city } };
        filterArray = $filter('filter')(filterArray, expression);
      }

      if (stars != '' && stars != undefined){
        var expression = { detail : { stars: stars } };
        filterArray =  $filter('filter')(filterArray, expression);
      }

      return filterArray; //$filter('limitTo')(filterArray, PageCount);
    }
  })
  .filter("customOrderBy", function ($filter){
    return function (data, isName, isId){
      var filterArray = data;
      if (isName){
        filterArray = $filter('orderBy')(filterArray, '-detail.name', isName);
      }
      if (isId){
        filterArray = $filter('orderBy')(filterArray, 'detail.id', isId);
      }

      return filterArray;
    }
  });

