<template>
  <div>
    <div class="pc-table">
      <el-table :data="list" style="width: 100%" empty-text="empty">
        <el-table-column prop="name" label="Name">
          <template slot-scope="{ row }">
            <img-view-list :info="row"></img-view-list>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" label="FileSize" width="130">
          <template slot-scope="{ row }">{{ row.Tsize }}</template>
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
</style>
