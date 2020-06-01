const request = require('request')

const location = {
    lat: 13.0926876,
    lon: 77.5767277
};

let geocodeUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${location.lon},${location.lat}.json?access_token=pk.eyJ1IjoiaGFyc2hha3kiLCJhIjoiY2pzcWIydGY5MTY2bTQ5bXhzMnFzcm9odyJ9.Qx2o5afY2Omo3TmlEIHpOw&limit=1`

let placeName

request({ url: geocodeUrl, json: true }, (error, {body}) => {
    placeName = body.features[0].place_name
    console.log(placeName)
})

