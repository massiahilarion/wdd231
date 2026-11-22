const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");

const fields = [
  ["First Name", "fname"],
  ["Last Name", "lname"],
  ["Email", "email"],
  ["Mobile Phone", "mobile"],
  ["Business Name", "bizname"],
  ["Date and Time Submitted", "timestamp"],
];

function formatValue(key, value) {
  if (key === "timestamp") {
    const date = new Date(value);
    if (!isNaN(date)) {
      return date.toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" });
    }
  }
  return value;
}

if (![...params.keys()].length) {
  summary.innerHTML = "<p>No application information found. Please complete the form on the Join page.</p>";
} else {
  fields.forEach(([label, key]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = formatValue(key, params.get(key) || "");
    summary.append(dt, dd);
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