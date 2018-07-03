import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://todo-extension.firebaseio.com'
})

instance.interceptors.response.use(
  response =>
    (response.data
      ? Object.entries(response.data).map(([id, todo]) => ({ ...todo, id }))
      : null),
  error => Promise.reject(error)
)

export default instance
