angular.module('comic-news-services', [])
.factory('auth-service', ['$http', function($http, $httpProvider) {
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
                    console.log("user is logged in "+res.authResponse.accessToken);

                    var backend = 'facebook';
                    $.post('/auth/convert-token', {   
                        grant_type:'convert_token',
                        client_id:'0haD0hqe8ZUz7ViEZawzYMBwfX0oY35B2UByn8mJ',
                        client_secret:'UqxBFX8hYSI5aaCIvx5btd4AgEEglNcFgv7rO3Sszdtws9JAvQhBBn1xuV3T0zUJE8z168o7RqWS2D7Fmc4jhgNttRms0CBiIiOncoMjQbKaZ96xxANMVfvdvZNMvwgB',
                        backend:backend,
                        token:res.authResponse.accessToken                                      
                    },  function(res) {
                        console.log(res);
                        if(res.access_token) {
                            // convertToken success
                            // test bring data from server
                            $.ajax('/books/', {
                                method: 'GET',
                                data: {
                                },
                                headers: {
                                    'Authorization': res.token_type + ' ' + res.access_token
                                }
                            }).done(function (res) {
                                console.log(res);
                            });
                        }
                    });
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
