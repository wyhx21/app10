<template>
  <app-page-container>
    <van-form
      @submit="onSubmit"
      class="app-param-form app-data-item app-order-param-container"
    >
      <van-divider dashed :style="dividerStyle">订单编号</van-divider>
      <van-field
        v-model="params.orderNo"
        name="orderNo"
        placeholder="订单编号"
        clearable
      />

      <van-divider dashed :style="dividerStyle">供应商编码</van-divider>
      <van-field
        v-model="params.cusCode"
        name="cusCode"
        placeholder="供应商编码"
        clearable
      />

      <van-divider dashed :style="dividerStyle">订单金额</van-divider>
      <div class="app-order-param-row">
        <div class="app-order-param-item">
          <app-fiance-num
            v-model="params.orderAmountMin"
            placeholder="最小金额"
          />
        </div>
        <div class="app-order-param-item">
          <app-fiance-num
            v-model="params.orderAmountMax"
            placeholder="最大金额"
          />
        </div>
      </div>

      <van-divider dashed :style="dividerStyle">订单状态</van-divider>
      <div class="app-order-param-row">
        <van-dropdown-menu class="app-order-param-item">
          <van-dropdown-item
            v-model="params.orderStatus"
            :options="orderStatusList"
          />
        </van-dropdown-menu>
      </div>

      <van-divider dashed :style="dividerStyle">生效时间</van-divider>
      <div class="app-order-param-row" @click="show.dateSelect = true">
        <div class="app-order-param-item">
          {{ params.orderTimeBegin }}
        </div>
        <div class="app-order-param-item">
          {{ params.orderTimeEnd }}
        </div>
      </div>

      <van-calendar
        v-model:show="show.dateSelect"
        type="range"
        color="#409eff"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dataSelect"
      />

      <div class="app-row-button">
        <van-button type="primary" plain @click="resetParam">重置</van-button>
        <van-button type="primary" @click="onSubmit">确认</van-button>
      </div>
    </van-form>
  </app-page-container>
</template>
<script>
import { DateUtils } from "yao-dateutils";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    AppPageContainer,
    AppFianceNum
  },
  computed: {
    ...mapGetters("page", ["dividerStyle"]),
    ...mapGetters("page/purchaseOrder", {
      orderStatusList: "orderStatusList",
      currentParam: "params"
    }),
    maxDate() {
      return DateUtils.addDay(this.currentDate, 1);
    },
    minDate() {
      return DateUtils.addDay(this.currentDate, -93);
    }
  },
  watch: {
    currentParam: {
      handler(val) {
        this.params = { ...val };
      },
      immediate: true
    }
  },
  data() {
    return {
      params: {
        orderNo: "",
        cusCode: "",
        orderAmountMax: "",
        orderAmountMin: "",
        orderStatus: "",
        orderTimeBegin: "",
        orderTimeEnd: ""
      },
      show: {
        dateSelect: false
      },
      currentDate: new Date()
    };
  },
  methods: {
    ...mapMutations("page/purchaseOrder", ["queryParam"]),
    dataSelect(val) {
      let [begin, end] = [...val];
      this.params.orderTimeBegin = DateUtils.format(begin, "yyyy-MM-dd");
      this.params.orderTimeEnd = DateUtils.format(end, "yyyy-MM-dd");
      this.show.dateSelect = false;
    },
    onSubmit() {
      this.queryParam(this.params);
      this.$router.push("/order/purchase");
    },
    resetParam() {
      this.queryParam();
      this.params = {
        orderNo: "",
        cusCode: "",
        orderAmountMax: "",
        orderAmountMin: "",
        orderStatus: "",
        orderTimeBegin: "",
        orderTimeEnd: ""
      };
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/order/purchaseOrder.scss";
</style>
