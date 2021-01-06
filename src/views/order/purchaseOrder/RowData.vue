<template>
  <table class="app-data-item-table">
    <tr>
      <td colspan="2">
        <em>订单号</em>
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td rowspan="2">
        <span
          class="app-link"
          @click="gotoDetail()"
          v-if="showDetail && perDetail"
          >详情</span
        >
      </td>
    </tr>
    <tr>
      <td width="40%">
        <em>供应商编码</em>
        <span>{{ data["supplierCode"] }}</span>
      </td>
      <td width="40%">
        <em>供应商名称</em>
        <span>{{ data["supplierName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>订单金额</em>
        <app-fiance-num :modelValue="data['orderAmount']" disabled />
      </td>
      <td colspan="2">
        <em>创建时间</em>
        <span>{{ data["createdDate"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>额外金额</em>
        <app-fiance-num :modelValue="data['extraAmount']" disabled />
      </td>
      <td colspan="2">
        <em>生效时间</em>
        <span>{{ data["orderTime"] }}</span>
      </td>
    </tr>
    <tr v-if="!showDetail">
      <td colspan="3">
        <em>备注</em>
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>

  <span class="app-data-item_deleted app-data-item_deleted_1">{{
    data["statusValue"]
  }}</span>
</template>

<script>
import AppFianceNum from "@com/common/FianceNum.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    AppFianceNum
  },
  props: {
    data: {
      default: {}
    },
    showDetail: {
      default: true
    }
  },
  computed: {
    ...mapGetters("appOrder/purchaseOrder", ["perDetail"])
  },
  methods: {
    ...mapMutations("appOrder/purchaseOrder", ["currentData"]),
    gotoDetail() {
      if (this.showDetail) {
        this.currentData(this.data);
        this.$router.push("/order/purchaseDetail");
      }
    }
  }
};
</script>
