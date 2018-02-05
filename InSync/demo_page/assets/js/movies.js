var app = angular.module("dashboard", ['ngCookies', 'angucomplete-alt']);

angular.module("dashboard").controller("dashCtrl", ["$scope", "$cookies", "$http", function($scope, $cookies, $http) {
    //0,1,2,3,4
    $scope.userId = $cookies.get("userId");
    $scope.userId = 0;
    $scope.moviesImageList = [
        "https://media.bloomsbury.com/rep/bj/9781628928396.jpg",
	"https://upload.wikimedia.org/wikipedia/en/6/6a/Lincoln_2012_Teaser_Poster.jpg",
	"https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
	"https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
	"https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
	"https://upload.wikimedia.org/wikipedia/en/5/52/Salt_film_theatrical_poster.jpg",
	"https://i.annihil.us/u/prod/marvel/i/mg/4/c0/569e62f835d97/portrait_incredible.jpg",
	"https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3NzE@._V1_UY268_CR1,0,182,268_AL_.jpg",
	"https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4MDU0NTUyN15BMl5BanBnXkFtZTgwMzQxMzY4MjE@._V1_UY1200_CR90,0,630,1200_AL_.jpg"
    ];

    $scope.getMovieCover = function(index) {
        return $scope.moviesImageList[index % ($scope.moviesImageList.length)];
    }
          function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

    $scope.currentFilter = null;
    $scope.fetchMoviesByGenre = function(genre) {
        console.log(genre);
	$scope.currentFilter = genre;
        if (genre && genre != undefined && genre != null) {
	    $scope.moviesList = [];
	    shuffle($scope.moviesImageList);
            $http.get("http://34.216.149.88:5001/SemanticApi/getMoviesForUser?userId="+$scope.userId+ "&genre=" + genre).success(function(res) {
                $scope.moviesList = _.map(res.allMovieList, function(movie) {
                    return movie.movie;
                })
            }).error(function(error) {

            })
        }
    }

    //TODO : When api is ready fix this
    function getUserData() {
        $http.get("http://34.216.149.88:5001/SemanticApi/getUserDetails?userId=" + $scope.userId).success(function(res) {

	    $scope.moviesList = res.resultList[0].movies;
	    console.log($scope.moviesList);
        }).error(function(error) {
            console.error(error);
        })
    }
        getUserData();
}]);
