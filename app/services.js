angular.module('comic-news-services', [])
.factory('fb-service', function() {
    return {
        
    }
})
.factory('ComicNews', ['$resource',function($resource) {
    return $resource('comic-news/:comicId.json', {}, {
        query: { method:"GET", params:{comicId:'comics'}, isArray:true },
        queryChecked: { method:"GET", params:{comicId:'comics-checked'}, isArray:true },
        get: { method:"GET", params:{comicId:'comics'}, isArray:false }
    });
}]);
