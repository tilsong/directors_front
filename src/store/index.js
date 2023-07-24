import { createStore } from 'vuex';
import apiClient from '../api';
import router from '../router'; 

const store = createStore({
  state: {
    directorList: [],
    loading: false,
    isLogin: false,
    logOutDialog: false,
    userRegionList: [],
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    async setNewDirectorList(state, data) {
      const list = await setDirectors(data);
      state.directorList = list;
    },
    async setDirectorList(state, data) {
      const list = await setDirectors(data);
      state.directorList = state.directorList.concat(list);
    },
    async logIn(state, data) {
      console.log("in mutation ", data);
    },
    async setlogOutDialog(state) {
      state.logOutDialog = !state.logOutDialog;
    },
    async setUserRegion(state, data) {
      state.userRegionList = data;
    },
  },
  actions: {
    async isDuplicateId({commit, state}, userId) {
      if (state.loading) {
        return;  
      }
      commit('setLoading', true);

      try {
        await apiClient.get(`/user/duplicated/${userId}`);
        alert("사용가능한 아이디입니다.");
      } catch(e) {
        alert("중복된 아이디입니다. ");
        console.log(e);
      } finally {
        commit('setLoading', false);
      }
    },
    async logIn({commit, state}, requestData){
      if (state.loading) {
        return;  
      }
      commit('setLoading', true);

      try {
        localStorage.removeItem("token");
        const response = await apiClient.post('/user/logIn', requestData);
        console.log("/user/logIn", requestData);
        localStorage.setItem("token", response.data.refreshToken);
        
        // regionList 요청하고 저장하기
        const regionResponse = await apiClient.get('/region/nearestAddress/1');
        console.log("/region/nearestAddress/1", regionResponse.data);
        router.push('/');
      } catch(e) {
        alert("로그인이 실패했습니다. \n아이디와 패스워드를 다시 확인해주세요.");
        console.log(e);
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchNewDirectorList({ commit, state}, requestData) {
      if (state.loading) {
        return; 
      }
      commit('setLoading', true);

      try {
        const res = await fetchDirectors(requestData);
        commit('setNewDirectorList', res);
      } catch (error) {
        console.error(error);
      }finally {
        commit('setLoading', false); // 로딩 상태 해제
      }
      
    },
    async fetchDirectorList({ commit, state }, requestData) {
      if (state.loading) {
        return; 
      }
      commit('setLoading', true);

      try {
        const res = await fetchDirectors(requestData);
        commit('setDirectorList', res);
      } catch (error) {
        console.error(error);
      }finally {
        commit('setLoading', false); // 로딩 상태 해제
      }
    },
  },
  getters: {
    getDirectorList(state) {
      return state.directorList;
    },
    getIsLogin(state) {
      return state.isLogin;
    },
    getLogOutDialog(state) {
      return state.logOutDialog;
    }
  },
});

const fetchDirectors = async (requestData) => {
  const response = await apiClient.post('/user/director/list', requestData);
  const res = response.data;

  if (requestData.property != null) {
    for (let i = 0; i < res.length; i++) {
      const specialtyList = res[i].specialtyList;

      for (let j = 0; j < specialtyList.length; j++) {
        if (specialtyList[j].property == requestData.property) {
          res[i].specialtyList = [specialtyList[j]];
          break;
        }
      }
    }
  }
  return res;
}
const setDirectors = async (data) => {
  const list = [];

  for (let i = 0; i < data.length; i++) {
    let specialty = "";
    for (let j = 0; j < data[i].specialtyList.length; j++) {
        specialty += data[i].specialtyList[j].property;
        if (j != data[i].specialtyList.length - 1) {
          specialty += (', ');
        }
    }

    let description = data[i].specialtyList[0].description;
    if (description.length > 100) {
      description = description.substring(0, 100) + ' ... ';
    }
    if (data[i].specialtyList.length > 1) {
      description += `\n 그 외 ${data[i].specialtyList.length}개의 전문 분야 소유.`;
    }

    list.push({
      image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      name: data[i].name,
      id: data[i].id,
      specialty,
      description,
    });
  }

  return list;
}

export default store;
