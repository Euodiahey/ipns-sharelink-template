<template>
  <el-table :data="list" style="width: 100%" empty-text="empty">
    <el-table-column prop="name" label="name">
      <template slot-scope="{ row }">
        <img-view-list :info="row"></img-view-list>
      </template>
    </el-table-column>
    <el-table-column prop="fileSize" label="FileSize" width="130">
      <template slot-scope="{ row }">{{ row.size || row.Tsize }}</template>
    </el-table-column>
  </el-table>
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

<style lang="scss" scoped></style>
