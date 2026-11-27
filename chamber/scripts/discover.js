import { places } from "../data/discover.mjs";

const container = document.querySelector("#places");
const message = document.querySelector("#visit-message");

// ----- Last visit message (localStorage) -----
function showVisitMessage() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();
  let lastVisit = 0;

  try {
    lastVisit = Number(localStorage.getItem("lastVisit")) || 0;
  } catch (error) {
    console.error(error);
  }

  if (!lastVisit) {
    message.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const elapsed = now - lastVisit;
    if (elapsed < MS_PER_DAY) {
      message.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsed / MS_PER_DAY);
      message.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  try {
    localStorage.setItem("lastVisit", now);
  } catch (error) {
    console.error(error);
  }
}

// ----- Cards built from the imported data -----
function displayPlaces() {
  places.forEach((place, index) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ", Lagos, Nigeria")}`;

    const card = document.createElement("article");
    card.className = `place-card card${index + 1}`; // card1 ... card8 = named grid areas
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button" aria-label="Learn more about ${place.name}">Learn more</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      window.open(mapUrl, "_blank", "noopener");
    });
    container.appendChild(card);
  });
}

// ----- Mobile menu -----
const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#site-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// ----- Footer -----
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

showVisitMessage();
displayPlaces();