import { MovieBox } from './autocomplete.js'
import { optionList, singleMovieTemplate } from './templates.js'

const root = document.querySelector('.search')
//boxName is className
const movieBox1 = new MovieBox(root, 'box1')
const movieBox2 = new MovieBox(root, 'box2')
movieBox1.renderInput()
movieBox2.renderInput()

// document.addEventListener('click', (event) => {
//   if (!first.contains(event.target)) removeBox(input)
// })
