<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <h3 class="text-h4 font-weight-bold text-center">디렉터 찾기</h3>
      <div class="py-5" />
      <div class="text-center text-h5" id="filter">
        <div>필터</div>
        <div>
          <!-- (로그인x -> uncheck 모드, 로그인 시 유저 지역 및 범위 정도 설정할 수 있도록 하기) -->
          <div>지역 설정 </div>
          <!-- 선택: 콤보 박스 사용  -->
          <div>전문 분야 선택</div>
          <!-- 선택: 체크 박스 사용  -->
          <div>스케줄 유무 선택</div>
          <!-- 선택: input form 사용  -->
          <div>검색</div>
        </div>
      </div>
      
      <v-row class="d-flex align-center justify-center " cols="8">
        <div class="item-list"  ref="itemList">
          <v-col  v-for="(item, index) in directorList" :key="index">
            <div class="item-wrapper  a">
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
#filter {
  border: 1px solid blue;
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
    property: "프로그래밍",
    hasSchedule: false,
    searchText: null,
    page: 1,
  }),
  mounted() {
    this.fetchData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    fetchData() {
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
      console.log('lisddddt', list)
      return Array.isArray(list) ? list : [];
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
}

</script>
  