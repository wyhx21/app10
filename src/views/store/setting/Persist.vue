<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field
        v-model="data['storeCode']"
        name="storeCode"
        label="仓库编码"
      />
      <van-field
        v-model="data['storeName']"
        name="storeName"
        label="仓库名称"
      />
      <van-field name="deleted" label="是否有效">
        <template #input>
          <van-switch v-model="data['deleted']" size="20" />
        </template>
      </van-field>
      <van-field
        v-model="data['address']"
        rows="2"
        autosize
        label="地址"
        type="textarea"
        maxlength="100"
        placeholder="地址"
        show-word-limit
      />
      <van-field
        v-model="data['remark']"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="备注"
        show-word-limit
      />
    </van-form>
    <div class="app-bottom-fixed-search-button">
      <span @click="confirmEditor" v-if="perPersist"
        ><van-icon name="more-o" v-if="loading" />确认</span
      >
      <span @click="cancelEditor">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AppPageContainer
  },
  computed: {
    ...mapGetters("page/store", ["perPersist"])
  },
  data() {
    return {
      data: {
        id: 0,
        deleted: false
      },
      loading: false
    };
  },
  methods: {
    ...mapActions("page/store", ["dataPersist"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.dataPersist(this.data)
              .then(() => {
                this.$router.replace("/store/setting");
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {});
      }
    },
    cancelEditor() {
      Confirm({ message: "确认取消新增?" })
        .then(() => {
          this.$router.replace("/store/setting");
        })
        .catch(() => {});
    }
  }
};
</script>
