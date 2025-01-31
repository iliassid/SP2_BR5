document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));

  if (movie) {
    // Populate the page with the movie details
    document.getElementById("detailsImg").src = movie.image;
    document.getElementById("detailsName").innerText = `Name: ${movie.name}`;
    document.getElementById("detailsYear").innerText = `Year: ${movie.year}`;
    document.getElementById(
      "detailsDirector"
    ).innerText = `Director: ${movie.director}`;
    document.getElementById(
      "detailsTrailer"
    ).innerText = `Trailer: ${movie.trailer}`;
    document.getElementById(
      "detailsRating"
    ).innerHTML = `Rating: <img class="stars" src="${getRatingImage(
      movie.rating
    )}" alt="Rating">`;
    document.getElementById("detailsDescription").innerText = movie.description;
  } else {
    // If no movie is selected, show an error or a message
    alert("No movie details found.");
  }
});

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
