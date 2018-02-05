var app = angular.module("dashboard", ['ngCookies', 'angucomplete-alt']);
/*
angular.module("dashboard").directive('myEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
*/
angular.module("dashboard").controller("dashCtrl", ["$scope", "$cookies", "$http", function($scope, $cookies, $http) {
	$scope.userId = $cookies.get('userId');
    //0,1,2,3,4
	$scope.listOfArtist = [
            { value: 'Mark P. O. Morford' },
            { value: 'Richard Bruce Wright' },
            { value: 'Amy Tan'},
            { value: 'Scott Turow' },
            { value: 'Ann Beattie' },
            { value: 'Adam Lebor' },
            { value: 'Sheila Heti' },
            { value: 'R. J. Kaiser' },
            { value: 'Julia OliveR' },
            { value: 'The Onion' },
            { value: 'Toni Morrison' },
            { value: 'J. R. Parrish' },
            { value: 'Robynn Clairday' },
            { value: 'Rich Shapero' },
            { value: 'Michael Crichton' },
            { value: 'Stephan Jaramillo' },
            { value: 'Eleanor Cooney' },
            { value: 'Harper Lee' },
            { value: 'Jo Dereske' },
            { value: 'Jane Austen' },
            { value: 'Maeve Binchy' }
            
    ];
	
    
    $scope.bookSearch = null;
          function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
		$scope.getMusicCover = function(index){
	return $scope.musicImageList[index%($scope.musicImageList.length)];
    }
	
	$scope.changeAuto = function(selection) {
        if (selection && selection != undefined && selection != null) {
	    $scope.musicList =[];
	    shuffle($scope.booksImageList);
            $http.get("http://34.216.149.88:5001/SemanticApi/getBooksForUser?userID=" + $scope.userID + "author=" + selection.title).success(function(res) {
		$scope.musicList = _.map(res.allBookList, function(musicObject){
		    return musicObject.name;
		})
            }).error(function(error) {

            })
        }
    }
	
	/*
	$scope.searchByAuthor = function() {
        console.log($scope.bookSearch);
        if ($scope.bookSearch == null || $scope.bookSearch.length == 0)
            return;
	$scope.booksList = [];
	shuffle($scope.booksImageList);
        $http.get("http://34.216.149.88:5001/SemanticApi/getBooksForUser?userId=" + $scope.userId + "&author=" + $scope.bookSearch).success(function(res) {
            var allBooksList = _.map(res.allBookList, function(book) {
                return book.name[0];
            })
            var friendBookList = _.map(res.friendBookList, function(book) {
                return book.name[0];
            });
	    $scope.booksList = _.union(allBooksList,friendBookList);
        }).error(function(error) {
            console.error(error);
        })
    }
	*/
    $scope.booksImageList = [
        "https://images-na.ssl-images-amazon.com/images/I/81l6zbSjSzL.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/916RAIVJSBL.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51H7ZvuPW0L._SX320_BO1,204,203,200_.jpg",
        "https://images.gr-assets.com/books/1348922822l/319604.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/To_Kill_a_Mockingbird.JPG/220px-To_Kill_a_Mockingbird.JPG",
        "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
        "http://d1vzko4h6qahek.cloudfront.net/images/2/books/large/HOI2.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51SYhvuy5NL._SX373_BO1,204,203,200_.jpg",
        "https://worldlitup.files.wordpress.com/2015/08/mongolia_blue-sky.jpg"

    ]
    $scope.getBooksCover = function(index) {
        return $scope.booksImageList[index % ($scope.booksImageList.length)];
    }
 

    //TODO : When api is ready fix this
    function getUserData() {
        $http.get("http://34.216.149.88:5001/SemanticApi/getUserDetails?userId=" + $scope.userId).success(function(res) {
            console.log(res.resultList);
            $scope.booksList = res.resultList[0].books;
            console.log($scope.booksList);

        }).error(function(error) {
            console.error(error);
        })
    }
    getUserData();
}]);
