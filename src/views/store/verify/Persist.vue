<template>
  <app-page-container>
    <div class="app-data-item">
      <table width="100%">
        <tr>
          <td width="80px">
            选择仓库
          </td>
          <td>
            <van-dropdown-menu>
              <van-dropdown-item
                :disabled="disabled"
                :model-value="storeId"
                @update:modelValue="selectStore"
                :options="storeList"
              />
            </van-dropdown-menu>
          </td>
        </tr>
        <tr>
          <td>
            选择分类
          </td>
          <td>
            <van-dropdown-menu>
              <van-dropdown-item
                :disabled="disabled"
                v-model="verifyCode"
                :options="typeOptions"
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./PersistRowData.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
export default {
  components: {
    AppPageContainer,
    AppRowData
  },
  computed: {
    ...mapGetters("appStore/storeAreaParam", ["storeList", "storeId"]),
    ...mapGetters("appStore/storeVerify", [
      "typeOptions",
      "addDetailList",
      "perPersist"
    ]),
    disabled() {
      return this.addDetailList.length > 0;
    }
  },
  data() {
    return {
      verifyCode: "",
      remark: "",
      detailIndex: 0,
      currentData: null,
      loading: false
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("appStore/storeAreaParam", ["querySysStore", "selectStore"]),
    ...mapActions("appStore/storeVerify", ["initVerifyOptions", "persistData"]),
    ...mapMutations("appStore/storeVerify", ["clearAddDetail", "addDetail"]),
    initPage() {
      this.initVerifyOptions(false);
      this.querySysStore(true);
      this.clearAddDetail();
    },
    addRecord() {
      this.detailIndex++;
      if (!this.storeId) {
        Message({ message: "请选择仓库信息" });
        return;
      }
      if (!this.verifyCode) {
        Message({ message: "请选择核销分类" });
        return;
      }
      this.addDetail(this.detailIndex);
    },
    persistRecord() {
      if (!this.storeId) {
        Message({ message: "请选择仓库信息" });
        return;
      }
      if (!this.verifyCode) {
        Message({ message: "请选择核销分类" });
        return;
      }
      if (!this.disabled) {
        Message({ message: "请添加详情信息" });
        return;
      }
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
        return;
      }
      Confirm({ message: "确认保存该记录?" })
        .then(() => {
          this.loading = true;
          const storeId = this.storeId;
          const verifyCode = this.verifyCode;
          const remark = this.remark;
          this.persistData({ storeId, verifyCode, remark })
            .then(() => {
              this.$router.replace("/store/verify");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    cancelRecord() {
      Confirm({ message: "确认离开该页面?" })
        .then(() => {
          this.$router.replace("/store/verify");
        })
        .catch(() => {});
    }
  }
};
</script>
