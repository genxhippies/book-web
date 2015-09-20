angular.module('comic-news-services', [])
.factory('auth-service', ['$http', function($http) {
    return {
        "watchAuthenticationStatusChange" : function() {
            var _self = this;
            console.log('start watch authenticationstatus change');
            FB.Event.subscribe('auth.authResponseChange', function(res) {
                console.log(res);
                if(res.status === 'connected') {
                    // the user is already logged
                    // res.accessToken
                    // res.expiresIn
                    // res.signedRequest
                    // res.userId
                    console.log("user is logged in");

                    $http.post('http://book.iizs.net:8000/auth/convert-token', {
                        "grant_type":"convert_token",
                        "client_id":"1589308981337436",
                        "client_secret":"3e909bfb588c4255715ccf7c70ae07f2",
                        "backend":"facebook",
                        "token":res.accessToken
                    }).then(function(response) {
                        console.log('book.iizs.net login response');
                        console.log(response);
                    }, function(response) {
                        // error
                        console.log('book.iizs.net login error');
                        console.log(response);
                    })
                } else {
                    // user is not logged in.
                    console.log("user is not logged in");
                }
            });
        }
    }
}])
.factory('ComicNews', ['$resource',function($resource) {
    return $resource('comic-news/:comicId.json', {}, {
        query: { method:"GET", params:{comicId:'comics'}, isArray:true },
        queryChecked: { method:"GET", params:{comicId:'comics-checked'}, isArray:true },
        get: { method:"GET", params:{comicId:'comics'}, isArray:false }
    });
}]);
