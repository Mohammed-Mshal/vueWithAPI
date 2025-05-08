<script setup>
  import LoaderComponent from '@/components/LoaderComponent.vue';
import UserCard from '@/components/UserCard.vue';
import { useGetUsers } from '@/composable/users';
  import { onMounted, ref } from 'vue';
  const users=ref(null)
  const {isLoading,error,getUsers} =useGetUsers()
  onMounted(async ()=>{
    const usersData=await getUsers()
    users.value=usersData
  })
  </script>
<template>
  <div class="home">
    <div class="container">
      <h2 class="title">
        Users List
      </h2>
      <LoaderComponent v-if="isLoading"/>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div class="list-users" v-else>
        <UserCard v-for="user in users" :key="user.data" :name="user.name" :username="user.username" :website="user.website" :phone="user.phone" :email="user.email"/>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home{
    padding-block: 80px;
    .container{
      .title{
        font-size: clamp(20px,3vw,32px);
        text-align: center;
        color: #FFF;
        margin-bottom: 32px;
      }
      .error-message{
        font-size: clamp(18px,3vw,24px);
        color: #FE500F;
        text-align: center;
      }
      .list-users{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px;
      }
    }
  }
</style>
