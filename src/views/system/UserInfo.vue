<template>
  <div
    v-for="item of sysRoleList"
    :key="item['roleId']"
    @click="currentRoleId = item['roleId']"
    :class="[
      currentRoleId == item['roleId'] ? 'app-data-item_cur' : '',
      roleId == item['roleId'] ? 'app-data-item_primary' : '',
      'app-data-item'
    ]"
  >
    <table width="100%">
      <tr>
        <td width="40%">
          <span>{{ item["sysName"] }}</span>
        </td>
        <td width="40%">
          <span>{{ item["roleName"] }}</span>
        </td>
        <td>
          <span
            class="app-link"
            v-if="roleId != item['roleId']"
            @click="changeRole(item)"
            >切换</span
          >
        </td>
      </tr>
    </table>
  </div>

  <div class="app-bottom-fixed-search-button">
    <span @click="exitLogin">退出登录</span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Confirm } from "@utils/messagerUtil.js";
import { toLogin, toMainPage } from "@router/routerHelper.js";
export default {
  computed: {
    ...mapGetters("account", ["userName", "roleId"]),
    ...mapGetters("userRoleAuth", ["sysRoleList", "roleSize"]),
    ...mapGetters("page", ["dividerStyle"])
  },
  data() {
    return {
      currentRoleId: null
    };
  },
  methods: {
    ...mapActions("account", ["logOut"]),
    ...mapActions("userRoleAuth", ["roleChange"]),
    exitLogin() {
      Confirm({ message: "您确定退出登录?" })
        .then(() => {
          this.logOut()
            .then(() => {
              toLogin();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    changeRole(row) {
      Confirm({ message: "您确定切换该角色?" })
        .then(() => {
          this.roleChange(row)
            .then(() => {
              toMainPage();
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
