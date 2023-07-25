<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-img height="30" src="@/assets/di_logo_no_text.png" />
    </template>
    <div class="ml-2" id="app-bar-title">Directors</div>

    <v-spacer/>
    <div style="margin-right: 10px;">
      <v-btn 
      prepend-icon="mdi-account-circle" 
      color="deep-purple-darken-3" 
      elevation="1" 
      style="margin-right: 7px;"
      @click="openLogOutDialog"
      >
        로그아웃
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
  },
  methods: {
    openLogOutDialog() {
      this.$store.commit('setlogOutDialog');
    },
  },
  computed: {
  },
}
</script>

<style scoped>
#app-bar-title{
  font-size: 28px;
  font-weight: bold;
}
</style>