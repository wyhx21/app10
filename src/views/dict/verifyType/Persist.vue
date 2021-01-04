<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field v-model="data['dicKey']" name="dicKey" label="类型编码" />
      <van-field v-model="data['dicValue']" name="dicValue" label="类型名称" />
      <van-field name="dicSort" label="排序" @touchstart.stop="sortShow = true">
        <template #input>
          <div>
            <span>{{ data["dicSort"] }}</span>
            <van-number-keyboard
              v-model="data['dicSort']"
              :show="sortShow"
              :title="`排序:${data['dicSort']}`"
              theme="custom"
              close-button-text="完成"
              @blur="sortShow = false"
            />
          </div>
        </template>
      </van-field>
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
    ...mapGetters("appDict/verifyType", ["perPersist"])
  },
  data() {
    return {
      data: {
        id: 0,
        deleted: false,
        dicSort: "100"
      },
      loading: false,
      sortShow: false
    };
  },
  methods: {
    ...mapActions("appDict/verifyType", ["dataPersist"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.dataPersist(this.data)
              .then(() => {
                this.$router.replace("/dict/verifyType");
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
          this.$router.replace("/dict/verifyType");
        })
        .catch(() => {});
    }
  }
};
</script>
