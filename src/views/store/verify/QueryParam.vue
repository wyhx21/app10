<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">选择仓库</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item
        :model-value="storeId"
        @update:modelValue="selectStore"
        :options="allStoreList"
      />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">类型</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item v-model="verifiCode" :options="typeOptions" />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">订单状态</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item v-model="verifiStatus" :options="verifyOptions" />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">订单编号</van-divider>
    <van-field
      v-model="orderNo"
      name="orderNo"
      placeholder="订单编号"
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
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("appStore/storeAreaParam", ["allStoreList", "storeId"]),
    ...mapGetters("appStore/storeVerify", ["verifyOptions", "typeOptions"]),
    ...mapGetters("page", ["dividerStyle"])
  },
  data() {
    return {
      orderNo: "",
      verifiStatus: "",
      verifiCode: ""
    };
  },
  beforeMount() {
    this.querySysStore();
    this.initVerifyOptions();
  },
  methods: {
    ...mapActions("appStore/storeAreaParam", ["querySysStore", "selectStore"]),
    ...mapActions("appStore/storeVerify", ["initVerifyOptions"]),
    ...mapMutations("appStore/storeVerify", ["queryParam"]),
    onSubmit() {
      const param = {
        storeId: this.storeId,
        verifiStatus: this.verifiStatus,
        orderNo: this.orderNo,
        verifiCode: this.verifiCode
      };
      this.queryParam(param);
      this.$emit("refreshData");
    },
    resetParam() {
      this.orderNo = "";
      this.verifiStatus = "";
      this.verifiCode = "";
      this.selectStore();
      this.queryParam();
    }
  }
};
</script>
