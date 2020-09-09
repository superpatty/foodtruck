'use strict';

function fetchFoodTruckFile(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(response) {
            console.log('successfully retrieved food truck file');
            console.log(response);
            let data = $.csv.toObjects(response);

            console.log(data);
            console.log('successfully retrieved and parsed ' + data.length + ' food trucks');
        },
        error: function(err) {
            console.log('error retrieving food truck file');

        }
    });
}

function popErrorMessage(message) {
    $('#errorMessage')
        .innerText('Error: ' + message)
        .show();
}

function searchFoodItems(searchTerm) {

}

