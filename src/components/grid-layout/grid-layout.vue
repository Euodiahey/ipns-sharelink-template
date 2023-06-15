<template>
  <el-row :gutter="20">
    <el-col
      :sm="6"
      :lg="4"
      :span="12"
      v-for="(item, index) in list"
      :key="index"
    >
      <img-view-card :info="item"></img-view-card>
    </el-col>
  </el-row>
</template>

<script>
import imgViewCard from "./img-view-card.vue";
export default {
  components: {
    imgViewCard,
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
