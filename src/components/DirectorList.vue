<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <h3 class="text-h4 font-weight-bold text-center">디렉터 찾기</h3>
      <div class="py-5" />
      
      <div id="filter">
        <h5 id="filter-title" style="font-size: 25px;">검색 필터</h5>
        <div id="filter-list1" style="margin-left: 5px;">
          <v-btn
          prepend-icon="mdi-map-marker-off"
            size="large"
            color="deep-purple-darken-2"
            @click="openCertRegionDialog"
          >
            지역 인증하기
          </v-btn>
          <div id="slider">
            <v-slider
              readonly
              :ticks="tickLabels"
              :max="4"
              step="1"
              show-ticks
              color="deep-purple-darken-2"
              label="지역 범위"
              model-value="0"
              tick-size="5"
              @click="alertForCertRegion"
            />
          </div>
          <!---- 로그아웃 다이얼로그 ---->
          <v-dialog
            v-model="logOutDialog"
            width="400"
          >
            <v-card>
              <v-card-text style="text-align: center; margin-top: 5px; font-weight: bold;">
                로그아웃하시겠습니까?
              </v-card-text>
              <v-spacer></v-spacer>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="logOut"
              >
                네
              </v-btn>
              <v-btn
                color="yellow-darken-2"
                variant="text"
                @click="changeLogOutDialog"
              >
                아니오
              </v-btn>           
            </v-card>
          </v-dialog>

          <!---- 지역 인증 다이얼로그 ---->
          <v-dialog
            v-model="regionDialog"
            width="400"
          >
            <v-card>
              <v-card-text style="text-align: center; margin-top: 5px; font-weight: bold;">
                지역 인증을 진행하시겠습니까?
                <br/>
                근처의 디렉터를 검색할 수 있게 됩니다.
              </v-card-text>
              <v-spacer></v-spacer>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="getRegionCertification"
              >
                네
              </v-btn>
              <v-btn
                color="yellow-darken-2"
                variant="text"
                @click="regionDialog = false"
              >
                아니오
              </v-btn>           
            </v-card>
          </v-dialog>

                    <!-- <v-btn
          prepend-icon="mdi-map-marker-off"
            size="large"
            color="deep-purple-darken-2"
            @click="dialog = !dialog"
          >
            {{ currentRegion }} , 지역 범위 {{ regionDegree }}
          </v-btn>   -->
        </div>
        <div id="filter-list">
          <v-combobox
          size="small"
          v-model="specialtyValue"
          label="분야"
          :items="specialtyProperty"
          variant="solo"
          @update:model-value="fetchNewData"
          style="margin-left: 5px;"
          />

          <v-combobox
          v-model="scheduleValue"
          label="스케줄"
          :items="scheduleProperty"
          variant="solo"
          @update:model-value="fetchNewData"
          />
          <v-text-field 
          label="검색어를 입력하세요." 
          variant="solo-filled"
          append-inner-icon="mdi-magnify"
          @click:append-inner="fetchNewData"
          />
        </div>
      </div>
      <div class="py-3" />


      <v-row class="d-flex align-center justify-center " cols="8">
        <div class="item-list"  ref="itemList">
          <div v-if="directorList == null || directorList.length == 0">
            <div style="margin-bottom: 10px; text-align: center; font-size: 20px; font-weight: bold;">검색된 디렉터가 존재하지 않습니다.</div>
            <center>
              <img src="@/assets/no_data.jpg" alt="no_data" style="width: 600px;">
            </center>
          </div>

          <v-col  v-for="(item, index) in directorList" :key="index">
            <div class="item-wrapper" @click="moveDirectorPage">
              <div class="item-content">
                <div class="item-image">
                  <img :src="item.image" alt="Director Image">
                </div>
                <div class="item-details">
                  <div class="specialty">{{ item.specialty }}</div>
                  <span class="text-primary">{{ item.name }}</span>
                  &mdash; {{ item.description }}
                </div>
              </div>
            </div>
          </v-col>
        </div>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style scoped>
#loginDialogTitle {
  text-align: center; 
  font-size: 30px;
  margin-top: -20px;
  font-weight: bold;
} 

#filter {
  font-weight: bold;
  width: 800px;
  margin: 0 auto;
  justify-content: center;
}

.item-list {
  margin-left: 5px;
  margin-right: 5px;
}

#slider {
  margin-top: 20px;
  margin-left: 10px;
  width: 400px;
}

#filter-list1 {
  display: flex;
  flex: 1;
  justify-content: left;
  align-items: center;
}

#filter-list {
  display: flex;
  justify-content: space-around;
}
#filter-list > div {
  margin-right: 20px;
}
#filter-title {
  text-align: left;
}

.specialty {
  font-size: 20px;
  font-weight: bold;
}
.item-wrapper {
  position: relative;
  margin-bottom: -16px;
}

.item-content {
  background-color: #ffffff;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.item-image {
  float: left;
  width: 60px;
  height: 60px;
  margin-right: 16px;
  overflow: hidden;
  border-radius: 50%;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  /* float: right; */
  flex: 1;
}

/* Optional: Add transition for hover effect */
.item-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 255, 0.05);
}
</style>

<script>
import router from '../router'; 

export default {
  data: () => ({
    rules: {
      userIdRule: userId => userId.length > 8 || '아이디는 8글자 이상 입력되어야 합니다.',
      passwordRule: password => password.length > 8 || '패스워드는 8글자 이상 입력되어야 합니다.',
    },
    logInForm: false,
    userId: "",
    password: "",
    regionDialog: false,
    distance: 3,
    specialtyValue: null,
    scheduleValue: null,
    searchText: null,
    page: 1,
    specialtyProperty: [
    "전체",
    "프로그래밍",
    "디자인",
    "헬스",
    "엔지니어링",
    "교육",
    "인적자원",
    "경영지원",
    "건설",
    "영업",
    "생산",
    "마케팅",
    "법무",
    "미디어",
    "의료",
    "서비스",
    "금융",
    "물류",
    "무역",
    "전문직",
    "생활",
    "육아",
    "여행",
    "예술",
    "기타",
    ],
    scheduleProperty: [
    "있음",
    "없음",
    ],
    tickLabels: {
      0: '1',
      1: '2',
      2: '3',
      3: '4',
      4: '5',
    },
  }),
  mounted() {
    this.$store.dispatch('getNearestAddress', 1);
    this.fetchNewData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getRegionCertification() {
      if (navigator.geolocation) {
        this.getGeolocation()
          .then(position => {
            this.$store.dispatch('getRegionCertification', {
              "latitude": position.coords.latitude,
              "longitude": position.coords.longitude,
            });
          })
          .catch(error => {
            console.log(error);
            alert("지역 인증이 실패했습니다. \n 해당 지역 혹은 브라우저를 지원하지 않습니다.");
          })
      } else { 
        alert("지역 인증이 실패했습니다. \n 해당 지역 혹은 브라우저를 지원하지 않습니다.");
      }
      this.regionDialog = false
    },
    getGeolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    changeLogOutDialog() {
      this.$store.commit('setlogOutDialog');
    },
    logOut() {
      localStorage.removeItem("token");
      router.push('/LogIn').then(() => router.go(0));
    },
    alertForCertRegion(){
      alert("지역 인증이 필요합니다.");
    },
    openCertRegionDialog() {
      // alert("로그인 후 이용 가능한 서비스입니다.");
      this.regionDialog = !this.regionDialog;
    },
    moveDirectorPage() {
      alert('디렉터 상세 페이지”는 준비 중에 있습니다');
    },
    fetchNewData() {
      if (this.specialtyValue === "전체") {
        this.specialtyValue = null;
      }
      this.$store.dispatch('fetchNewDirectorList', {
        "distance": this.distance,
        "property": this.specialtyValue,
        "hasSchedule": this.scheduleValue === "있음" ? true : false,
        "searchText": this.searchText,
        "page": 1,
        "size": 20,
      })
    },
    fetchData() {
      if (this.specialtyValue === "전체") {
        this.specialtyValue = null;
      }
      this.$store.dispatch('fetchDirectorList', {
        "distance": this.distance,
        "property": this.specialtyValue,
        "hasSchedule": this.scheduleValue === "있음" ? true : false,
        "searchText": this.searchText,
        "page": this.page,
        "size": 20,
      });
    },
    handleScroll() {
      if (this.$refs.itemList) {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        const itemListHeight = this.$refs.itemList.offsetHeight;

        clearTimeout(this.scrollTimeout);

        this.scrollTimeout = setTimeout(() => {
          if (scrollPosition >= itemListHeight) {
            this.page++;
            this.fetchData();
          }
        }, 1000);
      }
    },
  },
  computed: {
    directorList() {
      let list = this.$store.getters.getDirectorList;
      return Array.isArray(list) ? list : [];
    },
    isLoading() {
      return this.$store.state.loading;
    },
    logOutDialog() {
      return this.$store.getters.getLogOutDialog;
    },
  },
}

</script>
  