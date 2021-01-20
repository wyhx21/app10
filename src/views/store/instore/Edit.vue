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
        <app-edit-item :data="item" />
      </div>
    </div>

    <div class="app-bottom-fixed-search-button">
      <span @click="confirmInstore">确认</span>
      <span @click="cancelInstore">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppEditItem from "./EditItem.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppEditItem
  },
  computed: {
    ...mapGetters("appStore/instore", [
      "currentData",
      "detailList",
      "storeList"
    ])
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
    ...mapActions("appStore/instore", ["detailInit"]),
    ...mapActions("appStore/instore", ["queryStoreArea", "submitInstore"]),
    selectStore(val) {
      this.queryStoreArea(val);
    },
    confirmInstore() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.submitInstore()
              .then(() => {
                this.$router.replace("/store/inStore");
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {});
      }
    },
    cancelInstore() {
      Confirm({ message: "确认取消保存?" })
        .then(() => {
          this.$router.push("/store/inStore");
        })
        .catch(() => {});
    }
  }
};
</script>
