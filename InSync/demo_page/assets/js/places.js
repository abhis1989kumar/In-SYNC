var app = angular.module("dashboard", ['ngCookies', 'angucomplete-alt']);

angular.module("dashboard").controller("dashCtrl", ["$scope", "$cookies", "$http", function($scope, $cookies, $http) {

    $scope.userId = $cookies.get('userId');

    $scope.placesImageList = [
	"http://f4.bcbits.com/img/0001573770_10.jpg",
	"https://cdn6.aptoide.com/imgs/a/9/d/a9d242e13be773f9e3d87e8dd9ed40c1_icon.png?w=240",
	"https://upload.wikimedia.org/wikipedia/en/7/72/Jutty_Ranx_-_%22I_See_You%22_%28official_single_cover%29.jpg",
	"https://is3-ssl.mzstatic.com/image/thumb/Music/51/b4/70/mzi.oieyvvlq.jpg/268x0w.jpg",
	"https://images-na.ssl-images-amazon.com/images/I/61GQ4SuAccL._SY355_.jpg",
	"https://www.theyoungfolks.com/wp-content/uploads/2017/01/31.jpg",
	"https://images-na.ssl-images-amazon.com/images/I/418B9E3N9JL.jpg",
	"https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png",
	"https://www.smashingmagazine.com/images/music-cd-covers/43.jpg",
	"http://www.designformusic.com/wp-content/uploads/2016/04/orion-trailer-music-album-cover-design.jpg"
    ]
    $scope.getPlacesImage = function(index){
	return $scope.placesImageList[index%($scope.placesImageList.length)];
    }
        
    //TODO : When api is ready fix this
    function getUserData(){
    $http.get("http://34.216.149.88:5001/SemanticApi/getUserDetails?userId=" + $scope.userId).success(function(res) {
	$scope.placesList = res.resultList[0].visitedPlaces;
	console.log($scope.placesList);

    }).error(function(error) {
        console.error(error);
    })
    }
    getUserData();
}]);
