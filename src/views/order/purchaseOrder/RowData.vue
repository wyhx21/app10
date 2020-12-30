<template>
  <table width="100%">
    <tr>
      <td colspan="2">
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
        <span>{{ data["supplierCode"] }}</span>
      </td>
      <td width="40%">
        <span>{{ data["supplierName"] }}</span>
      </td>
    </tr>
    <tr>
      <td><app-fiance-num :modelValue="data['orderAmount']" disabled /></td>
      <td colspan="2">
        <span>{{ data["createdDate"] }}</span>
      </td>
    </tr>
    <tr>
      <td><app-fiance-num :modelValue="data['extraAmount']" disabled /></td>
      <td colspan="2">
        <span>{{ data["orderTime"] }}</span>
      </td>
    </tr>
    <tr v-if="!showDetail">
      <td colspan="3">
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
    ...mapGetters("page/purchaseOrder", ["perDetail"])
  },
  methods: {
    ...mapMutations("page/purchaseOrder", ["currentData"]),
    gotoDetail() {
      if (this.showDetail) {
        this.currentData(this.data);
        this.$router.push("/order/purchaseDetail");
      }
    }
  }
};
</script>
