<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td rowspan="2">
        <span class="app-link" @click="gotoDetail()" v-if="perPersist"
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
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapGetters("page/instore", ["perPersist"])
  },
  methods: {
    ...mapMutations("page/instore", ["currentData"]),
    gotoDetail() {
      this.currentData(this.data);
      this.$router.push("/store/inStoreDetail");
    }
  }
};
</script>
