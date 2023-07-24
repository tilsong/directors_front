<template>
    <v-container class="">
    <div id="container">
        <div style="width: 300px;"><v-img src="@/assets/di_logo.png" /></div>
        <v-form
            v-model="logInForm"
            @submit.prevent="logIn"
        >
            <div style="margin: 0px 50px 0px 50px; width: 250px;">
                <v-text-field
                    label="아이디"
                    variant="solo"
                    required
                    v-model="userId"
                    :rules="[rules.userIdRule]"
                />
                <v-text-field
                    label="패스워드"
                    required
                    variant="solo"
                    v-model="password"
                    :rules="[rules.passwordRule]"
                    @enter="logIn"
                    />
                </div>
                <v-spacer></v-spacer>
                <center>
                    <v-btn
                        :disabled="!logInForm"
                        color="blue-darken-2"
                        @click="logIn"
                        type="submit"
                        style="width: 250px; margin: 0px 20px 15px; padding:"
                    >
                        로그인
                    </v-btn>
                </center>
            </v-form>
            <v-btn
                @click="logIn"
                elevation="0" 
                style="width: 250px; margin: 0px 20px 15px; font-weight: bold;"
            >
                회원 가입이 필요하신가요?
            </v-btn>
    </div>
</v-container>
</template>
  
<style scoped>
#container {
    display: flex;
    flex-direction: column; /* Flexbox의 방향을 수직으로 설정 */
    justify-content: center; /* 세로 중앙 정렬 */
    align-items: center; /* 가로 중앙 정렬 */
    height: 100vh; /* 뷰포트의 높이를 100%로 설정 */
}

#networkText {
    color: #47A0C2;
    font-size: 14px;
    font-weight: bold;
}
#directorsText {
    font-weight: bold;
}
#logInText {
    margin-bottom: 20px; /* 요소들 사이에 간격을 주기 위한 마진 설정 */
    font-size: 30px;
    font-weight: bold;
}

</style>

<script>
export default {
  data: () => ({
    rules: {
      userIdRule: userId => userId.length > 8 || '아이디는 8글자 이상 입력되어야 합니다.',
      passwordRule: password => password.length > 8 || '패스워드는 8글자 이상 입력되어야 합니다.',
    },
    logInForm: false,
    userId: "",
    password: "",
  }),
  mounted() {
  },
  methods: {
    logIn () {
      if (!this.logInForm) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)

      this.$store.dispatch('logIn', {
        "userId": this.userId,
        "password": this.password
      });
    },
  },
  computed: {
  },
}

</script>
    