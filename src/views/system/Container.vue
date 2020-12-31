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

    <van-action-sheet
      v-model:show="roleShow"
      :actions="sysRoleList"
      cancel-text="取消"
      description="点击切换角色"
      @select="changeRole"
    />
    <van-popup
      v-model:show="userInfoShow"
      position="left"
      round
      :style="{ height: '100%', width: '50%' }"
    >
      <app-user-info />
    </van-popup>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import appUserInfo from "./UserInfo.vue";
import { toMainPage, goBack } from "@router/routerHelper.js";
import { Confirm } from "@utils/messagerUtil.js";
import AppPageContainer from "@com/common/PageContainer.vue";
export default {
  components: {
    appUserInfo,
    AppPageContainer
  },
  computed: {
    ...mapGetters("account", ["userName"]),
    ...mapGetters("userRoleAuth", [
      "roleName",
      "system",
      "roleSize",
      "sysRoleList"
    ]),
    showNoticeMsg() {
      return this.noticeMsg && this.noticeMsg.length > 0;
    }
  },
  data() {
    return {
      roleShow: false,
      userInfoShow: false,
      activeTab: 0,
      noticeMsg: "在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    };
  },
  mounted() {
    this.accountInit()
      .then(() => {})
      .catch(() => {});
  },
  methods: {
    ...mapActions("userRoleAuth", ["accountInit", "roleChange"]),
    showRoleInfo() {
      if (this.roleSize > 1) {
        this.roleShow = true;
      }
    },
    showUserInfo() {
      this.userInfoShow = true;
    },
    changeRole(row) {
      Confirm({ message: "您确定切换该角色?" })
        .then(() => {
          this.roleChange(row)
            .then(() => {
              this.roleShow = false;
            })
            .catch(() => {
              this.roleShow = false;
            });
        })
        .catch(() => {
          this.roleShow = false;
        });
    },
    toHome() {
      toMainPage();
    },
    goPrePage() {
      goBack();
    }
  }
};
</script>

<style lang="scss">
@import "@style/component/common/container.scss";
</style>
