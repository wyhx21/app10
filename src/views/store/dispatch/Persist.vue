<template>
  <app-page-container>
    <div class="app-data-item">
      <table class="app-data-item-table">
        <tr>
          <td width="30%">
            <span>调出仓库</span>
          </td>
          <td>
            <van-dropdown-menu>
              <van-dropdown-item
                :disabled="disabled"
                :model-value="sourceStoreId"
                @update:modelValue="selectSourceStore"
                :options="storeList"
              />
            </van-dropdown-menu>
          </td>
        </tr>
        <tr>
          <td>
            <span>调入仓库</span>
          </td>
          <td>
            <van-dropdown-menu>
              <van-dropdown-item
                :disabled="disabled"
                :model-value="toStoreId"
                @update:modelValue="selectToStore"
                :options="storeList"
              />
            </van-dropdown-menu>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <van-field
              class="app-data-item_remark"
              v-model="remark"
              rows="2"
              autosize
              type="textarea"
              placeholder="备注信息"
            />
          </td>
        </tr>
      </table>
    </div>

    <div class="app-data-item">
      <div
        v-for="(item, index) of addDetailList"
        :key="index"
        :class="[
          'app-data-item_detail',
          { 'app-data-item_cur': currentData == item['rowId'] }
        ]"
        @click="currentData = item['rowId']"
      >
        <app-row-data :data="item" />
      </div>
    </div>

    <div class="app-bottom-fixed-search-button" v-if="perPersist">
      <span @click="addRecord">添加详情</span>
      <span @click="persistRecord">保存</span>
      <span @click="cancelRecord">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./PersistRowData.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Confirm, Message } from "@utils/messagerUtil.js";
export default {
  components: {
    AppPageContainer,
    AppRowData
  },
  computed: {
    ...mapGetters("appStore/storeAreaParam", ["storeList"]),
    ...mapGetters("appStore/storeDispatch", ["addDetailList", "perPersist"]),
    disabled() {
      return this.addDetailList.length > 0;
    }
  },
  data() {
    return {
      sourceStoreId: "",
      toStoreId: "",
      remark: "",

      currentData: null,
      rowId: 0
    };
  },
  beforeMount() {
    this.querySysStore();
    this.cleanAddDetail();
  },
  methods: {
    ...mapActions("appStore/storeAreaParam", [
      "querySysStore",
      "selectStreArea"
    ]),
    ...mapMutations("appStore/storeDispatch", [
      "cleanAddDetail",
      "setSourceAreaOptions",
      "setToAreaOptions",
      "addPersistRowData"
    ]),
    selectSourceStore(storeId) {
      this.selectStreArea({ storeId })
        .then(res => {
          this.setSourceAreaOptions(res);
          this.sourceStoreId = storeId;
        })
        .catch(err => {
          this.setSourceAreaOptions(err);
          this.sourceStoreId = "";
        });
    },
    selectToStore(storeId) {
      this.selectStreArea({ storeId })
        .then(res => {
          this.setToAreaOptions(res);
          this.toStoreId = storeId;
        })
        .catch(err => {
          this.setToAreaOptions(err);
          this.toStoreId = "";
        });
    },
    addRecord() {
      if (!this.sourceStoreId) {
        Message({ message: "请选择调出仓库" });
        return;
      }
      if (!this.toStoreId) {
        Message({ message: "请选择调入仓库" });
        return;
      }
      this.rowId++;
      const rowId = this.rowId;
      this.addPersistRowData({ rowId });
    },
    persistRecord() {},
    cancelRecord() {
      Confirm({ message: "确认离开该页面?" })
        .then(() => {
          this.$router.replace("/store/dispatch");
        })
        .catch(() => {});
    }
  }
};
</script>
