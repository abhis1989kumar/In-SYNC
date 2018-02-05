var app = angular.module("dashboard", ['ngCookies', 'angucomplete-alt']);

angular.module("dashboard").controller("dashCtrl", ["$scope", "$cookies", "$http", function($scope, $cookies, $http) {
    //0,1,2,3,4
    $scope.userId = getRandomInt(0, 5);
    $cookies.put("userId",$scope.userId);
    $scope.listOfArtist = [
            { value: 'Shakira' },
            { value: 'Ricky Martin' },
            { value: 'CNCO'},
            { value: 'J Balvin' },
            { value: 'Daddy Yankee' },
            { value: 'Sebastian Yatra' },
            { value: 'Rombai' },
            { value: 'Zion & Lennox' },
            { value: 'Carlos Vives' },
            { value: 'Ozuna' },
            { value: 'Chino & Nacho' },
            { value: 'Thalía' },
            { value: 'Maluma' },
            { value: 'Charly Black' },
            { value: 'Piso 21' },
            { value: 'Carlos Vives' },
            { value: 'Enrique Iglesias' },
            { value: 'DJ Snake' },
            { value: 'Mano Arriba' },
            { value: 'Wisin' },
            { value: 'Clean Bandit' }
            
    ];
    $scope.musicImageList = [
	"http://www.designformusic.com/wp-content/uploads/2016/04/orion-trailer-music-album-cover-design.jpg",
	"https://marketplace.canva.com/MAB6qNBAV-0/1/0/thumbnail_large/canva-in-too-deep-diving-music-album-cover-MAB6qNBAV-0.jpg",
	"https://img.discogs.com/0IODnWrVY7i061-IFJx86-5m11A=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-258882-1425707940-8805.jpeg.jpg",
	"https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png",
	"http://f4.bcbits.com/img/0001573770_10.jpg",
	"https://images-na.ssl-images-amazon.com/images/I/418B9E3N9JL.jpg",
	"https://www.theyoungfolks.com/wp-content/uploads/2017/01/31.jpg",
	"https://images-na.ssl-images-amazon.com/images/I/61GQ4SuAccL._SY355_.jpg",
	"https://is3-ssl.mzstatic.com/image/thumb/Music/51/b4/70/mzi.oieyvvlq.jpg/268x0w.jpg",
	"https://upload.wikimedia.org/wikipedia/en/7/72/Jutty_Ranx_-_%22I_See_You%22_%28official_single_cover%29.jpg",
	"https://cdn6.aptoide.com/imgs/a/9/d/a9d242e13be773f9e3d87e8dd9ed40c1_icon.png?w=240"
    ]
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
    
    $scope.selectedArtist = null;
    $scope.changeAuto = function(selection) {
        if (selection && selection != undefined && selection != null) {
	    $scope.musicList =[];
	    shuffle($scope.musicImageList);
            $http.get("http://34.216.149.88:5001/SemanticApi/getSongsForUser?artist=" + selection.title).success(function(res) {
		$scope.musicList = _.map(res.resultList, function(musicObject){
		    return musicObject.name;
		})
            }).error(function(error) {

            })
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //TODO : When api is ready fix this
    function getUserData(){
    $http.get("http://34.216.149.88:5001/SemanticApi/getUserDetails?userId=" + $scope.userId).success(function(res) {
        console.log(res.resultList);
        // $scope.musicList = _.filter(res.resultList, function(resultObject) {
        //     return Object.keys(resultObject)[0] == 'music';
        // })
	$scope.musicList = res.resultList[0].music;
	console.log($scope.musicList);

    }).error(function(error) {
        console.error(error);
    })
    }
    getUserData();
}]);
