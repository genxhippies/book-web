angular.module('comic-news-controllers', [])
.controller('navbar-controller', ['$scope', '$location', function($scope, $location) {
    return {
        login : function() {
            console.log('try login');
        },
        path : function() {
            return $location.path();
        },
        isNews : function() {
            return ($location.path().search('news')>=0);
        },
        isChecked : function() {
            return ($location.path().search('checked')>=0);
        }
    };
}])
.controller('comic-news-list-controller', ['$scope','$modal','ComicNews', function($scope,$modal,ComicNews) {
    $scope.new_comics = ComicNews.query(null, function() {
        console.log('loaded');
    });

    return {
        toggleCheck : function(info) {
            info.isChecked = !info.isChecked;
        },
        setOver: function(info, i, v) {
            info['isOver'+i] = v;
        },
        isOver : function(info) {
            return info.isOver1 || info.isOver2 || info.isOver3;
        },
        showDetail : function(info) {
            var modal = $modal.open({
                templateUrl: 'detail.html',
                controller: 'comic-news-detail-controller',
                resolve: {
                    detail: function() {
                        return ComicNews.get({comicId:info.id}, function() {
                            console.log('detail loaded');
                        });
                    }
                }
            });
        }
    };
}])
.controller('comic-checked-list-controller', ['$scope','$modal','ComicNews', function($scope,$modal,ComicNews) {
    $scope.checked_comics = ComicNews.queryChecked(null, function() {
        console.log('loaded');
    });

    return {
        toggleCheck : function(info) {
            info.isChecked = !info.isChecked;
        },
        setOver: function(info, i, v) {
            info['isOver'+i] = v;
        },
        isOver : function(info) {
            return info.isOver1 || info.isOver2 || info.isOver3;
        },
        showDetail : function(info) {
            var modal = $modal.open({
                templateUrl: 'detail.html',
                controller: 'comic-news-detail-controller',
                resolve: {
                    detail: function() {
                        return ComicNews.get({comicId:info.id}, function() {
                            console.log('detail loaded');
                        });
                    }
                }
            });
        }
    };
}])
.controller('comic-news-detail-controller', ['$scope','$modalInstance','detail',function($scope, $modalInstance, detail) {
    console.log('detail controller');
    console.log(detail);
    $scope.detail = detail;

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }
}]);
