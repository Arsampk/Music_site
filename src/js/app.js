/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including websites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Seyed Arsam Pak Seresht
 *      Student ID: 154291231
 *      Date:       2024-07-10
 */
const { artists, songs } = window;

console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const artistLinksDiv = document.getElementById("artist-links");
  const selectedArtistHeading = document.getElementById("selected-artist");
  const cardContainer = document.querySelector(".card-container");
  const artistImage = document.getElementById("artist-image");

  function createArtistButtons() {
    if (!artists) {
      console.error("Artists data is missing");
      return;
    }

    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => showArtistDetails(artist));
      menu.appendChild(button);
    });

    const signupButton = document.createElement("button");
    signupButton.textContent = "New Artist";
    signupButton.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
    menu.appendChild(signupButton);
  }

  function showArtistDetails(artist) {
    if (!artist) {
      console.error("Artist data is missing");
      return;
    }

    selectedArtistHeading.textContent = `Selected Artist: ${artist.name}`;
    artistLinksDiv.innerHTML = artist.urls
      .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
      .join(", ");

    artistImage.src = artist.image;

    const filteredSongs = songs.filter(
      (song) => song.artistId === artist.artistId && !song.explicit
    );
    console.log(`Filtered songs for ${artist.name}:`, filteredSongs);

    cardContainer.innerHTML = "";
    filteredSongs.forEach((song) => {
      const card = createSongCard(song);
      cardContainer.appendChild(card);
    });
  }

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    const songImg = document.createElement("img");
    songImg.src = song.image; // Use the song-specific image
    songImg.alt = `${song.title} Image`;
    card.appendChild(songImg);

    const songName = document.createElement("h3");
    songName.textContent = song.title;
    card.appendChild(songName);

    const songYear = document.createElement("time");
    songYear.textContent = song.year;
    card.appendChild(songYear);

    const songDuration = document.createElement("span");
    songDuration.textContent = formatDuration(song.duration);
    card.appendChild(songDuration);

    card.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

    return card;
  }

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function setupNewsletterFormValidation() {
    const newsletterForm = document.getElementById("newsletter-form");

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (event) {
        const email = document.getElementById("newsletter-email").value;
        if (validateEmail(email)) {
          console.log("Email submitted:", email);
        } else {
          event.preventDefault(); // Prevent form submission
          alert("Please enter a valid email address.");
        }
      });
    }
  }

  function validateEmail(email) {
    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  createArtistButtons();
  showArtistDetails(artists[0]); // Show the first artist by default
  setupNewsletterFormValidation(); // Call if you have a newsletter form
});
