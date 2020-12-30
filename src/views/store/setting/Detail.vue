<template>
  <app-page-container>
    <div class="app-store-detail">
      <div>
        <span class="app-store-code">{{ currentData["storeCode"] }}</span
        ><span>{{ currentData["storeName"] }}</span>
      </div>
      <div>
        <p class="app-data-item_remark">地址:{{ currentData["address"] }}</p>
      </div>
      <div>
        <p class="app-data-item_remark">备注:{{ currentData["remark"] }}</p>
      </div>
      <span
        class="app-store-enable"
        :class="
          currentData['deleted'] == 1
            ? 'app-store-enable_effect'
            : 'app-store-enable_ineffect'
        "
      >
        {{ currentData["enable"] }}
      </span>
    </div>
    <div class="app-detail-content" v-if="perAreaList">
      <div v-if="areaList.length > 0">
        <div
          v-for="item of areaList"
          :key="item['id']"
          class="app-detail-content_item"
          @click="currentStoreDetailId = item['id']"
          :class="{
            'app-detail-content_item_cur': currentStoreDetailId == item['id']
          }"
        >
          <app-detail-item :data="item" />
        </div>
      </div>
      <div v-else class="app-detail-content_empty">
        暂无数据
      </div>
    </div>
    <div class="app-data-editor">
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
<style lang="scss">
@import "@style/component/store/store.scss";
</style>
