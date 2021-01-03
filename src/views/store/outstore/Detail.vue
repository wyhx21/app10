<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="storeId"
            :options="storeList"
            @change="selectStore"
          />
        </van-dropdown-menu>
      </div>
    </template>
    <div v-if="detailList" class="app-data-item">
      <div
        class="app-data-item_detail"
        v-for="item of detailList"
        :key="item['id']"
        :class="{
          'app-data-item_cur': currentDetailId == item['id']
        }"
        @click="currentDetailId = item['id']"
      >
        <app-detail-item :data="item" />
      </div>
    </div>

    <div class="app-bottom-fixed-search-button">
      <span @click="confirmOutstore">确认</span>
      <span @click="cancelOutstore">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppDetailItem from "./DetailItem.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppDetailItem
  },
  computed: {
    ...mapGetters("page/outstore", ["currentData", "detailList", "storeList"])
  },
  data() {
    return {
      currentDetailId: null,
      storeId: null,
      loading: false
    };
  },
  beforeMount() {
    this.detailInit();
  },
  methods: {
    ...mapActions("page/outstore", ["detailInit"]),
    ...mapActions("page/outstore", ["queryStoreArea", "submitOutstore"]),
    selectStore(val) {
      this.queryStoreArea(val);
    },
    confirmOutstore() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.submitOutstore()
              .then(() => {
                this.$router.replace("/store/outStore");
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {});
      }
    },
    cancelOutstore() {
      Confirm({ message: "确认取消保存?" })
        .then(() => {
          this.$router.push("/store/outStore");
        })
        .catch(() => {});
    }
  }
};
</script>
