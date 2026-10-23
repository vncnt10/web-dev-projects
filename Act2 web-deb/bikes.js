"use strict";

const bikeList = document.getElementById("bike-list");
const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");
const clearSearch = document.getElementById("clearSearch");
let allBikes = [];

function displayBikes(bikes) {
    bikeList.replaceChildren();
    searchMessage.textContent = bikes.length
        ? `Showing ${bikes.length} motorcycle(s)`
        : "No motorcycles found.";

    bikes.forEach(bike => {
        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "card bike-card shadow-sm h-100";

        const image = document.createElement("img");
        image.src = bike.image;
        image.alt = bike.name;
        image.className = "card-img-top";

        const body = document.createElement("div");
        body.className = "card-body";

        const name = document.createElement("h3");
        name.className = "card-title fw-bold h5";
        name.textContent = bike.name;

        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = bike.description;

        const price = document.createElement("p");
        price.className = "text-danger fw-bold";
        price.textContent = `₱${Number(bike.price).toLocaleString("en-PH")}`;

        const details = document.createElement("button");
        details.className = "btn btn-dark w-100";
        details.type = "button";
        details.textContent = "View Details";
        details.addEventListener("click", () => {
            window.alert(`${bike.name}\nEngine: ${bike.engine}`);
        });

        body.append(name, description, price, details);
        card.append(image, body);
        column.appendChild(card);
        bikeList.appendChild(column);
    });
}

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filteredBikes = allBikes.filter(bike =>
        bike.name.toLowerCase().includes(keyword)
    );

    displayBikes(filteredBikes);
});

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    displayBikes(allBikes);
    searchInput.focus();
});

fetch("bikes.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load motorcycle data.");
        }
        return response.json();
    })
    .then(bikes => {
        if (!Array.isArray(bikes)) {
            throw new Error("Motorcycle data must be a JSON array.");
        }

        allBikes = bikes;
        displayBikes(allBikes);
    })
    .catch(error => {
        console.error(error);
        bikeList.replaceChildren();
        searchMessage.textContent =
            `${error.message} Make sure you run the website using a local server.`;
        searchMessage.classList.add("text-danger");
    });
