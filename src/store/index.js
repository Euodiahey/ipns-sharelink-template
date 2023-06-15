import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    reader: null,
    dir: [],
    projectInfo: null,
  },
  mutations: {
    SET_READER(state, reader) {
      state.reader = reader;
    },
    SET_DIR(state, dir) {
      state.dir = dir;
    },
    CHANGE_DIR(state, { i, key, value }) {
      state.reader.dir[i][key] = value;
    },
    SET_PROJECTINFO(state, info) {
      state.projectInfo = info;
    },
  },
  actions: {
    async getReaderList({ commit, dispatch }) {
      try {
        await this.state.reader.getResult();
        commit("SET_DIR", this.state.reader.dir);
        dispatch("loadMore");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async loadMore({ dispatch, commit }) {
      try {
        await this.state.reader.getNextPage();
        commit("SET_DIR", this.state.reader.dir);
        if (!this.state.reader.hasMore) return;
        dispatch("loadMore");
      } catch (error) {
        console.log(error.message);
        if (!this.state.reader.hasMore) return;
        dispatch("loadMore");
      }
    },
    async getProjectInfo({ commit }) {
      try {
        const { data } = await axios.get("./config.json");
        // console.log(data);
        let configObj = {};
        data.config.forEach((item) => {
          item.options.forEach((i) => {
            if (i.key == "ipnsResourceTable") {
              configObj[i.key] = i.items;
            } else {
              configObj[i.key] = i.value;
            }
          });
        });
        commit("SET_PROJECTINFO", configObj);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default store;
