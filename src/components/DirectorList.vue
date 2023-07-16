<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <h3 class="text-h4 font-weight-bold text-center">디렉터 찾기</h3>
      <div class="py-5" />
      <div class="text-center text-h5" id="filter">
        <div id="filter-title" style="margin-left: 5px;">검색 필터</div>
        <div id="filter-list1" style="margin-left: 5px;">
          <v-btn
          prepend-icon="mdi-map-marker-off"
            size="large"
            color="deep-purple-darken-2"
            @click="dialog = !dialog"
          >
            지역 인증이 필요합니다
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
            />
          </div>
        </div>
        
        <div id="filter-list">

          <!-- <v-btn
          prepend-icon="mdi-map-marker-off"
            size="large"
            color="deep-purple-darken-2"
            @click="dialog = !dialog"
          >
            {{ currentRegion }} , 지역 범위 {{ regionDegree }}
          </v-btn>   -->


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

          <!-- <div class="custom-textfield">
            <input type="text" class="custom-textfield-input" placeholder="검색어를 입력하세요">
          </div> -->
        </div>
      </div>
      <div class="py-1" />
      
      <v-row class="d-flex align-center justify-center " cols="8">
        <div class="item-list"  ref="itemList">
          <v-col  v-for="(item, index) in directorList" :key="index">
            <div class="item-wrapper" @click="moveDirectorPage(item.id)">
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
#filter {
  font-weight: bold;
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
    dialog: false,
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
      if (this.specialtyValue === "전체") {
        this.specialtyValue = null;
      }

      this.$store.dispatch('fetchNewDirectorList', {
        "distance": this.distance,
        "property": this.specialtyValue,
        "hasSchedule": this.scheduleValue === "있음" ? true : false,
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
  