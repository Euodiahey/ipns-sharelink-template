<template>
  <el-table :data="list" style="width: 100%" empty-text="empty">
    <el-table-column prop="name" label="name">
      <template slot-scope="{ row }">
        <img-view-list :info="row"></img-view-list>
      </template>
    </el-table-column>
    <el-table-column prop="fileSize" label="FileSize" width="130">
    </el-table-column>
  </el-table>
</template>

<script>
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
};
</script>

<style lang="scss" scoped></style>
