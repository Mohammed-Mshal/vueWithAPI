<template>
  <div class="loader">
    <div class="loader-circle"></div>
    Loading...
  </div>
</template>


<style lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  .loader-circle {
    height: 40px;
    width: 40px;
    border: 4px solid #afafaf;
    border-right-color: #afafaf8f;
    border-bottom-color: #afafaf4f;
    border-left-color: #afafaf0f;
    border-radius: 50%;
    animation: 0.5s loader-animate infinite linear;
  }
}
@keyframes loader-animate {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>
