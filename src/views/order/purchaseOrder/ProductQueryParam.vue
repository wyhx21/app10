<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">商品编码</van-divider>
    <van-field
      v-model="prodCode"
      name="prodCode"
      placeholder="商品编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">商品名称</van-divider>
    <van-field
      v-model="prodName"
      name="prodName"
      placeholder="商品名称"
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
      prodCode: "",
      prodName: ""
    };
  },
  methods: {
    ...mapMutations("appOrder/purchaseProduct", ["queryParam"]),
    onSubmit(val) {
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.prodCode = "";
      this.prodName = "";
    }
  }
};
</script>
