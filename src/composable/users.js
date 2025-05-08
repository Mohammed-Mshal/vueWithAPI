import axios from "axios"
import { ref } from "vue"

export const useGetUsers=()=>{
  const isLoading=ref(null)
  const error=ref(null)

  const getUsers=async()=>{
    try {
      isLoading.value=true
      error.value=null
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`)
      const data=await response.data
      isLoading.value=false
      if (response.status===200) {
        error.value=null
        return data
      }
      else{
        isLoading.value=false
        error.value=response.message
      }
    } catch (errorCatch) {
      isLoading.value=false
      error.value=errorCatch.message

    }
  }
  return {
    isLoading,error,getUsers
  }
}
