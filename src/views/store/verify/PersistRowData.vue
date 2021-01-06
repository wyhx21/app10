<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <van-dropdown-menu class="van-dropdown-menu">
          <van-dropdown-item
            :model-value="data['verifyType']"
            @update:modelValue="verifyTypeSelect"
            :options="verifyTypeOptions"
          />
        </van-dropdown-menu>
      </td>
    </tr>
    <tr>
      <td width="50%">
        <van-dropdown-menu class="van-dropdown-menu">
          <van-dropdown-item
            :model-value="data['areaId']"
            @update:modelValue="queryProd"
            :options="storeAreaList"
          />
        </van-dropdown-menu>
      </td>
      <td>
        <van-dropdown-menu class="van-dropdown-menu">
          <van-dropdown-item
            :model-value="data['storeProdId']"
            @update:modelValue="prodSelect"
            :options="data['prodOptions']"
          />
        </van-dropdown-menu>
      </td>
    </tr>
    <tr>
      <td>
        <span class="app-data-center"
          >{{ data["prodNum"]
          }}{{ data["prodUnit"] ? `(${data["prodUnit"]})` : "" }}</span
        >
      </td>
      <td>
        <app-number
          class="app-data-center"
          :model-value="data['verifyNum']"
          @update:modelValue="verifyNumSelect"
          placeholder="核销数量"
          :suffer="`${data['prodUnit'] ? '(' + data['prodUnit'] + ')' : ''}`"
        />
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <van-field
          class="app-data-item_remark"
          :model-value="data['verifyRemark']"
          @update:modelValue="verifyRemarkSelect"
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
    return {};
  },
  props: ["data"],
  methods: {
    ...mapMutations("appStore/storeVerify", [
      "removeDetail",
      "selectProd",
      "selectVerifyType",
      "selectVerifyNum",
      "selectVerifyRemark"
    ]),
    ...mapActions("appStore/storeVerify", ["queryProdList"]),
    queryProd(areaId) {
      let { rowId } = this.data;
      this.queryProdList({ areaId, rowId });
    },
    prodSelect(storeProdId) {
      let { rowId } = this.data;
      this.selectProd({ rowId, storeProdId });
    },
    verifyTypeSelect(verifyType) {
      let { rowId } = this.data;
      this.selectVerifyType({ rowId, verifyType });
    },
    verifyNumSelect(verifyNum) {
      let { rowId } = this.data;
      this.selectVerifyNum({ rowId, verifyNum });
    },
    verifyRemarkSelect(verifyRemark) {
      let { rowId } = this.data;
      this.selectVerifyRemark({ rowId, verifyRemark });
    }
  }
};
</script>
