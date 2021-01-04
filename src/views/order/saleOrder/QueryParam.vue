<template>
  <app-page-container>
    <van-form @submit="onSubmit" class="app-data-detail">
      <van-divider dashed :style="dividerStyle">订单编号</van-divider>
      <van-field
        v-model="params.orderNo"
        name="orderNo"
        placeholder="订单编号"
        clearable
      />

      <van-divider dashed :style="dividerStyle">客户编码</van-divider>
      <van-field
        v-model="params.cusCode"
        name="cusCode"
        placeholder="客户编码"
        clearable
      />

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
      <div class="app-order-param-row">
        <div class="app-order-param-item">
          <app-calendar-range v-model="dataRange" />
        </div>
      </div>

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
    </van-form>
    <template #footer>
      <div class="app-bottom-fixed-button">
        <van-button type="primary" plain @click="resetParam">重置</van-button>
        <van-button type="primary" @click="onSubmit">确认</van-button>
      </div>
    </template>
  </app-page-container>
</template>
<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import { mapGetters, mapMutations } from "vuex";
import AppCalendarRange from "@com/common/CalendarRange.vue";
export default {
  components: {
    AppPageContainer,
    AppFianceNum,
    AppCalendarRange
  },
  computed: {
    ...mapGetters("page", ["dividerStyle"]),
    ...mapGetters("appOrder/saleOrder", {
      orderStatusList: "orderStatusList",
      currentParam: "params"
    })
  },
  watch: {
    currentParam: {
      handler(val) {
        this.dataRange = [val.orderTimeBegin, val.orderTimeEnd];
        this.params = { ...val };
      },
      immediate: true
    }
  },
  data() {
    return {
      dataRange: ["", ""],
      params: {
        orderNo: "",
        cusCode: "",
        orderAmountMax: "",
        orderAmountMin: "",
        orderStatus: ""
      }
    };
  },
  methods: {
    ...mapMutations("appOrder/saleOrder", ["queryParam"]),
    onSubmit() {
      Object.assign(this.params, {
        orderTimeBegin: this.dataRange[0],
        orderTimeEnd: this.dataRange[1]
      });
      this.queryParam(this.params);
      this.$router.push("/order/sale");
    },
    resetParam() {
      this.queryParam();
      this.params = {
        orderNo: "",
        cusCode: "",
        orderAmountMax: "",
        orderAmountMin: "",
        orderStatus: ""
      };
      this.dataRange = ["", ""];
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/order/order.scss";
</style>
