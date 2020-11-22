////this is client side code/////

// const showLocation = () => {
//making a map and tiles

// const myMap = L.map("myMap").setView([0, -0.0], 1); //the L object belongs to the Leaflet.js library
// const attribution =
//   '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';
// const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tiles = L.tileLayer(tileUrl, { attribution });
// tiles.addTo(myMap);

//making a marker with a custom icon

//   const myIcon = L.icon({
//     iconUrl: "../star.png",
//     iconSize: [50, 32],
//     iconAnchor: [25, 16],
//     // popupAnchor: [25, 76],
//     // shadowUrl: "star.png",
//     // shadowSize: [40, 30],
//     // shadowAnchor: [22, 94],
//   });
// const marker = L.marker([110, 110] /*, { icon: myIcon }*/).addTo(myMap);

//get geolocation from user

if ("geolocation" in navigator) {
  try {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude.toFixed(2);
      const lon = position.coords.longitude.toFixed(2);
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;

      ////call to local server
      const api_url = `weather/${lat},${lon}`;
      const climaResponse = await fetch(api_url);
      const climaJson = await climaResponse.json();
      console.log(climaJson);
      const temp = climaJson.weather.temp.value;
      document.getElementById("temperature").textContent = temp;
      const air =
        climaJson.air_quality.results[0].measurements[0].averagingPeriod.value;
      document.getElementById("air_quality").textContent = air;

      ////save to database
      const data = { lat, lon, temp, air };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);
    });
  } catch (error) {
    // console.log("error");
    document.getElementById("air_quality").textContent = "no info";
  }
} else {
  console.log("geolocation not available");
}
// };
////call to local server
// const data = { lat, lon };
// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// };
// const response = await fetch("/api", options);
// const json = await response.json();
// console.log(json);

//   const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
//   const getData = async () => {
//     const response = await fetch(api_url);
//     const data = await response.json();
//     const { latitude, longitude } = data;
//     // L.marker([latitude, longitude]).addTo(myMap)
//     marker.setLatLng([latitude, longitude]);
//     document.getElementById("lat").innerText = latitude;
//     document.getElementById("lon").innerText = longitude;
//   };

//   getData();
