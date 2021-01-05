<template>
  <div class="app-container">
    <slot name="head">
      <div>
        <van-nav-bar left-arrow :title="pageName" @click-left="goPrePage">
          <template #left>
            <van-icon name="arrow-left" size="20" />返回</template
          >
          <template #right> {{ userName }} </template>
        </van-nav-bar>
      </div>
    </slot>

    <slot name="header"></slot>

    <div class="container-main">
      <slot></slot>
    </div>

    <slot name="footer"></slot>

    <div class="container-footer">
      <van-tabbar v-model="activeTab">
        <van-tabbar-item icon="chat-o" @click="goMainPage"
          >主页</van-tabbar-item
        >
        <van-tabbar-item icon="fire-o" to="/container/menu"
          >功能</van-tabbar-item
        >
        <van-tabbar-item icon="friends-o" to="/container/userInfo"
          >角色</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { toMainPage, goBack } from "@router/routerHelper.js";
export default {
  components: {},
  computed: {
    ...mapGetters("account", ["userName"]),
    ...mapGetters("page", ["pageName"])
  },
  data() {
    return {
      activeTab: 0
    };
  },
  methods: {
    goPrePage() {
      goBack();
    },
    goMainPage() {
      toMainPage();
    }
  }
};
</script>

<style lang="scss">
@import "@style/component/common/container.scss";
</style>
