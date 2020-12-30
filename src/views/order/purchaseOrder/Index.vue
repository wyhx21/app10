<template>
  <app-page-container>
    <div class="app-top-tobar-search">
      <span class="app-link" @click="toQueryParam">筛选</span>
      <span class="app-link" @click="persistData" v-if="perPersist">新增</span>
    </div>

    <div class="app-data-container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model:loading="listLoading"
          :finished="listFinished"
          :finished-text="finishedText"
          @load="loadList"
        >
          <div
            v-for="data of dataList"
            :key="data['id']"
            class="app-data-item"
            :class="{ 'app-data-item_cur': data['id'] == currentDataId }"
            @click="currentDataId = data['id']"
          >
            <app-row-data :data="data" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </app-page-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
export default {
  components: {
    AppPageContainer,
    AppRowData
  },
  computed: {
    ...mapGetters("page/purchaseOrder", ["dataList", "perPersist"]),
    ...mapGetters("page", ["finishedText"])
  },
  data() {
    return {
      isLoading: true,
      listLoading: true,
      listFinished: false,
      currentDataId: null
    };
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    ...mapActions("page/purchaseOrder", ["queryPage", "addNextPage"]),
    ...mapMutations("page/purchaseOrder", ["queryParam"]),
    onRefresh() {
      this.listLoading = true;
      this.queryPage(true)
        .then(res => {
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
    toQueryParam() {
      this.$router.push("/order/purchaseParam");
    },
    persistData() {
      this.$router.push("/order/purchasePersist");
    }
  }
};
</script>
