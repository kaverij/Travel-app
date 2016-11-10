var stateController = require('../components/travel-booking/mainController.js');
var firstTemplate = require('../components/travel-booking/index.html');
var secondTemplate = require('../components/travel-booking/home.html');

export default function ($stateProvider, $urlRouterProvider) {
    'ngInject';
    $urlRouterProvider.otherwise('/index');

    $stateProvider
        .state('index', {
            url: '/index',
            template: firstTemplate,
            controller: stateController
        })
        .state('home', {
            url: '/home',
            template: secondTemplate,
            controller: stateController
        })
        .state('home.personalDetails', {
            url: '/personalDetails',
            templateUrl: '../components/travel-booking/personalDetails.html'
        })
        .state('home.bookingDetails', {
            url: '/bookingDetails',
            templateUrl: '../components/travel-booking/bookingDetails.html'
        })
        .state('home.message', {
            url: '/confirmBooking',
            templateUrl: '../components/travel-booking/confirmBookingContent.html'
        });
}