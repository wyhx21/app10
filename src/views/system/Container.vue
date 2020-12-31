<template>
  <app-page-container>
    <template #header>
      <van-notice-bar
        left-icon="volume-o"
        v-if="showNoticeMsg"
        :text="noticeMsg"
      />
    </template>

    <router-view />
  </app-page-container>
</template>
<script>
import { mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
export default {
  components: {
    AppPageContainer
  },
  computed: {
    showNoticeMsg() {
      return this.noticeMsg && this.noticeMsg.length > 0;
    }
  },
  data() {
    return {
      noticeMsg: "在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    };
  },
  mounted() {
    this.accountInit()
      .then(() => {})
      .catch(() => {});
  },
  methods: {
    ...mapActions("userRoleAuth", ["accountInit"])
  }
};
</script>

<style lang="scss">
@import "@style/component/common/container.scss";
</style>
