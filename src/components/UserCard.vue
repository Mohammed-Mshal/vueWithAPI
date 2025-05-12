<script setup>
  import phoneIcon from '@/assets/images/phone.svg'
  import emailIcon from '@/assets/images/email.svg'
  import globalIcon from '@/assets/images/global.svg'
  import garbageIcon from '@/assets/images/garbage.svg'
  import Toastify from 'toastify-js'
  import axios from 'axios'
  const emit = defineEmits(['refresh-list'])
  const props=defineProps({
    id:{
      type:String,
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    username:{
      type:String,
      required:true,
    },
    website:{
      type:String,
      required:true,
    },
    phone:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
  })
  const deleteUser=async()=>{
    try {
       axios(`${import.meta.env.VITE_SERVER==="DEVELOPMENT"?import.meta.env.VITE_BASE_URL_LOCAL:import.meta.env.VITE_BASE_URL_PRODUCTION}/users/${props.id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>{
        console.log(res);

      if (!res.data.success){

        Toastify({
          duration: 3000,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          text: `${res.data.message}`,
          style: {
            background: "#e53935",
            borderRadius:"20px"
          },
        }).showToast()
      }
        else {
           Toastify({
            duration: 3000,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            text: `${res.data.message}`,
            style: {
              background: "#FAEFFA",
              borderRadius:"20px",
              boxShadow:"0 0 10px",
              color:'#1f1f1f'
            },
          }).showToast()
           emit('refresh-list')
        }
      })
      } catch (error) {

        Toastify({
          duration: 3000,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          text: `${error.data.message}`,
          style: {
            background: "#e53935",
            borderRadius:"20px"
          },
        }).showToast()
    }
  }

</script>
<template>
  <div class="card">
    <div class="header-card">
      <h2 class="name">
        {{ props.name }}
    </h2>
    <div class="actions">
      <button class="delete-user" @click="deleteUser">
        <img :src="garbageIcon" alt="Garbage">
      </button>
    </div>
    </div>
    <h4 class="username">
      {{ props.username }}
    </h4>
    <div class="contact">
      <a :href="`tel:${props.phone}`" class="linkContact">
        <img :src="phoneIcon" alt="">
      </a>
      <a :href="`mailto:${props.email}`" class="linkContact">
        <img :src="emailIcon" alt="">
      </a>
      <a :href="`https://${props.website}`" class="linkContact">
        <img :src="globalIcon" alt="">
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .card{
    display: flex;
    flex-direction: column;
    border: 1px solid #8f8f8f;
    border-radius: 24px;
    padding: 20px;
    background: #2f2f2f;
    max-width: 400px;
    transition: .3s all ease-in-out;
    flex: 1 1 100%;
    &:hover{
      box-shadow: 0 0 18px;
    }
    .header-card{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      .name{
        font-size: clamp(18px,3vw,26px);
        line-height: normal;
        color: #FFF;
        margin-bottom: 8px;
      }
      .delete-user{
        height: 20px;
        width: 20px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        transition: .3s all ease-in-out;
        &:hover{
          scale: 1.1;
        }
        img{
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
    }
    .username{
      margin-bottom: 24px;
    }
    .contact{
      display: flex;
      gap: 12px;
      .linkContact{
        display: flex;
        height: 24px;
        width: 24px;
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
</style>
