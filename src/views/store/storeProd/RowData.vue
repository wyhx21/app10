<template>
  <table width="100%">
    <tr>
      <td width="30%">
        <span>{{ data["storeCode"] }}</span>
      </td>
      <td width="40%">
        <span>{{ data["storeName"] }}</span>
      </td>
      <td rowspan="2">
        <span class="app-link" @click="gotoDetail()" v-if="showDetail"
          >详情</span
        >
      </td>
    </tr>
    <tr>
      <td>{{ data["areaCode"] }}</td>
      <td>{{ data["areaName"] }}</td>
    </tr>
    <tr>
      <td>{{ data["prodCode"] }}</td>
      <td>{{ data["prodName"] }}</td>
      <td>{{ data["prodNum"] }}({{ data["prodUnit"] }})</td>
    </tr>
  </table>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    data: {
      default: {}
    },
    showDetail: {
      default: true
    }
  },
  methods: {
    ...mapMutations("appStore/storeProd", ["currentData"]),
    gotoDetail() {
      if (this.showDetail) {
        this.currentData(this.data);
        this.$router.push("/store/storeProdDetail");
      }
    }
  }
};
</script>
