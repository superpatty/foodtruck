# Food Truck Exercise

### by Patrick Price

###Problem Statement
from [github](https://github.com/timfpark/take-home-engineering-challenge)

Our San Francisco team loves to eat. They are also a team that loves variety, so they also like to discover new places to eat.

In fact, we have a particular affection for food trucks. One of the great things about Food Trucks in San Francisco is that the city releases a list of them as open data.

Your assignment is to make it possible for us to find a food truck no matter where our work takes us in the city.

This is a freeform assignment. You can write a web API that returns a set of food trucks (our team is fluent in JSON). You can write a web frontend that visualizes the nearby food trucks. We also spend a lot of time in the shell, so a CLI that gives us a couple of local options would be great. And don't be constrained by these ideas if you have a better one!

The only requirement for the assignment is that it give us at least 5 food trucks to choose from a particular latitude and longitude.

Feel free to tackle this problem in a way that demonstrates your expertise of an area -- or takes you out of your comfort zone. For example, if you build Web APIs by day and want to build a frontend to the problem or a completely different language instead, by all means go for it - learning is a core competency in our group. Let us know this context in your solution's documentation.

San Francisco's food truck open dataset is [located here](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data) and there is an endpoint with a [CSV dump of the latest data here](https://data.sfgov.org/api/views/rqzj-sfat/rows.csv). We've included a [copy of this data](https://github.com/timfpark/take-home-engineering-challenge/blob/main/Mobile_Food_Facility_Permit.csv) in this repo as well.

Good luck! Please send a link to your solution on Github back to us at least 12 hours before your interview so we can review it before we speak.

### Stream of Consciousness
- Overall idea: create a simple, quick way to find the nearest five restaurants or search by food type/items, etc...
- Setting up flexbox for simple layout
- Researching Bing maps api
- Figured out how to center the map
- Setup retrieval & parsing of csv data
- Center the map based on the available GPS coordinates in the csv data
- Filter out invalid GPS coordinates
- Plot all food truck locations
- use custom food truck icon
- add search capabilities
- filter map markers to just only food trucks that match search term

next steps:
- add list view of matching food trucks
- add walking directions to selected food truck from current location
- add click to zoom where user can click food truck name in right rail and zoom map to the location
- add ability to set starting point for walking directions
