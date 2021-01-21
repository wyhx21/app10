<template>
  <app-page-container>
    <template #header>
      <van-notice-bar left-icon="volume-o" :text="turnsMsg" />
    </template>

    <router-view />
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
export default {
  components: {
    AppPageContainer
  },
  computed: {
    ...mapGetters("userRoleAuth", ["turnsMsg"])
  },
  data() {
    return {};
  },
  mounted() {
    this.accountInit();
  },
  methods: {
    ...mapActions("userRoleAuth", ["accountInit"])
  }
};
</script>

<style lang="scss">
@import "@style/component/common/container.scss";
</style>
