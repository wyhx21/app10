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
          v-if="perPersist && showDetail"
          >出库</span
        >
      </td>
    </tr>
    <tr>
      <td width="40%">
        <span>{{ data["cusCode"] }}</span>
      </td>
      <td width="40%">
        <span>{{ data["cusName"] }}</span>
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
    ...mapGetters("page/outstore", ["perPersist"])
  },
  methods: {
    ...mapMutations("page/outstore", ["currentOrderId"]),
    gotoDetail() {
      this.currentOrderId(this.data);
      this.$router.push("/store/outStoreDetail");
    }
  }
};
</script>
