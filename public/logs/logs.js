const main = document.getElementById("mainDiv");
const myMap = L.map("myMap").setView([0, -0.0], 1); //the L object belongs to the Leaflet.js library
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

////making a marker with a custom icon

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

async function getData() {
  const response = await fetch("/db");
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(myMap);
    //item container
    const root = document.createElement("div");
    root.classList.add("item-cont");
    const text = `Latitude: ${item.lat},
    Longitude: ${item.lon},
    Temperature: ${item.temp},
    Air:${item.air}`;
    marker.bindPopup(text);

    //displau latitude and longitude
    // let lat = document.createElement("div");
    // let lon = document.createElement("div");
    // lat.classList.add("lat");
    // lon.classList.add("lon");
    // lat.textContent = `Longitude: ${item.lat}° `;
    // lon.textContent = `Latitude: ${item.lon}° `;
    // //timestamp
    // const date = document.createElement("div");
    // const dateString = new Date(item.timestamp).toLocaleString();
    // date.textContent = dateString;
    // // image.src = item.image64;
    // // image.alt = "random snap";

    // //append html elements
    // root.append(lat, lon, date);
    // main.append(root);
  }
  console.log(data);
  //create a delete button with delete functionality
  // const dltBtn = document.createElement("button");
  // dltBtn.classList.add("dltBtn");
  // dltBtn.innerText = "delete";
  // dltBtn.addEventListener("click", async () => {
  //   const id = image.getAttribute("id");
  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   };
  //   const response = await fetch("/dltItem", options);
  //   const json = await response.json();
  //   console.log(json);
  //   location.reload();
  // });
}
getData();

//delete all database entries
// async function deleteAll() {
//   const options = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // body: "delete",
//     // body: JSON.stringify(data),
//   };
//   const response = await fetch("/db", options);
//   const json = await response.json();
//   console.log(json);
//   location.reload();
// }
