<template>
  <div class="index-container">
    <div class="project-nav">
      <div class="avatar">
        <el-image
          :src="projectInfo.avatar"
          fit="cover"
          class="al-c f-center"
          style="width: 100%; height: 100%; border-radius: 50%"
        >
          <div slot="placeholder" class="image-slot">
            <loading-cpm></loading-cpm>
          </div>
          <div slot="error" class="image-slot fz-14" style="height: 100%">
            <img
              width="100%"
              src="@/assets/avatar.svg"
              alt=""
              style="border-radius: 50%"
            />
          </div>
        </el-image>
      </div>
      <div class="project-header">
        <h3 class="title">{{ projectInfo.websiteName }}</h3>
        <div class="desc mt-4 fz-16">
          {{ projectInfo.bio }}
        </div>
      </div>
      <div class="project-content">
        <el-input
          v-if="projectInfo.displaySwitch"
          class="resolve-ipt"
          v-model="ipns"
          placeholder="Please enter IPNS"
          @keyup.enter.native="handleResolveIpns"
        >
          <img
            slot="suffix"
            @click="handleResolveIpns"
            class="input-suffix-btn"
            src="../assets/right-search-arrow.svg"
            width="20"
            alt=""
          />
        </el-input>
        <div
          class="or"
          v-if="
            projectInfo.ipnsResourceTable.length && projectInfo.displaySwitch
          "
        >
          or
        </div>
        <template v-for="(item, index) in projectInfo.ipnsResourceTable ?? []">
          <div
            class="ipns-item"
            :key="index"
            @click="handleResolveOptionIpns(item.ipns)"
          >
            <span>{{ item.name }}</span>
            <img width="20" src="../assets/right-arrow.svg" alt="" />
          </div>
        </template>
      </div>
    </div>
    <div class="project-tip cursor-p" @click="handleLink">
      Deploy one? Start here!
    </div>
  </div>
</template>

<script>
import LoadingCpm from "@/components/loading-cpm.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: {
    LoadingCpm,
  },
  data() {
    return {
      ipns: "",
      requestMap: new Map(),
      refRequestId: null,
    };
  },
  computed: {
    ...mapState({
      projectInfo: (s) => s.projectInfo,
    }),
    ipnsGateway() {
      if (this.projectInfo && this.projectInfo.ipnsGateway) {
        let ipnsGateway = this.projectInfo.ipnsGateway.trim();
        let i = ipnsGateway.lastIndexOf("/");
        if (i == ipnsGateway.length - 1) return ipnsGateway + "ipns/";
        return ipnsGateway + "/ipns/";
      }
      return "https://4everland.io/ipns/";
    },
  },
  methods: {
    handleResolveIpns() {
      if (!this.ipns) return;
      this.resolveIpns(this.ipns.trim());
    },
    handleResolveOptionIpns(ipns) {
      if (!ipns) return;
      this.resolveIpns(ipns);
    },
    async resolveIpns(ipns) {
      this.$loading();
      try {
        const requestId = Symbol();
        this.refRequestId = requestId;
        const controller = this.requestMap.get(requestId);
        if (controller) {
          controller.abort();
          this.requestMap.delete(requestId);
        }
        let curController = new AbortController();
        this.requestMap.set(requestId, curController);
        const data = await axios.get(
          `${this.ipnsGateway}${ipns}?format=ipns-record`,
          { responseType: "arraybuffer", signal: curController.signal }
        );
        const buffer = new Uint8Array(data.data);
        const result = window.Ipns.unmarshal(buffer);
        let hashPath = new TextDecoder().decode(result.value);
        // console.log(hashPath);
        this.$loading().close();
        let hash = hashPath.replace("/ipfs/", "");
        this.$router.push(`/ipns-content/${hash}`);
      } catch (error) {
        // throw new Error(error.message);
        console.log(error);
        this.$message(error.message);
        this.$loading().close();
      }
    },
    handleLink() {
      window.open("https://dashboard.4everland.org/hosting/new");
    },
  },
  watch: {
    refRequestId(newVal, oldVal) {
      const controller = this.requestMap.get(oldVal);
      if (controller) {
        controller.abort();
        this.requestMap.delete(oldVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-suffix-btn {
  margin-right: 10px;
  vertical-align: bottom;
  cursor: pointer;
}
::v-deep .el-input__suffix {
  display: flex;
  align-items: center;
}
.resolve-ipt ::v-deep .el-input__inner {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
.index-container {
  width: 100%;
  height: 100%;
  background: no-repeat url("../assets/bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  padding: 80px 20px;
  box-sizing: border-box;
  .project-nav {
    position: relative;
    max-width: 758px;
    height: 100%;
    margin: 0 auto 0;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0px 4px 24px rgba(14, 14, 44, 0.05);
    border-radius: 12px;
    .avatar {
      position: absolute;
      left: 50%;
      top: -6%;
      transform: translateX(-50%);
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .project-header {
      height: 248px;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75),
          rgba(255, 255, 255, 0.75)
        ),
        rgba(0, 122, 255, 0.2);
      border-radius: 12px;

      overflow: hidden;
      .title {
        margin-top: 100px;
        font-size: 40px;
        color: #0e0e2c;
        text-align: center;
      }
      .desc {
        padding: 0 64px;
        color: #8c8ca1;
        line-height: 20px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 超出几行省略 */
        overflow: hidden;
      }
    }
    .project-content {
      padding: 40px 64px 0;
      height: calc(100% - 248px);
      box-sizing: border-box;
      overflow: auto;

      .or {
        padding: 20px 0;
        text-align: center;
        font-size: 18px;
      }
      .ipns-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 16px;
        height: 60px;
        margin-bottom: 30px;
        color: #0e0e2c;
        font-size: 14px;
        box-sizing: border-box;
        background: rgba(30, 80, 255, 0.05);
        border: 1px solid rgba(140, 140, 161, 0.05);
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
  .project-tip {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    color: #8c8ca1;
  }
}
</style>
