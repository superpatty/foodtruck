'use strict';

var foodTruckData = null;
var infobox = null;
var allFoodTrucksLayer = null;
var currentFoodTruckLayer = null;

var defaultCenter = {
    centerLat: 37.762021,
    centerLong: -122.435365
};

function fetchFoodTruckFile(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(response) {
            console.log('successfully retrieved food truck file');
            foodTruckData = $.csv.toObjects(response);

            allFoodTrucksLayer = new Microsoft.Maps.Layer();
            currentFoodTruckLayer = new Microsoft.Maps.Layer();

            console.log('successfully parsed ' + foodTruckData.length + ' food trucks');
            let center = determineMapCenter(foodTruckData);

            console.log('setting map centerlat: ' + center.centerLat + ' long: ' + center.centerLong);
            map.setView({center: new Microsoft.Maps.Location(center.centerLat, center.centerLong), zoom: 13});

            infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
                visible: false
            });

            infobox.setMap(map);

            addFoodTruckMarkers(foodTruckData, allFoodTrucksLayer);
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
    searchTerm = searchTerm.trim();
    currentFoodTruckLayer.clear();

    if (searchTerm === '') {
        console.log('empty string, resetting view');
        currentFoodTruckLayer.setVisible(false);
        allFoodTrucksLayer.setVisible(true);
    }
    let resultFoodTrucks = [];
    $.each(foodTruckData, function(key, foodTruck) {
        if (foodTruck.FoodItems.search(searchTerm) > 0) {
            resultFoodTrucks.push(foodTruck);
        }
    });

    addFoodTruckMarkers(resultFoodTrucks, currentFoodTruckLayer);
}

function searchFoodTrucks(e) {
    console.log('searching food trucks');
    console.log(e.target.value);
    searchFoodItems(e.target.value);
}

function resetFoodTruckMarkers()
{
    currentFoodTruckLayer.clear();
    currentFoodTruckLayer.setVisible(false);
    addFoodTruckMarkers(foodTruckData, allFoodTrucksLayer);
    $('#searchBox').val('');
}

function addFoodTruckMarkers(foodTrucks, layer = null) {
    $.each(foodTrucks, function(key, foodTruck) {
        let pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(foodTruck.Latitude, foodTruck.Longitude), {
            title: foodTruck.Applicant,
            icon: '/deliveryTruck.png'
        });

        pin.metadata = {
            title: foodTruck.Applicant,
            address: foodTruck.Address,
            foodItems: foodTruck.FoodItems,
        }
        Microsoft.Maps.Events.addHandler(pin, 'click', foodTruckMarkerClicked);

        if (layer !== null) {
            layer.add(pin);
        } else {
            map.entities.push(pin);
        }
    });
    allFoodTrucksLayer.setVisible(false);
    currentFoodTruckLayer.setVisible(false);

    layer.setVisible(true);
    map.layers.insert(layer);
}

function foodTruckMarkerClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.address + '<br/>' + e.target.metadata.foodItems,
            visible: true
        });
    }
}

function areGPSCoordinatesValid(lat, long) {
    let maxLat = 39;
    let minLat = 36;
    let maxLong = -120;
    let minLong = -124;

    if (lat > minLat && lat < maxLat && long > minLong && long < maxLong) {
        return true;
    }
    return false;
}

function determineMapCenter(foodTrucks) {
    console.log('determining map center');

    if (foodTrucks.length < 1) {
        console.log('no food trucks loaded, defaulting center');
        return defaultCenter;
    }


    let lat = 0;
    let long = 0;
    let gpsCount = 0;
    $.each(foodTrucks, function(key, foodTruck) {
            let currentLat = parseFloat(foodTruck.Latitude);
            let currentLong = parseFloat(foodTruck.Longitude);

            if (areGPSCoordinatesValid(currentLat, currentLong)) {
                lat += currentLat;
                long += currentLong;
                gpsCount++;
            }
    });

    if (gpsCount === 0) {
        console.log('no valid gps coordinates, defaulting center');
        return defaultCenter;
    }

    let centerLat = lat / gpsCount;
    let centerLong = long / gpsCount;

    return {
        centerLat: centerLat,
        centerLong: centerLong
    }
}
