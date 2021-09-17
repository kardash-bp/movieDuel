export const optionList = (data) => {
  const ul = document.createElement('ul')
  ul.className = 'list-group'
  if (data.length) {
    for (let movie of data) {
      if (movie.Poster === 'N/A') {
        movie.Poster = './no-img.png'
      }
      const hintMovie = document.createElement('li')
      hintMovie.id = movie.imdbID
      hintMovie.classList.add('list-group-item')
      hintMovie.classList.add('list-group-item-action')
      hintMovie.innerHTML = `<img src='${movie.Poster}' alt='poster' /> ${movie.Title}`

      ul.appendChild(hintMovie)
    }
  }
  return ul
}

export const singleMovieTemplate = (movie) => {
  const div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `
  <div class="card-header row">
  <img src="${movie.Poster}" class="col-4" alt="poster" />
   <div class="col-8">
     <h3 class="card-title">${movie.Title}</h3>
     <h6 class="card-title">${movie.Genre}</h6>
      <p class="card-text">${movie.Plot}</p>
   </div>
    </div>
  <div class="card-body">

  <ul class="list-group">
    <li class="list-group-item list-group-item-success d-flex justify-content-between">Awards: <span>
    ${movie.Awards[0] === 'W' ? movie.Awards.slice(3) : movie.Awards}
    </span></li>
    <li class="list-group-item d-flex justify-content-between">Box Office: <span >${
      movie.BoxOffice
    }</span></li>
    <li class="list-group-item d-flex justify-content-between">IMDB Rating: <span>${
      movie.imdbRating
    }</span></li>
    <li class="list-group-item d-flex justify-content-between">Metascore: <span>${
      movie.Metascore
    }</span></li>
  </ul>

  </div>`
  return div
}
