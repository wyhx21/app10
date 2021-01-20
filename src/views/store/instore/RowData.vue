<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td rowspan="2">
        <span
          class="app-link"
          @click="gotoEdit()"
          v-if="perPersist && showDetail && data['orderStatus'] == 2"
          >入库</span
        >
        <span
          class="app-link"
          @click="gotoDetail()"
          v-else-if="perDetail && showDetail && data['orderStatus'] == 4"
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
      <td>
        <span>{{ data["lastModifiedBy"] }}</span>
      </td>
      <td colspan="2">
        <span>{{ data["lastModifiedDate"] }}</span>
      </td>
    </tr>
    <tr>
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
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    data: {
      default: {}
    },
    showDetail: {
      default: true
    }
  },
  computed: {
    ...mapGetters("appStore/instore", ["perPersist", "perDetail"])
  },
  methods: {
    ...mapMutations("appStore/instore", ["currentOrderId"]),
    gotoEdit() {
      this.currentOrderId(this.data);
      this.$router.push("/store/instoreEdit");
    },
    gotoDetail() {
      this.currentOrderId(this.data);
      this.$router.push("/store/instoreDetail");
    }
  }
};
</script>
