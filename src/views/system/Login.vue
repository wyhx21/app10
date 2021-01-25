<template>
  <div class="app-login">
    <div class="app-login-head"></div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userCode"
        name="userCode"
        label="用户名"
        placeholder="用户名"
        :rules="rules.userCode"
      />
      <van-field
        v-model="passWord"
        type="password"
        name="passWord"
        label="密码"
        placeholder="密码"
        :rules="rules.passWord"
      />
      <van-field name="saveData" label="记住密码">
        <template #input>
          <van-checkbox
            :modelValue="saveData"
            @update:modelValue="setSaveData"
            shape="square"
          />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          loading-text="登录中..."
          native-type="submit"
          :loading="loading"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { toMainPage } from "@router/routerHelper.js";
export default {
  computed: {
    ...mapGetters("account", ["saveData", "userInfo"])
  },
  watch: {
    userInfo: {
      handler(val) {
        this.userCode = val?.userCode;
        this.passWord = val?.passWord;
      },
      immediate: true
    }
  },
  data() {
    return {
      userCode: "wyh",
      passWord: "123456",
      loading: false,
      rules: {
        userCode: [
          {
            required: true,
            message: "请填写用户名"
          }
        ],
        passWord: [
          {
            required: true,
            message: "请填写密码"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("account", ["loginSubmit"]),
    ...mapMutations("account", {
      setSaveData: "saveData"
    }),
    onSubmit(values) {
      this.loading = true;
      this.loginSubmit(values)
        .then(() => {
          this.loading = false;
          toMainPage();
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import "@style/component/system/login.scss";
</style>
