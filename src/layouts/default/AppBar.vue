<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-img height="30" src="@/assets/di_logo_no_text.png" />
    </template>
    <div class="ml-2" id="app-bar-title">Directors</div>

    <v-spacer/>
    <div v-if="!isLogin" style="margin-right: 10px;">
      <v-btn 
      prepend-icon="mdi-account-circle" 
      color="deep-purple-darken-3" 
      elevation="1" 
      style="margin-right: 7px;"
      @click="openLoginDialog"
      >
        로그인
      </v-btn>
      <v-btn 
      prepend-icon="mdi-account-plus-outline" 
      color="yellow-darken-2" 
      elevation="1" 
      @click="openSignupDialog"
      >
        회원가입
      </v-btn>
    </div>
  
  </v-app-bar>
</template>

<script setup>
</script>

<script>
export default {
  data: () => ({
  }),
  mounted() {
    // this.fetchNewData();
  },
  methods: {
    openLoginDialog() {
      console.log("login dialog open!!");
      this.$store.commit('setlogInDialog');
    },
    openSignupDialog() {
      console.log("signup dialog open!!");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  },
}
</script>

<style scoped>
#app-bar-title{
  font-size: 28px;
  font-weight: bold;
}
</style>