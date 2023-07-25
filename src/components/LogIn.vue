<template>
    <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular
        indeterminate
        color="primary"
        :width="15"
        :size="150"
        />
    </div>
    <v-container class="">
        <!-- 로고, 로그인 인풋, 로그인 버튼, 회원가입 버튼-->
        <div id="container">
            <div style="width: 300px;">
                <v-img src="@/assets/di_logo.png" />
            </div>
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
                    label="비밀번호"
                    required
                    :type="'password'"
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
            @click="setSignUpDialog"
            elevation="0" 
            style="width: 250px; margin: 0px 20px 15px; font-weight: bold;"
            >
            회원 가입이 필요하신가요?
            </v-btn>
        </div>

        <v-dialog
        v-model="signUpDialog"
        width="400"
        >
            <v-card>
                <div style="flex:1; display: flex; justify-content: end;">
                    <v-btn
                    icon="mdi-close"
                    @click="setSignUpDialog"
                    elevation="0" 
                    />
                </div>
                <v-form
                v-model="signUpForm"
                @submit.prevent="signUp"
                >
                    <center>
                        <v-card-text id ="signUpDialogTitle">
                            회원가입
                        </v-card-text>
                    </center>
                    <div style="margin: 10px 20px 0px 20px;">
                        <div style="flex:1; display: flex; justify-content: center; ">
                            <v-text-field
                            label="아이디"
                            required
                            v-model="newUserId"
                            :rules="[rules.newUserIdRule]"
                            @update:model-value="updateUserId"
                            />
                            <v-btn
                            :disabled="newUserId.length < 8 || newUserId.length > 20"
                            color="yellow-darken-2"
                            @click="duplicateCheck"
                            style="margin: 5px 0px 0px 10px; height: 45px; font-weight: 700;"
                            >
                            중복 확인
                            </v-btn>
                        </div>
                        <v-text-field
                        label="비밀번호"
                        required
                        :type="'password'"
                        v-model="newPassword"
                        :rules="[rules.newPasswordRule]"
                        />
                        <v-text-field
                        label="이름"
                        required
                        v-model="name"
                        :rules="[rules.nameRule]"
                        />
                        <v-text-field
                        label="닉네임"
                        required
                        v-model="nickname"
                        :rules="[rules.nicknameRule]"
                        />
                        <v-text-field
                        label="이메일"
                        required
                        v-model="email"
                        :rules="[rules.emailRule]"
                        />
                        <v-text-field
                        label="휴대 전화번호(- 없이 입력 ex. 01012345678)"
                        required
                        v-model="phoneNumber"
                        :rules="[rules.phoneNumberRule]"
                        />
                    </div>
                    <center>
                        <v-btn
                        :disabled="!signUpForm"
                        color="blue-darken-2"
                        @click="signUp"
                        type="submit"
                        style="width: 330px; margin: 0px 20px 15px; padding:"
                        >
                        회원가입
                        </v-btn>
                    </center>
                </v-form>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<style scoped>
.loading-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

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
#signUpDialogTitle {
    font-size: 25px;
    font-weight: bold;
}
</style>

<script>
export default {
  data: () => ({
    rules: {
      userIdRule: userId => userId.length >= 8 || '아이디는 8글자 이상 입력되어야 합니다.',
      passwordRule: password => password.length >= 8 || '패스워드는 8글자 이상 입력되어야 합니다.',
      newUserIdRule: newUserId => (newUserId.length >= 8  && newUserId.length <= 20) || '아이디는 8글자 이상, 20글자 이하로 입력되어야 합니다.',
      newPasswordRule: newPassword => (newPassword.length >= 8  && newPassword.length <= 20) || '비밀번호는 8글자 이상, 20글자 이하로 입력되어야 합니다.',
      nameRule: name => {
        const regexp = /^[가-힣 ]+$/;

        if (name.length >= 2  && name.length <= 6 && regexp.test(name)) {
            return true;
        } else {
            return '이름은 2글자 이상, 6글자 이하의 한글과 공백으로 입력되어야 합니다.';
        }
      },
      nicknameRule: nickname => (nickname.length >= 8  && nickname.length <= 20) || '닉네임은 8글자 이상, 20글자 이하로 입력되어야 합니다.',
      emailRule: email => {
        const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexp.test(email) || '올바른 이메일 형식이 아닙니다.';
      },
      phoneNumberRule: phoneNumber => {
        const regexp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
        return regexp.test(phoneNumber) || '올바른 휴대 전화번호 형식이 아닙니다.';
      },
    },
    logInForm: false,
    signUpForm: false,
    userId: "",
    password: "",
    signUpDialog: false,
    newUserId: "",
    newUserIdCheck: false,
    newPassword: "",
    checkNewPassword: "",
    name: "",
    nickname: "",
    email: "",
    phoneNumber: "",
    canUseId: false,
  }),
  mounted() {
  },
  methods: {
    logIn () {
      if (!this.logInForm) {
        return;
      }
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);

      this.$store.dispatch('logIn', {
        "userId": this.userId,
        "password": this.password
      });
    },
    setSignUpDialog() {
        this.signUpDialog = !this.signUpDialog;

        this.newUserId = "";
        this.newPassword = "";
        this.checkNewPassword = "";
        this.name = "";
        this.nickname = "";
        this.email = "";
        this.phoneNumber = "";
    },
    duplicateCheck() {
        const result = this.$store.dispatch('isDuplicateId', this.newUserId);

        if (result) {
            this.canUseId = true;
        } else {
            this.canUseId = false;
        }
    },
    updateUserId() {
        this.canUseId = false;
    },
    signUp () {
        if (!this.canUseId) {
            alert("아이디 중복 검사가 필요합니다.");
            return;
        }
        // api call.
        const requestData = {
            "userId": this.newUserId,
            "password": this.newPassword,
            "name": this.name,
            "nickname": this.nickname,
            "email": this.email,
            "phoneNumber": this.phoneNumber,
        }

        this.$store.dispatch('signUp', requestData);

        this.signUpDialog = false;
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoading;
    }
  },
}

</script>
    