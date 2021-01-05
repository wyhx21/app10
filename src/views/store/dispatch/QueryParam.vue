<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">调出仓库</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item v-model="sourceStoreId" :options="allStoreList" />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">调入仓库</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item v-model="toStoreId" :options="allStoreList" />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">订单状态</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item v-model="dispatchStatus" :options="dispatchOptions" />
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
    ...mapGetters("appStore/storeAreaParam", ["allStoreList"]),
    ...mapGetters("appStore/storeDispatch", ["dispatchOptions"]),
    ...mapGetters("page", ["dividerStyle"])
  },
  data() {
    return {
      sourceStoreId: "",
      toStoreId: "",
      dispatchStatus: "",
      orderNo: ""
    };
  },
  beforeMount() {
    this.querySysStore();
  },
  methods: {
    ...mapActions("appStore/storeAreaParam", ["querySysStore"]),
    ...mapMutations("appStore/storeDispatch", ["queryParam"]),
    onSubmit() {
      const param = {
        sourceStoreId: this.sourceStoreId,
        toStoreId: this.toStoreId,
        orderNo: this.orderNo,
        disPacherStatus: this.dispatchStatus
      };
      this.queryParam(param);
      this.$emit("refreshData");
    },
    resetParam() {
      this.sourceStoreId = "";
      this.toStoreId = "";
      this.orderNo = "";
      this.dispatchStatus = "";
      this.queryParam();
    }
  }
};
</script>
