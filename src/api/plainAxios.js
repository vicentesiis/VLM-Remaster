import axios from "axios"

export const plainAxios = axios.create({
  baseURL: "https://vl-api-v6.onrender.com/api",
  headers: {
    Accept: "application/json",
  },
})
