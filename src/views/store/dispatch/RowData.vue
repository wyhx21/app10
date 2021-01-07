<template>
  <table class="app-data-item-table">
    <tr>
      <td colspan="2">
        <em>订单号</em>
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td>
        <span class="app-link" @click="gotoDetail()" v-if="showDetail"
          >详情</span
        >
      </td>
    </tr>
    <tr>
      <td width="40%"><span>调出仓库</span></td>
      <td width="30%">
        <em>调出仓库编码</em>
        <span>{{ data["storeCode"] }}</span>
      </td>
      <td colspan="2">
        <em>调出仓库名称</em>
        <span>{{ data["storeName"] }}</span>
      </td>
    </tr>
    <tr>
      <td><span>调入仓库</span></td>
      <td>
        <em>调入仓库编码</em>
        <span>{{ data["toStoreCode"] }}</span>
      </td>
      <td>
        <em>调入仓库名称</em>
        <span>{{ data["toStoreName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>更新人</em>
        <span>{{ data["lastModifiedBy"] }}</span>
      </td>
      <td colspan="2">
        <em>更新时间</em>
        <span>{{ data["lastModifiedDate"] }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <em>备注</em>
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
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
