<template>
  <div>
    <table width="100%">
      <tr>
        <td colspan="2">
          <van-dropdown-menu class="van-dropdown-menu">
            <van-dropdown-item
              v-model="verifiType"
              :options="verifyTypeOptions"
            />
          </van-dropdown-menu>
        </td>
      </tr>
      <tr>
        <td width="50%">
          <van-dropdown-menu class="van-dropdown-menu">
            <van-dropdown-item
              v-model="areaId"
              :options="storeAreaList"
              @change="queryProd"
            />
          </van-dropdown-menu>
        </td>
        <td>
          <van-dropdown-menu class="van-dropdown-menu">
            <van-dropdown-item
              v-model="storeProdId"
              :options="storeOptions"
              @change="selectProd"
            />
          </van-dropdown-menu>
        </td>
      </tr>
      <tr>
        <td>
          <span class="app-data-center">{{ storeNum }}</span>
        </td>
        <td>
          <app-number class="app-data-center" v-model="prodNum" />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <van-field
            class="app-data-item_remark"
            v-model="remark"
            rows="2"
            autosize
            type="textarea"
            placeholder="备注信息"
          />
        </td>
      </tr>
    </table>

    <div
      class="app-data-item_deleted app-data-item_deleted_1"
      @click="removeDetail(data)"
    >
      <van-icon name="cross" size="15" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AppNumber from "@com/common/Number.vue";
export default {
  components: {
    AppNumber
  },
  computed: {
    ...mapGetters("appStore/storeAreaParam", ["storeAreaList"]),
    ...mapGetters("appStore/storeVerify", ["verifyTypeOptions"])
  },
  data() {
    return {
      areaId: null,
      prodNum: "",
      remark: "",
      storeProdId: "",
      verifiType: "",

      prodList: [],
      storeOptions: [],
      storeNum: null
    };
  },
  props: ["data"],
  methods: {
    ...mapMutations("appStore/storeVerify", ["removeDetail"]),
    ...mapActions("appStore/storeVerify", ["queryProdList"]),
    queryProd(val) {
      this.queryProdList(val)
        .then(res => {
          this.storeOptions = res.map(item => {
            const { id, prodName } = item;
            return { value: id, text: prodName };
          });
          this.prodList = res;
          this.storeNum = null;
          this.storeProdId = null;
        })
        .catch(() => {
          this.prodList = [];
          this.storeOptions = [];
          this.storeNum = null;
          this.storeProdId = null;
        });
    },
    selectProd(val) {
      const [rec] = this.prodList.filter(item => item["id"] == val);
      this.storeNum = `${rec["prodNum"]}(${rec["prodUnit"]})`;
    }
  }
};
</script>
