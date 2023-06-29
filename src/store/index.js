import { createStore } from 'vuex';
import apiClient from '../api';

const store = createStore({
  state: {
    directorList: [],
    loading: false,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setDirectorList(state, data) {
      const list = [];
      for (let i = 0; i < data.length; i++) {
        let specialty = "";
        for (let j = 0; j < data[i].specialtyList.length; j++) {
            specialty += data[i].specialtyList[j].property;
            if (j != data[i].specialtyList.length - 1) {
              specialty += (', ');
            }
        }

        if (data[i].specialtyList.length > 1) {
          data[i].specialtyList[0].description += `\n 그 외 ${data[i].specialtyList.length}개의 전문 분야 소유.`;
        }

        let description = data[i].specialtyList[0].description;
        if (description.length > 100) {
          description = description.substring(0, 100) + ' ... '; // 문자열의 처음부터 30글자까지 추출
        }

        list.push({
          image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: data[i].name,
          specialty,
          description,
        });
      }
      if (state.directorList.length != 0) {
        state.directorList = state.directorList.concat(list);
      } else {
        state.directorList = list;
      }

    },
  },
  actions: {
    async fetchDirectorList({ commit, state }, requestData) {
      if (state.loading) {
        return; 
      }
      commit('setLoading', true);

      try {
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
  },
});

export default store;
