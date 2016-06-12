
var app = angular.module('SimpleNoteApp', ['ngMaterial', 'ngRoute'] );

app.config(function($routeProvider, $locationProvider){
	$routeProvider
 		.when ( '/edit/:noteId', {
			templateUrl : 'editNote.html', 
			controller : 'editController'
		}) 
		.when ( '/edit', {
			templateUrl : 'editNote.html', 
			controller : 'editController'
		}) 
  		.otherwise( {
			templateUrl : 'listNotes.html', 
			controller : 'mainController'
		});

	// use the HTML5 History API
    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location) {

	$scope.canDelete = function(){
		return $location.path().startsWith('/edit');
	}; 

	$scope.edit = function ( noteId ) {
		$location.path( "edit/" + noteId );
	};

	$scope.deleteCurrentNote = function(){
		
		var noteId = $location.path().slice( $location.path().lastIndexOf( "/" ) + 1 ); 
		console.log( "delete:" + noteId );

		// delete note from backend
		$http({
			method: 'DELETE',
			url: 'note/' + noteId
		}).then(function successCallback(response){
			console.log("toto");
			$location.path("/");
			
		}, function errorCallback(response) {
			console.log("error=" + response);
			$location.path("/");
		});
	}

	// get notes
	$http({
		method: 'GET',
		url: 'notes'
	}).then(function successCallback(response) {
		$scope.notes = response.data
	}, function errorCallback(response) {
		console.log("error=" + response);
	});
});

app.controller('editController', function($scope, $routeParams, $http, $timeout) {

	// get notes
	$http({
		method: 'GET',
		url: 'note/' + $routeParams.noteId
	}).then(function successCallback(response) {
		$scope.note = response.data;
	}, function errorCallback(response) {
		console.log("error=" + response);
	});

	// save in back-end on modifications
	$scope.saveNote = function() {
		
		var url = "note";

		// update existing note, else create a new one
		if ( $scope.note.id ) {
			url += "/" + $scope.note.id; 
		}

		// update backend
		$http({
			method: $scope.note.id ? 'PUT' : 'POST',
			url: url,
			data: $scope.note
		}).then(function successCallback(response) {

			// update note id on creation
			if ( !$scope.note.id ){
				$scope.note = response.data;
			}

		}, function errorCallback(response) {
			console.log("error=" + response);
		});
	};
});

// function routerHandler() {

//     var $panels = $('[role="panel"]');
//     var $menuItems = $('[role="navigation"] li');

//     function handleRouteChange() {

//         var hash;
//         // Default screen management.
//         if(window.location.hash.length === 0) {
//             hash = "#crud-create";
//         } else {
//             hash = window.location.hash;
//         }

//         // Reset panels visibility.
//         $panels.hide();

//         // Select panel, and show it.
//         var $panel = $panels.filter(hash).show();

//         // Unselect previously selected item.
//         $menuItems.filter('[aria-selected="true"]').attr('aria-selected', false);

//         // Mark proper menu item as selected.
//         $menuItems.find('[href="' + hash + '"]')
//                   .parent()
//                   .attr('aria-selected', true);
//     }

//     window.onpopstate = handleRouteChange;
//     handleRouteChange();
// }

// window.onload = function() {
//     routerHandler();
// 	createNoteHandler();
// 	listNoteHandler();
// };


// function createNoteHandler() {

//     var $payload = $('#crud-create-note .payload pre');
//     var $result = $('#crud-create-note .result');
//     var $resultStatus = $result.find(' p.status span');
//     var $resultBody = $result.find('pre');
//     var $title = $('#create-note-title');
//     var $text = $('#create-note-text');
//     var $button = $('#crud-create-note button');

//     function onFieldChange() {
//         var payload = {};

//         if ($title.val() && $title.val().length > 0) {
//             payload.title = $title.val();
//         }

//         if ($text.val() && $text.val().length > 0) {
//             payload.text = $text.val();
//         }

//         $payload.html(JSON.stringify(payload, null, 2));
//     }

//     function onSubmit() {

//         var payload = $payload.html();
//         $result.removeClass('error').removeClass('success');

//         $.ajax({
//             'method': 'POST',
//             'url': 'note',
//             'data': payload,
//             'headers': {
//                 'content-type': 'application/json'
//             },
//             'complete': function(xhr, textStatus) {
//                 $resultStatus.html(xhr.status);

//                 if (xhr.status !== 201) {
//                     $result.addClass('error');
//                     $resultBody.html(xhr.responseText);
//                 } else if (!xhr.responseJSON) {
//                     $result.addClass('error');
//                     $resultBody.html('The created document is expected in ' +
//                                      'the response');
//                 } else {
//                     $result.addClass('success');
//                     var formatted = JSON.stringify(xhr.responseJSON, null, 2);
//                     $resultBody.html(formatted);
//                 }
//             }
//         });
//     }

//     $title.keyup(onFieldChange);
//     $text.keyup(onFieldChange);
//     $button.click(onSubmit);
// }

// function listNoteHandler() {

//     var $result = $('#crud-list-note .result');
//     var $resultStatus = $result.find(' p.status span');
//     var $resultBody = $result.find('pre');
//     var $button = $('#crud-list-note button');

//     function onSubmit() {

//         $result.removeClass('error').removeClass('success');

//         $.ajax({
//             'method': 'GET',
//             'url': 'notes',
//             'complete': function(xhr, textStatus) {
//                 $resultStatus.html(xhr.status);

//                 if (xhr.status !== 200) {
//                     $result.addClass('error');
//                     $resultBody.html(xhr.responseText);
//                 } else {
//                     $result.addClass('success');
//                     var formatted = JSON.stringify(xhr.responseJSON, null, 2);
//                     $resultBody.html(formatted);
//                 }
//             }
//         });
//     }

//     $button.click(onSubmit);
// }
