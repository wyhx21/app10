<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">仓库编码</van-divider>
    <van-field
      v-model="storeCode"
      name="storeCode"
      placeholder="仓库编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">仓库名称</van-divider>
    <van-field
      v-model="storeName"
      name="storeName"
      placeholder="仓库名称"
      clearable
    />

    <van-divider dashed :style="dividerStyle">是否有效</van-divider>
    <van-radio-group v-model="deleted" direction="horizontal">
      <van-radio name="1">有效</van-radio>
      <van-radio name="0">无效</van-radio>
    </van-radio-group>

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
      storeCode: "",
      storeName: "",
      deleted: ""
    };
  },
  methods: {
    ...mapMutations("appStore/store", ["queryParam"]),
    onSubmit(val) {
      val.deleted = this.deleted;
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.storeCode = "";
      this.storeName = "";
      this.deleted = "";
    }
  }
};
</script>
