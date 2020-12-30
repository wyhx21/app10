<template>
  <app-page-container>
    <div class="app-data-item">
      <table width="100%">
        <tr>
          <td width="40%">
            <span>{{ currentData["storeCode"] }}</span>
          </td>
          <td>
            <span>{{ currentData["storeName"] }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p class="app-data-item_remark">
              地址:{{ currentData["address"] }}
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p class="app-data-item_remark">备注:{{ currentData["remark"] }}</p>
          </td>
        </tr>
      </table>

      <span
        class="app-data-item_deleted"
        :class="
          currentData['deleted'] == 1
            ? 'app-data-item_deleted_1'
            : 'app-data-item_deleted_0'
        "
      >
        {{ currentData["enable"] }}
      </span>
    </div>
    <div class="app-data-item" v-if="perAreaList">
      <div v-if="areaList.length > 0">
        <div
          v-for="item of areaList"
          :key="item['id']"
          class="app-data-item_detail"
          @click="currentStoreDetailId = item['id']"
          :class="{
            'app-data-item_cur': currentStoreDetailId == item['id']
          }"
        >
          <app-detail-item :data="item" />
        </div>
      </div>
      <div v-else class="app-data-item_placeholder">
        暂无数据
      </div>
    </div>
    <div class="app-bottom-fixed-search-button">
      <span @click="persistArea" v-if="perAreaPersist">新增区域</span>
      <span @click="mergeArea" v-if="perAreaMerge">编辑区域</span>
      <span @click="editorData" v-if="perMerge">编辑仓库</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Message } from "@utils/messagerUtil.js";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppDetailItem from "./DetailItem.vue";
export default {
  components: {
    AppPageContainer,
    AppDetailItem
  },
  computed: {
    ...mapGetters("page/store", ["currentData", "perMerge"]),
    ...mapGetters("page/storeArea", [
      "perAreaList",
      "perAreaPersist",
      "perAreaMerge",
      "areaList"
    ])
  },
  data() {
    return {
      currentStoreDetailId: null
    };
  },
  created() {
    this.areaListQuery();
  },
  methods: {
    ...mapActions("page/storeArea", ["queryAreaList"]),
    ...mapMutations("page/storeArea", ["currentAreaData"]),
    editorData() {
      this.$router.replace("/store/storeEditor");
    },
    persistArea() {
      this.$router.push("/store/storeDetailPersist");
    },
    mergeArea() {
      if (null == this.currentStoreDetailId) {
        Message({ message: "请选择一条区域记录" });
        return;
      }
      const area = this.areaList.filter(
        item => item["id"] == this.currentStoreDetailId
      );
      if (!area || area.length < 1) {
        Message({ message: "请选择一条区域记录" });
        return;
      }
      this.currentAreaData(area[0]);
      this.$router.push("/store/storeDetailEditor");
    },
    areaListQuery() {
      if (this.perAreaList) {
        this.queryAreaList(this.currentData["id"])
          .then(() => {})
          .catch(() => {});
      }
    }
  }
};
</script>
