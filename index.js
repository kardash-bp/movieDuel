import { api } from './config.js'
const getData = async () => {
  const res = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: api.key,
      i: 'tt0848228',
    },
  })
  console.log(res.data)
}
getData()
