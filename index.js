import { api } from './config.js'
const getData = async () => {
  const res = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: api.key,
      s: 'avengers',
    },
  })
  console.log(res.data)
}
getData()
