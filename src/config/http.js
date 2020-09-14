import axios from 'axios'

export default function http (config, success, failure) {
  const instance = axios.create({})
  instance(config).then(res => success(res)).catch(err => failure(err))
}
