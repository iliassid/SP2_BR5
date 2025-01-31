document.addEventListener("DOMContentLoaded", loadList);

const nameInput = document.getElementById("nameInput");
const yearInput = document.getElementById("yearInput");
const directorInput = document.getElementById("directorInput");
const trailerInput = document.getElementById("tailerInput");
const ratingInput = document.getElementById("ratingInput");
const selectList = document.getElementById("selectList");
const imageInput = document.getElementById("image");
const submitBtn = document.getElementById("submitBtn");
const movieContainer = document.querySelector(".allcontent");

let editMovieId = null; // Stores the ID of the movie being edited

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (editMovieId) {
    updateMovie(editMovieId);
  } else {
    addMovie();
  }
});

function addMovie() {
  const ratingValue = parseFloat(ratingInput.value);

  if (
    !nameInput.value ||
    !yearInput.value ||
    !directorInput.value ||
    selectList.value === "select the status" ||
    isNaN(ratingValue) ||
    ratingValue < 0 ||
    ratingValue > 5
  ) {
    alert("Please enter all fields and a valid rating (0-5).");
    return;
  }

  const movie = {
    id: Date.now(),
    name: nameInput.value,
    year: yearInput.value,
    director: directorInput.value,
    trailer: trailerInput.value,
    rating: ratingValue,
    status: selectList.value,
    image: imageInput.files[0]
      ? URL.createObjectURL(imageInput.files[0])
      : "/imgs/default.jpg",
    description: document.getElementById("textarea").value, // Added description field
  };

  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies.push(movie);
  localStorage.setItem("movies", JSON.stringify(movies));

  displayMovies();
  clearForm();
}

function updateMovie(id) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  const ratingValue = parseFloat(ratingInput.value);

  if (
    !nameInput.value ||
    !yearInput.value ||
    !directorInput.value ||
    selectList.value === "select the status" ||
    isNaN(ratingValue) ||
    ratingValue < 0 ||
    ratingValue > 5
  ) {
    alert("Please enter all fields and a valid rating (0-5).");
    return;
  }

  movies = movies.map((movie) => {
    if (movie.id === id) {
      return {
        ...movie,
        name: nameInput.value,
        year: yearInput.value,
        director: directorInput.value,
        trailer: trailerInput.value,
        rating: ratingValue,
        status: selectList.value,
        image: imageInput.files[0]
          ? URL.createObjectURL(imageInput.files[0])
          : movie.image, // Keep old image if no new one is uploaded
        description: document.getElementById("textarea").value, // Keep old description if not updated
      };
    }
    return movie;
  });

  localStorage.setItem("movies", JSON.stringify(movies));
  displayMovies();
  clearForm();
  editMovieId = null; // Reset edit mode
  submitBtn.textContent = "Submit"; // Change button back to "Submit"
}

function editMovie(id) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (movie) {
    nameInput.value = movie.name;
    yearInput.value = movie.year;
    directorInput.value = movie.director;
    trailerInput.value = movie.trailer;
    ratingInput.value = movie.rating;
    selectList.value = movie.status;
    document.getElementById("textarea").value = movie.description;
    editMovieId = id; // Set the movie ID being edited
    submitBtn.textContent = "Update"; // Change button text to "Update"
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the form for better UX
  }
}

function deleteMovie(id) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies = movies.filter((movie) => movie.id !== id);
  localStorage.setItem("movies", JSON.stringify(movies));
  displayMovies();
}

function getRatingImage(rating) {
  if (rating >= 4.5) return "/imgs/5 stars.svg";
  if (rating >= 4) return "/imgs/4.5 stars.svg";
  if (rating >= 3.5) return "/imgs/4 stars.svg";
  if (rating >= 3) return "/imgs/3.5 stars.svg";
  if (rating >= 2.5) return "/imgs/3 stars.svg";
  if (rating >= 2) return "/imgs/2.5 stars.svg";
  if (rating >= 1.5) return "/imgs/2 stars.svg";
  if (rating >= 1) return "/imgs/1.5 stars.svg";
  return "/imgs/1 star.svg";
}

function displayMovies() {
  movieContainer.innerHTML = "";
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("content");

    movieDiv.innerHTML = `
            <div class="movieItem">
                <img class="contentImg" src="${movie.image}" alt="Movie Image">
                <div class="nameAndRating">
                    <h2>${movie.name}</h2>
                    <img class="stars" src="${getRatingImage(
                      movie.rating
                    )}" alt="Rating">
                    <div class="EditBtns">
                        <!-- Hide Edit button on home page -->
                        <button class="edBtn hide" onclick="editMovie(${
                          movie.id
                        })">Edit</button>
                        <button class="edBtn" onclick="deleteMovie(${
                          movie.id
                        })">Delete</button>
                        <button class="edBtn detailBtn" data-id="${
                          movie.id
                        }">Details</button>
                    </div>
                </div>
            </div>
        `;

    // Hide Edit button only on homepage
    if (window.location.pathname === "/mymovie.html") {
      movieDiv.querySelector(".edBtn").classList.add("hide");
    }

    movieDiv.querySelector(".detailBtn").addEventListener("click", () => {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));
      window.location.href = "/details.html"; // Redirect to details page
    });

    movieContainer.appendChild(movieDiv);
  });
}

function clearForm() {
  nameInput.value = "";
  yearInput.value = "";
  directorInput.value = "";
  trailerInput.value = "";
  ratingInput.value = "";
  selectList.value = "select the status";
  imageInput.value = "";
  document.getElementById("textarea").value = ""; // Clear the description textarea
  editMovieId = null; // Reset edit mode
  submitBtn.textContent = "Submit"; // Reset button text
}

function loadList() {
  displayMovies();
}
