<template>
  <table width="100%">
    <tr>
      <td colspan="2">{{ data["orderNo"] }}</td>
      <td>
        <span class="app-link" @click="gotoDetail()" v-if="showDetail"
          >详情</span
        >
      </td>
    </tr>
    <tr>
      <td width="40%"><span>调出仓库</span></td>
      <td width="30%">
        <span>{{ data["storeCode"] }}</span>
      </td>
      <td>
        <span>{{ data["storeName"] }}</span>
      </td>
    </tr>
    <tr>
      <td><span>调入仓库</span></td>
      <td>
        <span>{{ data["toStoreCode"] }}</span>
      </td>
      <td>
        <span>{{ data["toStoreName"] }}</span>
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
      <td>
        <p class="app-data-item_remark">{{ data["toStoreName"] }}</p>
      </td>
    </tr>
  </table>

  <span class="app-data-item_deleted app-data-item_deleted_1">{{
    data["disPacherStatusValue"]
  }}</span>
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
    ...mapMutations("appStore/storeDispatch", ["currentData"]),
    gotoDetail() {
      if (this.showDetail) {
        this.currentData(this.data);
        this.$router.push("/store/dispatchDetail");
      }
    }
  }
};
</script>
