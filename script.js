document.addEventListener('DOMContentLoaded', function() {
  loadMovies();
});

function loadMovies() {
  axios.get('https://66216af527fcd16fa6c6e52f.mockapi.io/movies/movies/')
    .then(response => {
      const movies = response.data;
      const movieList = document.getElementById('movie-list');
      movieList.innerHTML = '';
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.genre}</p>
          <button onclick="showDetail(${movie.id})">Detail</button>
          <button onclick="showEditModal(${movie.id})">Edit</button>
          <button onclick="deleteMovie(${movie.id})">Delete</button>
        `;
        movieList.appendChild(movieCard);
      });
      document.getElementById('loading').style.display = 'none';
    })
    .catch(error => console.error(error));
}

function showDetail(movieId) {
  axios.get(`https://66216af527fcd16fa6c6e52f.mockapi.io/movies/movies/${movieId}/`)
    .then(response => {
      const movie = response.data;
      const movieDetail = document.getElementById('movie-detail');
      movieDetail.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title}">
        <p>Genre: ${movie.genre}</p>
        <p>Description: ${movie.description}</p>
        <p>Director: ${movie.director}</p>
        <!-- Other movie details -->
      `;
    })
    .catch(error => console.error(error));
}

function showEditModal(movieId) {
  const modal = document.getElementById('edit-modal');
  const span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }}
