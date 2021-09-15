import { api } from './config.js'
import { debounce } from './utils.js'
const input = document.querySelector('input')
const first = document.querySelector('.first')
const optionBox = (data) => {
  const ul = document.createElement('ul')
  ul.className = 'list-group'
  if (data.length) {
    for (let movie of data) {
      if (movie.Poster === 'N/A') {
        movie.Poster = './no-img.png'
      }
      console.log(movie.Poster)
      const hintMovie = document.createElement('li')
      hintMovie.id = 'asfsfs'
      hintMovie.classList.add('list-group-item')
      hintMovie.classList.add('list-group-item-action')
      hintMovie.innerHTML = `<img src='${movie.Poster}' alt='poster' /> ${movie.Title}`
      ul.appendChild(hintMovie)
    }
  }
  return ul
}
const removeBox = (elem) => {
  if (elem.nextSibling.tagName === 'UL') {
    elem.parentNode.removeChild(elem.parentNode.lastElementChild)
  }
  input.focus()
}

const getData = async (word) => {
  const res = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: api.key,
      s: word,
    },
  })
  //localStorage.setItem('moviesSearch', JSON.stringify(res.data.Search))
  return res.data.Search || []
}

const onInput = async (e) => {
  e.preventDefault()
  const movies = await getData(e.target.value)
  console.log(movies.Error)
  if (Array.isArray(movies) && movies.length) {
    removeBox(input)
    input.parentNode.insertBefore(optionBox(movies), input.nextSibling)
    e.target.value = ''
    input.focus()
    console.log(movies)
  }
}
input.addEventListener('input', debounce(onInput))

document.addEventListener('click', (event) => {
  if (!first.contains(event.target)) removeBox(input)
})
