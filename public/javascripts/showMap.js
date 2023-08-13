
mapboxgl.accessToken = pk.eyJ1Ijoic2FrMzQ1IiwiYSI6ImNsbDd0b2IzcTB4NXYzZW53d201Nm5henAifQ.cFu2pzhQbL1Bza21vBBc - w;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({
    color: "#FF0000",
}).setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 15 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl())