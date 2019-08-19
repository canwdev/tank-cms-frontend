import axios from 'axios'

export function getWTList() {
  return axios.get('http://127.0.0.1:8092/api/main')
}
