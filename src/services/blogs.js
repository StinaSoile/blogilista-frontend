import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// TÄHÄN KORJAA ETTÄ TOKEN TULEE LUETUKSI OIKEIN
const getAll = async () => {
  // console.log(token)
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // }
  // const response =  await axios.get(baseUrl, config)
  const response = await axios.get(baseUrl)

  return response.data
}

export default { getAll, setToken }