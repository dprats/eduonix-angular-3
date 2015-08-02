'use strict';

angular.module('myContactsApp.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {

	var ref = new Firebase('https://dprats-mycontactsapp.firebaseio.com/contacts');
	$scope.contacts = $firebaseArray(ref);
	// console.log($scope.contacts);

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	$scope.hide = function(){
		$scope.addFormShow = false;
	}

	$scope.clearFields = function(){

		$scope.name = "";
		$scope.email = ""; 
		$scope.company = "";
		$scope.work_phone = "";
		$scope.mobile_phone = "";
		$scope.home_phone = "";
		$scope.street_address = "";
		$scope.city = "";
		$scope.state = "";
		$scope.zip = ""

	}

	$scope.addFormSubmit = function(){
		console.log('Adding contact...');

		if ($scope.name) { var name = $scope.name } else { name = null; }
		if ($scope.email) { var email = $scope.email } else { email = null; }
		if ($scope.company) { var company = $scope.company } else { company = null; }
		if ($scope.work_phone) { var work_phone = $scope.work_phone } else { work_phone = null; }
		if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone } else { mobile_phone = null; }
		if ($scope.home_phone) { var home_phone = $scope.home_phone } else { home_phone = null; }
		if ($scope.street_address) { var street_address = $scope.street_address } else { street_address = null; }
		if ($scope.city) { var city = $scope.city } else { city = null; }
		if ($scope.state) { var state = $scope.state } else { state = null; }
		if ($scope.zip) { var zip = $scope.zip } else { zip = null; }

		//note that $scope.contacts is already linked to firebaseArray via reference
		$scope.contacts.$add({

			name: name,
			email: email,
			company: company,
			phones: [
				{
					mobile: mobile_phone,
					work: work_phone,
					home: home_phone
				}
			],
			address: [
				{ 
					street: street_address,
					city: city,
					state: state,
					zip: zip
				}

			]
		}).then(function(ref){
			var id = ref.key();
			console.log('Added contact with id: ' + id);

			//custom method to hide the fields
			$scope.clearFields();

			//hide the form
			$scope.addFormShow = false;

			//send message
			$scope.msg = "Contact Added"
		});

	}

	$scope.showContact = function(contact){

		console.log('getting contact...');
		$scope.name = contact.name;
		$scope.company = contact.company;
		$scope.email = contact.email;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip = contact.address[0].zip;

		$scope.contactShow = true;

	}

}]);