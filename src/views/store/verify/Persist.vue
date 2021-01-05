<template>
  <app-page-container>
    <template #header>
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
    </template>

    <div class="app-data-item">
      <div
        v-for="(item, index) of addDetailList"
        :key="index"
        class="app-data-item_detail"
      >
        <app-row-data :data="item" />
      </div>
    </div>
    <div class="app-bottom-fixed-search-button">
      <span @click="addRecord">添加</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./AddRowData.vue";
import { Message } from "@utils/messagerUtil.js"; //Confirm
export default {
  components: {
    AppPageContainer,
    AppRowData
  },
  computed: {
    ...mapGetters("appStore/storeAreaParam", ["storeList", "storeId"]),
    ...mapGetters("appStore/storeVerify", ["typeOptions", "addDetailList"]),
    disabled() {
      return this.addDetailList.length > 0;
    }
  },
  data() {
    return {
      verifyCode: "",
      remark: "",
      detailIndex: 0
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("appStore/storeAreaParam", ["querySysStore", "selectStore"]),
    ...mapActions("appStore/storeVerify", ["initVerifyOptions"]),
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
    }
  }
};
</script>
