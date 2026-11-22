document.querySelector("#timestamp").value = new Date().toISOString();

document.querySelectorAll("[data-modal]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".modal-close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#site-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;