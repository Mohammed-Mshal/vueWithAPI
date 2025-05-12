<script setup>
  import LoaderComponent from '@/components/LoaderComponent.vue';
import UserCard from '@/components/UserCard.vue';
import { useGetUsers } from '@/composable/users';
  import { onMounted, ref } from 'vue';
  const users=ref(null)
  const {isLoading,error,getUsers} =useGetUsers()
  const fetchUsers=async()=>{
    users.value=[]
    const usersData=await getUsers()
    users.value=usersData
  }
  onMounted(async ()=>{
    await fetchUsers()
  })
  </script>
<template>
  <div class="home">
    <div class="container">
    <div class="header-home">
        <h2 class="title">
        Users List
      </h2>
      <RouterLink to="/home/createuser">
        Create User
      </RouterLink>
    </div>
      <LoaderComponent v-if="isLoading"/>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div class="list-users" v-else>
        <UserCard v-for="user in users"  @refresh-list="fetchUsers"  :key="user._id" :id="user._id" :name="user.name" :username="user.username" :website="user.website" :phone="user.phone" :email="user.email"/>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home{
    padding-block: 80px;
    .container{
    .header-home{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      gap: 20px;
      a{
        color: #FFF;
        font-size: clamp(18px,2.4vw,24px);
        text-decoration: none;
        transition: .3s all ease-in-out;
        &:hover{
          color: #AFAFAF;
        }
      };
      .title{
        font-size: clamp(20px,3vw,32px);
        text-align: center;
        color: #FFF;
      }
    }
      .error-message{
        font-size: clamp(18px,3vw,24px);
        color: #FE500F;
        text-align: center;
      }
      .list-users{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        gap: 20px;
      }
    }
  }
</style>
