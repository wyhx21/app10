<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">商品类型编码</van-divider>
    <van-field
      v-model="dicKey"
      name="dicKey"
      placeholder="商品类型编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">商品类型名称</van-divider>
    <van-field
      v-model="dicValue"
      name="dicValue"
      placeholder="商品类型名称"
      clearable
    />

    <div class="app-button">
      <van-button block plain type="primary" @click="resetParam"
        >重置</van-button
      >
      <van-button block type="primary" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("page", ["dividerStyle"])
  },
  data() {
    return {
      dicKey: "",
      dicValue: ""
    };
  },
  methods: {
    ...mapMutations("appDict/prodType", ["queryParam"]),
    onSubmit(val) {
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.dicKey = "";
      this.dicValue = "";
    }
  }
};
</script>
