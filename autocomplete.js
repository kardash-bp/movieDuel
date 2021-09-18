import { optionList, singleMovieTemplate } from './templates.js'
import { api } from './config.js'
import { debounce } from './utils.js'

export class MovieBox {
  constructor(root) {
    this.rootDiv = root

    this.input = document.createElement('input')
    this.onInput = this.onInput.bind(this)
    this.removeBox = this.removeBox.bind(this)
    this.addListeners = this.addListeners.bind(this)
  }
  renderInput(count) {
    const box = document.createElement('div')
    box.className = 'col-md-6'
    box.classList.add('box' + count)

    this.input.className = 'form-control'
    this.input.classList.add('input' + count)
    this.input.placeholder = 'Enter movie name'
    box.appendChild(this.input)
    this.rootDiv.appendChild(box)
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
    this.input.insertAdjacentElement('afterend', singleMovieTemplate(res.data))
    this.styleData()
  }
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
  addListeners(num) {
    const input = document.querySelector(`.input${num}`)
    const box = document.querySelector(`.box${num}`)
    input.addEventListener('input', debounce(this.onInput))
    box.addEventListener('click', (e) => {
      e.preventDefault()
      this.getSingleMovie(e.target.id)
      this.styleData()
    })
  }
  styleData() {
    const leftSide = this.rootDiv.querySelectorAll('.box1 ul li')
    const rightSide = this.rootDiv.querySelectorAll('.box2 ul li')
    console.log(leftSide, rightSide)
    if (leftSide.length && rightSide.length) {
      leftSide.forEach((elem, index) => {
        if (
          !isNaN(elem.dataset.value) &&
          !isNaN(rightSide[index].dataset.value) &&
          elem.dataset.value > rightSide[index].dataset.value
        ) {
          elem.classList.add('list-group-item-success')
          rightSide[index].classList.add('list-group-item-warning')
        } else if (
          !isNaN(elem.dataset.value) &&
          !isNaN(rightSide[index].dataset.value) &&
          elem.dataset.value < rightSide[index].dataset.value
        ) {
          elem.classList.add('list-group-item-warning')
          rightSide[index].classList.add('list-group-item-success')
        }
      })
    }
  }
}
