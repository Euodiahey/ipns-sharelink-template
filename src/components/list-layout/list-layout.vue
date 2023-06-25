<template>
  <div>
    <div class="pc-table">
      <el-table :data="list" style="width: 100%" empty-text="empty">
        <el-table-column prop="name" label="Name">
          <template slot-scope="{ row }">
            <img-view-list :info="row"></img-view-list>
          </template>
        </el-table-column>

        <el-table-column prop="fileSize" label="FileSize" width="400">
          <template slot-scope="{ row }">{{ row.Tsize }}</template>
        </el-table-column>
        <el-table-column prop="cidPath" label="CID" width="400">
          <template slot-scope="{ row }">
            <div class="al-c">
              <span class="cid">{{ row.cidPath }}</span>
              <img
                class="ml-4 cursor-p"
                src="@/assets/copy.svg"
                width="20"
                alt=""
                v-clipboard:copy="row.cidPath"
                v-clipboard:success="onCopy"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mobile">
      <template v-for="(item, idx) in list">
        <img-view-list :info="item" :key="idx"></img-view-list>
      </template>
    </div>
  </div>
</template>

<script>
import { getFileSize } from "@/utils/utils";
import imgViewList from "./img-view-list.vue";
export default {
  components: {
    imgViewList,
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    getFileSize: getFileSize,
    onCopy() {
      this.$message({
        message: "IPFS CID copied!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .mobile {
    display: block !important;
  }
  .pc-table {
    display: none !important;
  }
}
.mobile {
  display: none;
}
.cid {
  flex: 1;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
