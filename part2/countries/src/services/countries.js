import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
	console.log('getAll')
  const request = axios.get(`${baseUrl}all`)
  return request.then(response => {
		return response.data
	})
}

export default {
    getAll
}