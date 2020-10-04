import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

const instance = axios.create({})

export default instance
