const API_KEY = "6932b4cf19cff42941da93e2813345bd";
const LAT = 6.5244;   
const LON = 3.3792;
const MEMBERS_URL = "data/members.json";
const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

const currentBox = document.querySelector("#current-weather");
const forecastList = document.querySelector("#forecast");
const spotlightBox = document.querySelector("#spotlights");

async function getWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

  try {
    const currentResponse = await fetch(currentUrl);
    if (!currentResponse.ok) throw new Error(`Weather request failed: ${currentResponse.status}`);
    displayCurrent(await currentResponse.json());

    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) throw new Error(`Forecast request failed: ${forecastResponse.status}`);
    const forecast = await forecastResponse.json();
    displayForecast(forecast.list);
  } catch (error) {
    console.error(error);
    currentBox.innerHTML = '<p class="error">Weather is not available right now.</p>';
  }
}

function displayCurrent(data) {
  const description = data.weather[0].description;
  const capitalized = description.charAt(0).toUpperCase() + description.slice(1);
  currentBox.innerHTML = `
    <p class="temp">${Math.round(data.main.temp)}&deg;C</p>
    <p class="weather-desc">${capitalized}</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function displayForecast(list) {
  const today = new Date().toISOString().slice(0, 10);
  const days = list
    .filter((item) => item.dt_txt.includes("12:00:00") && !item.dt_txt.startsWith(today))
    .slice(0, 3);

  forecastList.innerHTML = days
    .map((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString("en-NG", { weekday: "long" });
      return `<li><span>${day}</span><span>${Math.round(item.main.temp)}&deg;C</span></li>`;
    })
    .join("");
}

async function getSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error(error);
    spotlightBox.innerHTML = '<p class="error">Spotlights could not be loaded.</p>';
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members) {
  const eligible = members.filter((m) => m.level === 2 || m.level === 3); 
  const count = Math.random() < 0.5 ? 2 : 3;                             
  const picks = shuffle(eligible).slice(0, count);

  spotlightBox.innerHTML = "";
  picks.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member spotlight";
    card.innerHTML = `
      <img src="images/${encodeURI(member.image)}" alt="${member.name} logo" width="120" height="120" loading="lazy">
      <h3>${member.name}</h3>
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, "")}</a></p>
      <span class="level">${levels[member.level]}</span>
    `;
    spotlightBox.appendChild(card);
  });
}

const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#site-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getWeather();
getSpotlights();