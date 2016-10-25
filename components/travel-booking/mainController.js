export default mainController;
require('./style.scss');

function mainController($scope, $http, $state, $filter) {
    'ngInject';

    $http.get('cityNames.json').success(function (response) {               //get city from cityNames.json file
        $scope.locations = response;
    })

    $scope.dateOptions = {
        maxDate: new Date(2020, 5, 22),
        minDate: new Date()
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.format = 'dd-MMMM-yyyy';

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.tabs = [
        {title: 'Personal Details', disabled: false, active: 'pointer-active', action: '.personalDetails'},
        {title: 'Booking Details', disabled: true, active: 'pointer-deactive', action: '.bookingDetails'},
        {title: 'Confirm Booking', disabled: true, active: 'pointer-deactive', action: '.message'}];

    $scope.locationData = {};
    $scope.bookingDetails = [];
    $scope.btnIndex = 0;

    function sendMail() {                                          //method for send booking confirmation mail.
        $http({
            method: 'GET',
            url: 'http://192.168.10.72:7000/postEmail?email=' + $scope.bookingDetails[0].email +
            '&fname=' + $scope.bookingDetails[0].fname +
            '&lname=' + $scope.bookingDetails[0].lname +
            '&phone=' + $scope.bookingDetails[0].phone +
            '&location=' + $scope.locationData.city.city +
            '&departDate=' + $filter('date')($scope.bookingDetails[1].departDate, "dd-MMMM-yyyy") +
            '&returnDate=' + $filter('date')($scope.bookingDetails[1].returnDate, "dd-MMMM-yyyy")
        })
    }

    $scope.onNextBtnClick = function (object, index) {                     //button click for go to next tab.
        $scope.bookingDetails.push(object);
        $scope.btnIndex++;
        $scope.tabs[index].disabled = false;
        $scope.tabs[index].active = 'pointer-active';

        if (index == 1) {
            $state.go('home.bookingDetails');
        } else if (index == 2) {
            $state.go('home.message');
            $scope.tabs[0].disabled = true;
            $scope.tabs[1].disabled = true;
            $scope.tabs[0].active = 'pointer-deactive';
            $scope.tabs[1].active = 'pointer-deactive';
        }
    };

    $scope.sendMailBtnClick = function () {                                     //button click for send mail.
        sendMail();
        window.confirm("Your Booking is Confirmed...!!!. please check your mail...!!!");
    }

    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [],
        currIndex = 0;

    $scope.addSlide = function () {                                           //method for carousel.
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '../../assets/slide_' + (currIndex + 1) + '.jpg',
            text: ['Golden Gate Bridge(San Francisco)', 'Zion National Park (Utah)',
                'statue of liberty(New york)', 'Maui (Island in Hawaii)',
                'Yosemite National Park (California)', 'Disneyland(Florida)', 'Washington, D.C.(Capital of USA)',
                'Niagara falls']
                [slides.length % 8],
            id: currIndex++
        });
    };

    for (var i = 0; i < 8; i++) {
        $scope.addSlide();
    }
}