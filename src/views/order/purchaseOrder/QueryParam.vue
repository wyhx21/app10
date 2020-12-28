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

    <van-divider dashed :style="dividerStyle">订单金额</van-divider>
    <div class="app-order-param-row">
      <div class="app-order-param-item">
        <app-fiance-num v-model="orderAmountMin" placeholder="最小金额" />
      </div>
      <div class="app-order-param-item">
        <app-fiance-num v-model="orderAmountMax" placeholder="最大金额" />
      </div>
    </div>

    <van-divider dashed :style="dividerStyle">订单状态</van-divider>
    <div class="app-order-param-row">
      <van-dropdown-menu>
        <van-dropdown-item v-model="orderStatus" :options="orderStatusList" />
      </van-dropdown-menu>
    </div>

    <van-divider dashed :style="dividerStyle">生效时间</van-divider>
    <div class="app-order-param-row">
      <div class="app-order-param-item" @click="show.beginDate = true">
        {{ orderTimeBegin }}
      </div>
      <div class="app-order-param-item" @click="show.beginDate = true">
        {{ orderTimeEnd }}
      </div>
    </div>

    <div class="app-button">
      <van-button block plain type="primary" @click="resetParam"
        >重置</van-button
      >
      <van-button block type="primary" native-type="submit">提交</van-button>
    </div>

    <van-popup v-model:show="show.beginDate" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="开始时间"
        v-model="orderTimeBegin"
        @confirm="onBeginDateConfirm"
        @cancel="onBeginDateCancel"
      />
    </van-popup>
  </van-form>
</template>
<script>
import AppFianceNum from "@com/common/FianceNum.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    AppFianceNum
  },
  computed: {
    ...mapGetters("page", ["dividerStyle"]),
    ...mapGetters("page/purchaseOrder", ["orderStatusList"])
  },
  data() {
    return {
      orderNo: "",
      cusCode: "",
      orderAmountMax: "",
      orderAmountMin: "",
      orderStatus: "",
      orderTimeBegin: "",
      orderTimeEnd: "",
      show: {
        beginDate: false
      }
    };
  },
  methods: {
    ...mapMutations("page/purchaseOrder", ["queryParam"]),
    onSubmit(val) {
      Object.assign(val, {
        orderAmountMax: this.orderAmountMax,
        orderAmountMin: this.orderAmountMin,
        orderStatus: this.orderStatus,
        orderTimeBegin: this.orderTimeBegin,
        orderTimeEnd: this.orderTimeEnd
      });
      console.log(val);
      this.queryParam(val);
      this.$emit("refreshData");
    },
    resetParam() {
      this.queryParam();
      this.orderNo = "";
      this.cusCode = "";
      this.orderAmountMax = "";
      this.orderAmountMin = "";
      this.orderStatus = "";
      this.orderTimeBegin = "";
      this.orderTimeEnd = "";
    },
    onBeginDateConfirm(val) {
      this.orderTimeBegin = val;
      this.show.beginDate = false;
    },
    onBeginDateCancel() {
      this.orderTimeBegin = "";
      this.show.beginDate = false;
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/order/purchaseOrder.scss";
</style>
