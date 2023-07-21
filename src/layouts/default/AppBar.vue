<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-img height="30" src="@/assets/di_logo_no_text.png" />
    </template>
    <div class="ml-2" id="app-bar-title">Directors</div>

    <v-spacer></v-spacer>

    <v-btn 
    prepend-icon="mdi-account-circle" 
    color="deep-purple-darken-3" 
    elevation="1" 
    style="margin-right: 7px;"
    >
      로그인
    </v-btn>
    <v-btn prepend-icon="mdi-account-plus-outline" color="yellow-darken-2" elevation="1" >
      회원가입
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  //
</script>

<style scoped>
#app-bar-title{
  font-size: 28px;
  font-weight: bold;
}
</style>