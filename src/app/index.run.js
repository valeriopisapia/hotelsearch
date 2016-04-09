(function() {
  'use strict';

  angular
    .module('hotelscan')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
