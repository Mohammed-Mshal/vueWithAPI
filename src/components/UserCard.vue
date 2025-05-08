<script setup>
  import phoneIcon from '@/assets/images/phone.svg'
  import emailIcon from '@/assets/images/email.svg'
  import globalIcon from '@/assets/images/global.svg'
  const props=defineProps({
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
</script>
<template>
  <div class="card">
    <h2 class="name">
        {{ props.name }}
    </h2>
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
    .name{
      font-size: clamp(18px,3vw,26px);
      line-height: normal;
      color: #FFF;
      margin-bottom: 8px;
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
