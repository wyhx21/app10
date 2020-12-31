<template>
  <app-page-container>
    <template #header>
      <div class="app-top-tobar-search">
        <span class="app-link" @click="showQueryInfo">筛选</span>
        <span class="app-link" @click="persistData" v-if="perPersist"
          >新增</span
        >
      </div>
    </template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="listLoading"
        :finished="listFinished"
        :finished-text="finishedText"
        @load="loadList"
      >
        <div
          v-for="prod of productList"
          :key="prod['id']"
          class="app-data-item"
          :class="{ 'app-data-item_cur': prod['id'] == currentDataId }"
          @click="currentDataId = prod['id']"
        >
          <span
            class="app-data-item_deleted"
            :class="
              prod['deleted'] == 1
                ? 'app-data-item_deleted_1'
                : 'app-data-item_deleted_0'
            "
          >
            {{ prod["enable"] }}
          </span>
          <table>
            <tr>
              <td width="30%">
                <span class="app-data-item_primary">{{
                  prod["prodCode"]
                }}</span>
              </td>
              <td width="55%">
                <span class="app-data-item_primary">{{
                  prod["prodName"]
                }}</span>
              </td>
              <td rowspan="2">
                <span class="app-link" @click="gotoDetail(prod)">详情</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{ prod["prodUnit"] }}</span>
              </td>
              <td>
                <span>{{ prod["prodTypeName"] }}</span>
              </td>
            </tr>
          </table>
        </div>
      </van-list>
    </van-pull-refresh>

    <van-popup
      v-model:show="queryInfoShow"
      position="right"
      round
      :style="popupQueryParamStyle"
    >
      <app-query-param @refreshData="onRefresh" />
    </van-popup>
  </app-page-container>
</template>

<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import AppQueryParam from "./QueryParam.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    AppPageContainer,
    AppQueryParam
  },
  computed: {
    ...mapGetters("page/product", ["productList", "perPersist"]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  data() {
    return {
      isLoading: true,
      listLoading: true,
      listFinished: false,
      queryInfoShow: false,
      currentDataId: null
    };
  },
  mounted() {
    this.queryParam();
    this.onRefresh();
    this.queryProdType();
  },
  methods: {
    ...mapActions("page/product", [
      "queryPage",
      "addNextPage",
      "queryProdType"
    ]),
    ...mapMutations("page/product", ["queryParam", "currentProduct"]),
    onRefresh() {
      this.listLoading = true;
      this.queryPage(true)
        .then(res => {
          this.queryInfoShow = false;
          this.listFinished = !res;
          this.isLoading = false;
          this.listLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.listLoading = false;
        });
    },
    loadList() {
      this.addNextPage()
        .then(res => {
          this.listLoading = false;
          this.listFinished = !res;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    showQueryInfo() {
      this.queryInfoShow = true;
    },
    gotoDetail(row) {
      this.currentProduct(row);
      this.$router.push("/base/productDetail");
    },
    persistData() {
      this.$router.push("/base/productPersist");
    }
  }
};
</script>
