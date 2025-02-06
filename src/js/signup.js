/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Seyed Arsam Pak Seresht
 *      Student ID: 154291231
 *      Date:       2024-08-08
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

const explicitCheckbox = document.getElementById("explicit-lyrics");
explicitCheckbox.addEventListener("change", function () {
  this.value = this.checked ? "true" : "false";
});

document.getElementById("new-artist-form").addEventListener("submit", function (event) {
  const artistName = document.getElementById("artist-name").value;
  const socialUrlsInput = document.getElementById("social-urls");
  const socialUrlsArray = socialUrlsInput.value.split(",").map((url) => url.trim());
  const description = document.getElementById("description").value;

  socialUrlsInput.remove();

  socialUrlsArray.forEach((url) => {
    const socialUrlInput = document.createElement("input");
    socialUrlInput.type = "hidden";
    socialUrlInput.name = "socialUrls";
    socialUrlInput.value = url;
    this.appendChild(socialUrlInput);
  });

  if (!explicitCheckbox.checked) {
    const explicitInput = document.createElement("input");
    explicitInput.type = "hidden";
    explicitInput.name = "explicit";
    explicitInput.value = "false";
    this.appendChild(explicitInput);
  }

  if (!/^[A-Za-z\s]+$/.test(artistName)) {
    alert("Invalid Artist Name. Please use only letters and spaces.");
    event.preventDefault();
    return;
  }

  if (!description.trim()) {
    alert("Description should not be empty.");
    event.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-song-url");
  const urlsContainer = document.getElementById("song-urls-container");

  addButton.addEventListener("click", function () {
    const newInput = document.createElement("input");
    newInput.type = "url";
    newInput.name = "songUrls";
    urlsContainer.appendChild(newInput);
  });
});
