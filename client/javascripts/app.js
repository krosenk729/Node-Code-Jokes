angular.module('nodeCodeJokes', [])
.controller('mainController', ($scope, $http) =>{
	$scope.formData = {};
	$scope.jokeData = [];

	// get jokes
	$http.get('/nodecode')
	.success((data) => {
		$scope.jokeData = data;
		console.log('angular data ', data);
	})
	.error((error) =>{
		console.log('error in angular data ' + error);
	});

	// add joke
	$scope.addJoke = () =>{
		$http.post('/nodecode', $scope.formData)
		.success((data) => {
			$scope.formData = {};
			$scope.jokeData = data;
			console.log('scope data ', data);
		})
		.error((error) => {
			console.log('error ', error);
		});
	};

	// delete joke
	$scope.removeJoke = (jokeID) =>{
		$http.delete('/nodecode/' + jokeID)
		.success((data) => {
			$scope.jokeData = data;
			console.log('scope data ', data);
		})
		.error((error) => {
			console.log('error ', error);
		});
	};

	// update joke
	$scope.changeRating = (jokeID, newRate)=>{
		console.log('joke rating', jokeID, newRate);
	}
});