import { MovieBox } from './autocomplete.js'
import { optionList, singleMovieTemplate } from './templates.js'

const root = document.querySelector('.search')
//boxName is className
const movieBox1 = new MovieBox(root)
const movieBox2 = new MovieBox(root)
movieBox1.renderInput(1)
movieBox2.renderInput(2)
movieBox1.addListeners(1)
movieBox2.addListeners(2)
// document.querySelector('.input1').addEventListener('input', (e) => {
//   e.preventDefault()
//   console.log(e.target.value)
// })
