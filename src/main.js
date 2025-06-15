
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const searchInput = document.querySelector("input[name='search-text']");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const query = searchInput.value.trim();
    if (!query) {
      iziToast.error({ message: "Please enter a search term!" });
      return;
    }
  
    clearGallery();
    showLoader();
  
    // Запит до API Pixabay
    const images = await getImagesByQuery(query);
    console.log("Fetched images:", images); // Додаємо логування!
    
    hideLoader();
  
    if (images.length === 0) {
      iziToast.warning({ message: "Sorry, there are no images matching your search query. Please try again!" });
    } else {
      createGallery(images);
    }
    searchInput.value = ""; // ✨ Очищаємо поле пошуку після запиту

});
  




