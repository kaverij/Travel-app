angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'ui.select',
        'validation',
        'validation.rule',
        'uz.mailto'

    ])

    .config(require('../routes/routes'))
    .constant('appName', 'app')
    .run(function ($rootScope, $log) {
        $rootScope.$on(function sessionExpiredListener() {
            $log.debug('session expired');
            // TODO: Node module for frame communication messages?
            // TODO: Domain checking
            top.postMessage('_SESSION_EXPIRED_', '*');
        });
    });