import axios from "axios"
import { ref } from "vue"

export const useGetUsers = () => {
  const isLoading = ref(null)
  const error = ref(null)

  const getUsers = async () => {
    try {
      isLoading.value = true
      error.value = null

      const response = await axios(`${import.meta.env.VITE_SERVER === "DEVELOPMENT" ? import.meta.env.VITE_BASE_URL_LOCAL : import.meta.env.VITE_BASE_URL_PRODUCTION}/users`, {
        method: 'GET'
      })
      const data = await response.data

      isLoading.value = false
      if (data.success) {
        error.value = null
        return data.data
      }
      else {
        error.value = data.message
        return null
      }
    } catch (errorCatch) {
      isLoading.value = false
      error.value = errorCatch.response.data.message
    }
  }
  return {
    isLoading, error, getUsers
  }
}
