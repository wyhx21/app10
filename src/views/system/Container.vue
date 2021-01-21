<template>
  <app-page-container>
    <template #header>
      <van-notice-bar
        left-icon="volume-o"
        v-if="showTurnMsg"
        :text="turnsMsg"
      />
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
    ...mapGetters("userRoleAuth", ["turnsMsg"]),
    showTurnMsg() {
      return this.turnsMsg && this.turnsMsg.length > 0;
    }
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
