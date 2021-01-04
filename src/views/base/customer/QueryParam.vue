<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">客户编码</van-divider>
    <van-field
      v-model="cusCode"
      name="cusCode"
      placeholder="客户编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">客户名称</van-divider>
    <van-field
      v-model="cusName"
      name="cusName"
      placeholder="客户编码"
      clearable
    />

    <van-divider dashed :style="dividerStyle">联系人</van-divider>
    <van-field
      v-model="linkName"
      name="linkName"
      placeholder="联系人"
      clearable
    />

    <van-divider dashed :style="dividerStyle">联系方式</van-divider>
    <van-field
      v-model="mobile"
      name="mobile"
      placeholder="联系方式"
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
      deleted: "",
      cusCode: "",
      cusName: "",
      linkName: "",
      mobile: ""
    };
  },
  methods: {
    ...mapMutations("appBase/customer", ["queryParam"]),
    onSubmit(val) {
      val.deleted = this.deleted;
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.cusCode = "";
      this.cusName = "";
      this.deleted = "";
      this.linkName = "";
      this.mobile = "";
    }
  }
};
</script>
