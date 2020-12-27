<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field name="areaCode" label="区域编码">
        <template #input>
          <span>{{ data["areaCode"] }}</span>
        </template>
      </van-field>
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
    <div class="app-data-editor">
      <span @click="confirmEditor" v-if="perAreaMerge"
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
    ...mapGetters("page/storeArea", ["perAreaMerge", "currentAreaData"])
  },
  data() {
    return {
      data: {},
      loading: false
    };
  },
  watch: {
    currentAreaData: {
      handler(val) {
        this.data = { ...val };
        this.data.deleted = val.deleted == 1;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("page/storeArea", ["areaMerge"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.areaMerge(this.data)
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
