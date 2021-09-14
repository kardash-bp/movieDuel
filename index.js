import { api } from './config.js'
import { debounce } from './utils.js'

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
  console.log(movies)
}
const input = document.querySelector('input')
input.addEventListener('input', debounce(onInput))
