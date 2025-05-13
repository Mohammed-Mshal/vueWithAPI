<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import Toastify from 'toastify-js'
  const isLoading=ref(null)
  const error=ref(null)
  const name=ref('')
  const username=ref('')
  const phone=ref('')
  const email=ref('')
  const website=ref('')
  const image=ref(null)
  const progress=ref(0)

  const createUser=async()=>{
    try {
      isLoading.value=true;
      error.value=null

      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('username', username.value);
      formData.append('phone', phone.value);
      formData.append('email', email.value);
      formData.append('website', website.value);
      if (image.value) {
        formData.append('avatar', image.value);
      }
      await axios({
        url: `${import.meta.env.VITE_SERVER==="DEVELOPMENT"?import.meta.env.VITE_BASE_URL_LOCAL:import.meta.env.VITE_BASE_URL_PRODUCTION}/users`,
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          progress.value = percentCompleted;
        }
      }).then((res) => {
        isLoading.value=false;
        error.value=null
        console.log(res);
        Toastify({
            duration: 3000,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            text: `${res.data.message}`,
            style: {
              background: "#81c784",
              borderRadius:"20px",
              boxShadow:"0 0 10px",
              color:'#1f1f1f'
            },
          }).showToast()
          name.value=''
          username.value=''
          phone.value=''
          email.value=''
          website.value=''
          image.value=null
      }).catch((resError) => {
        isLoading.value=false;
        console.log(resError);
        error.value=resError.response.data.message|| resError

      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleFileUpload = (event) => {
    image.value = event.target.files[0];
  }
  watch(progress, (newValue) => {
    console.log('Upload progress:', newValue);
  })
</script>
<template>
  <div class="create-user">
    <form class="form-create" @submit.prevent="createUser" required>
      <div class="form-group">
        <label for="name">
          Name
        </label>
        <input type="text" name="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="username">
          Username
        </label>
        <input type="text" name="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="phone">
          Phone
        </label>
        <input type="tel" name="phone" v-model="phone" required>
      </div>
      <div class="form-group">
        <label for="email">
          Email
        </label>
        <input type="email" name="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="website">
          Website
        </label>
        <input type="url" name="website" v-model="website" required>
      </div>
      <div class="form-group">
        <label for="image">
          Avatar
        </label>
        <input type="file" id="image" name="image" @change="handleFileUpload" required >
        <label for="image" class="buttonUpload">
          Upload File
        </label>
      </div>
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <button class="submitBTN" :class="`${isLoading&&'loading'}`" :disabled="isLoading" >
        {{ isLoading?'Loading...':'Create User' }}
      </button >
    </form>
  </div>
</template>

<style lang="scss" scoped>
.create-user{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 40px;
  height: 100%;
  .form-create{
    padding: 32px 20px;
    border-radius: 24px;
    background: #efefef;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .form-group{
      display: flex;
      flex-direction: column;
      gap: 6px;
      label{
        color: #000;
        font-size: clamp(16px,2.4vw,20px);
      }
      input{
        font-size: clamp(16px,2.4vw,20px);
        padding: 8px 12px ;
        border-radius: 12px;
        border: 1px solid;
        background: none;
        outline: none;
      }
    }
    .form-group:has(input[type="file"]){
      input{
        display: none;
      }
      .buttonUpload{
        width: 100%;
        font-size: clamp(16px,2.4vw,20px);
        padding: 8px 12px ;
        border-radius: 12px;
        border: 1px solid;
        background: none;
        outline: none;
        cursor: pointer;
      }
    }
    .error{
      font-size: clamp(16px, 2vw,20px);
      color: #FE3f0f;
      font-weight: bold;
      text-align: center;
    }
    .submitBTN{
      background: rgb(138, 1, 236);
      color: #FFF;
      padding: 12px 20px;
      border-radius: 24px;
      outline: none;
      border: none;
      font-size: clamp(16px, 2vw,18px);
      font-weight: bold;
      transition: .3s all ease-in-out;
      cursor: pointer;
      &.loading{
        cursor: wait;
        background: rgba(138, 1, 236,.3);
      }
      &:hover{
        box-shadow: 0 0 12px  rgba(138, 1, 236,.4);
      }
    }
  }
}
</style>
