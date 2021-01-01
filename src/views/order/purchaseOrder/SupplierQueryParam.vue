<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">供应商编码</van-divider>
    <van-field
      v-model="supplierCode"
      name="supplierCode"
      placeholder="供应商编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">供应商名称</van-divider>
    <van-field
      v-model="supplierName"
      name="supplierName"
      placeholder="供应商名称"
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
      supplierCode: "",
      supplierName: ""
    };
  },
  methods: {
    ...mapMutations("page/purchaseSupplier", ["queryParam"]),
    onSubmit(val) {
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.supplierCode = "";
      this.supplierName = "";
    }
  }
};
</script>
