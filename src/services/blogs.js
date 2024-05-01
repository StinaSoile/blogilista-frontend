import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.get(baseUrl, config)

  return response.data
}

const createBlog = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data
};

export default { getAll, setToken, createBlog }