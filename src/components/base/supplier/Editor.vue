<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field name="supplierCode" label="供应商编码">
        <template #input>
          <span>{{ data["supplierCode"] }}</span>
        </template>
      </van-field>
      <van-field
        v-model="data['supplierName']"
        name="supplierName"
        label="供应商名称"
      />
      <van-field v-model="data['linkName']" name="linkName" label="联系人" />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group
            style="padding:0"
            v-model="data['sex']"
            direction="horizontal"
          >
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="data['mobile']" name="mobile" label="联系方式" />
      <van-field name="deleted" label="是否有效">
        <template #input>
          <van-switch v-model="data['deleted']" size="20" />
        </template>
      </van-field>
      <van-field
        v-model="data['address']"
        rows="2"
        autosize
        label="地址"
        type="textarea"
        maxlength="100"
        placeholder="地址"
        show-word-limit
      />
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
      <span @click="confirmEditor"
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
    ...mapGetters("page/supplier", ["currentData"])
  },
  data() {
    return {
      data: {},
      loading: false
    };
  },
  watch: {
    currentData: {
      handler(val) {
        this.data = { ...val };
        this.data.deleted = val.deleted == 1;
        this.data.sex = `${val["sex"]}`;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("page/supplier", ["dataMerge"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存修改?" })
          .then(() => {
            this.loading = true;
            this.dataMerge(this.data)
              .then(() => {
                this.$router.replace("/base/supplier");
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
      Confirm({ message: "确认取消修改?" })
        .then(() => {
          this.$router.replace("/base/supplierDetail");
        })
        .catch(() => {});
    }
  }
};
</script>
