const url = "data/members.json";
const container = document.querySelector("#members");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p class="error">Members could not be loaded. Please try again later.</p>';
  }
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member";
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
      <h2>${member.name}</h2>
      <p class="tagline">${member.tagline}</p>
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, "")}</a></p>
      <span class="level">${levels[member.level]}</span>
    `;
    container.appendChild(card);
  });
}

function setView(view) {
  container.classList.toggle("grid", view === "grid");
  container.classList.toggle("list", view === "list");
  gridBtn.setAttribute("aria-pressed", view === "grid");
  listBtn.setAttribute("aria-pressed", view === "list");
}
gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#site-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getMembers();