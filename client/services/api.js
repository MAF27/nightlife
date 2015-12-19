var app = require('angular')
	.module('nightlife');

app.factory('api', apiFactory);

apiFactory.$inject = ['$http'];

function apiFactory($http) {
	return {
		getUser: getUser
	};

	function getUser() {
		return $http.get('/api/get-user')
			.then(function(response) {
					return response.data;
				},
				function(reason) {
					console.log(reason);
				});
	}
}
