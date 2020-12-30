<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field v-model="data['areaCode']" name="areaCode" label="区域编码" />
      <van-field v-model="data['areaName']" name="areaName" label="区域名称" />
      <van-field name="deleted" label="是否有效">
        <template #input>
          <van-switch v-model="data['deleted']" size="20" />
        </template>
      </van-field>
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
      <span @click="confirmEditor" v-if="perAreaPersist"
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
    ...mapGetters("page/store", ["currentData"]),
    ...mapGetters("page/storeArea", ["perAreaPersist"])
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
    ...mapActions("page/storeArea", ["areaPersist"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.data["storeId"] = this.currentData["id"];
            this.areaPersist(this.data)
              .then(() => {
                this.$router.replace("/store/storeDetail");
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
          this.$router.replace("/store/storeDetail");
        })
        .catch(() => {});
    }
  }
};
</script>
