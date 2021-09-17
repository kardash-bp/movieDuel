import { optionList, singleMovieTemplate } from './templets.js'
import { api } from './config.js'
import { debounce } from './utils.js'

export class MovieBox {
  constructor(root, boxName) {
    this.rootDiv = root
    this.uniqueClass = boxName
    this.input = document.createElement('input')
    this.onInput = this.onInput.bind(this)
    this.removeBox = this.removeBox.bind(this)
  }
  renderInput() {
    const box = document.createElement('div')
    box.className = 'col-md-6'
    this.input.className = 'form-control'
    this.input.classList.add(this.uniqueClass)
    this.input.placeholder = 'Enter movie name'
    box.appendChild(this.input)
    this.rootDiv.appendChild(box)
    this.input = document.querySelector(`.${this.uniqueClass}`)
    this.input.addEventListener('input', debounce(this.onInput))
    box.addEventListener('click', (e) => {
      e.preventDefault()
      console.log(e.target.id)
      this.getSingleMovie(e.target.id)
    })
  }
  async getData(word) {
    const res = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: api.key,
        s: word,
      },
    })
    return res.data.Search || []
  }
  async getSingleMovie(id) {
    if (!id) return
    this.removeBox()
    const res = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: api.key,
        i: id,
      },
    })
    console.log(res.data)
    this.input.insertAdjacentElement('afterend', singleMovieTemplate(res.data))
  }
  renderSingleMovie() {}
  removeBox() {
    if (
      this.rootDiv.contains(this.input.nextSibling) &&
      this.input.nextSibling.tagName === 'UL'
    ) {
      this.input.parentNode.removeChild(this.input.parentNode.lastElementChild)
    }
    if (this.rootDiv.contains(this.input)) this.input.focus()
  }
  async onInput(e) {
    e.preventDefault()
    const movies = await this.getData(e.target.value)
    if (Array.isArray(movies) && movies.length) {
      this.removeBox()
      this.input.parentNode.insertBefore(
        optionList(movies),
        this.input.nextSibling
      )
      e.target.value = ''
      this.input.focus()
    }
  }
}
