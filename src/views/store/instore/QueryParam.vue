<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">订单编号</van-divider>
    <van-field
      v-model="orderNo"
      name="orderNo"
      placeholder="订单编号"
      clearable
    />

    <van-divider dashed :style="dividerStyle">供应商编码</van-divider>
    <van-field
      v-model="cusCode"
      name="cusCode"
      placeholder="供应商编码"
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
      cusCode: "",
      orderNo: ""
    };
  },
  methods: {
    ...mapMutations("appStore/instore", ["queryParam"]),
    onSubmit(val) {
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.cusCode = "";
      this.orderNo = "";
    }
  }
};
</script>
