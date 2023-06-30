<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <h3 class="text-h4 font-weight-bold text-center">디렉터 찾기</h3>
      <div class="py-5" />
      <div class="text-center text-h6" id="filter">
        <div id="filter-title">검색 필터</div>
        <div id="filter-list">
            <div>지역 설정 </div>
            <!-- (로그인x -> uncheck 모드, 로그인 시 유저 지역 및 범위 정도 설정할 수 있도록 하기) -->

            <v-combobox
            v-model="property"
            label="분야"
            :items="specialtyProperty"
            variant="solo"
          />


          <!-- 선택: 체크 박스 사용  -->
          <v-switch
          color="primary"
          :model-value="hasSchedule"
          label="스케줄"
          class="custom-switch"          
          />

          <div class="custom-textfield">
            <input type="text" class="custom-textfield-input" placeholder="검색어를 입력하세요">
          </div>
        </div>
      </div>
      
      <v-row class="d-flex align-center justify-center " cols="8">
        <div class="item-list"  ref="itemList">
          <v-col  v-for="(item, index) in directorList" :key="index">
            <div class="item-wrapper  a" @click="moveDirectorPage(item.id)">
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
.custom-textfield {
  position: relative;
  width: 200px;
}

.custom-textfield-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.custom-textfield-label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  transition: transform 0.3s, font-size 0.3s;
  font-size: 14px;
  color: #999;
}

.custom-textfield-input:focus + .custom-textfield-label,
.custom-textfield-input:not(:placeholder-shown) + .custom-textfield-label {
  transform: translateY(-100%) scale(0.8);
  font-size: 12px;
  color: #555;
}

.v-input--switch__track {
    border-radius: 25px;
    width: 68px;
    height: 29px;
    top: -2px;
}

.v-input--switch__thumb {
  left: 6px;
}

.custom-switch .v-input__slot .v-label {
  left: 6px !important
}

.v-input--selection-controls__ripple {
  height: 0;
  width: 0
}
#filter-list {
  display: flex;
  justify-content: flex-start
}
#filter-list > div {
  margin-right: 0px;
}
#filter-title {
  text-align: left;
  margin-bottom: 10px;
}
#filter {
  font-weight: bold;
  /* border: 1px solid blue; */
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
export default {
  data: () => ({
    distance: 3,
    property: null,
    hasSchedule: false,
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
    ]
  }),
  mounted() {
    this.fetchNewData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    moveDirectorPage(id) {
      console.log('moveDirectorPage: ', id);
    },
    fetchNewData() {
      if (this.property === "전체") {
        this.property = null;
      }
      this.$store.dispatch('fetchNewDirectorList', {
        "distance": this.distance,
        "property": this.property,
        "hasSchedule": this.hasSchedule,
        "searchText": this.searchText,
        "page": this.page,
        "size": 20,
      })
    },
    fetchData() {
      if (this.property === "전체") {
        this.property = null;
      }
      this.$store.dispatch('fetchDirectorList', {
        "distance": this.distance,
        "property": this.property,
        "hasSchedule": this.hasSchedule,
        "searchText": this.searchText,
        "page": this.page,
        "size": 20,
      })
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
  },
}

</script>
  