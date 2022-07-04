import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4200/api/',
  timeout: 1000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = null

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return config
})

export { axiosInstance as api }
