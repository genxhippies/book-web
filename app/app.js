var app = angular.module('comic-news-app', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'comic-news-controllers',
    'comic-news-services',
    'ui.bootstrap'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/news/', {
            templateUrl: 'comic-news.html',
            controller: 'comic-news-list-controller'
        }).
        when('/checked/', {
            templateUrl: 'comic-checked.html',
            controller: 'comic-news-list-controller'
        }).
        otherwise({
            redirectTo: '/news/'
        })
    }]);
        


app.run(['$rootScope', '$window', 'auth-service', function($rootScope, $window, authSvc) {
    $rootScope.user = {};

    $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded.

        FB.init({
            /*
             The app id of the web app;
             To register a new app visit Facebook App dashboard
             ( https://developers.facebook.com/apps/ )
            */
            appId: '1589308981337436',
            status: true,
            cookie: true,
            xfbml: true,
            version: '2.4'
        });
        authSvc.watchAuthenticationStatusChange();
    };

    (function(d) {
        // load the Facebook javascript SDK
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];

        if(d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
}]);

