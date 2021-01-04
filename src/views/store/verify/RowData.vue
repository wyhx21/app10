<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td>
        <span
          class="app-link"
          v-if="showDetail && perDetail"
          @click="gotoDetail"
          >详情</span
        >
      </td>
    </tr>
    <tr>
      <td width="40%">
        <span>{{ data["storeCode"] }}</span>
      </td>
      <td width="40%">
        <span>{{ data["storeName"] }}</span>
      </td>
      <td>
        <span>{{ data["verifiValue"] }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>

  <span class="app-data-item_deleted app-data-item_deleted_1">{{
    data["verifiStatusValue"]
  }}</span>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("appStore/storeVerify", ["perDetail"])
  },
  props: {
    data: {
      default: {}
    },
    showDetail: {
      default: true
    }
  },
  methods: {
    ...mapMutations("appStore/storeVerify", ["currentData"]),
    gotoDetail() {
      if (this.showDetail) {
        this.currentData(this.data);
        this.$router.push("/store/verifyDetail");
      }
    }
  }
};
</script>
