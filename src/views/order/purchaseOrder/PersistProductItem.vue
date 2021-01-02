<template>
  <table width="100%">
    <tr>
      <td width="35%">
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td width="35%">
        <span>{{ data["prodName"] }}</span>
      </td>
      <td>
        <span>{{ data["prodUnit"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <app-fiance-num
          :model-value="data['price']"
          @update:modelValue="updatePrice"
        />
      </td>
      <td>
        <app-number
          :model-value="data['prodNum']"
          @update:modelValue="updateNum"
        />
      </td>
      <td><app-fiance-num :model-value="data['prodAmount']" disabled /></td>
    </tr>
    <tr>
      <td colspan="3">
        <van-field
          class="app-data-item_remark"
          :model-value="data['itemRemark']"
          @update:modelValue="updateRemark"
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
    @click="deleteItem"
  >
    <van-icon name="cross" size="15" />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import AppFianceNum from "@com/common/FianceNum.vue";
import AppNumber from "@com/common/Number.vue";
export default {
  components: {
    AppFianceNum,
    AppNumber
  },
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    ...mapMutations("page/purchaseOrder", [
      "updateProduct",
      "updateProdRemark",
      "deleteProduct"
    ]),
    updatePrice(price) {
      const id = this.data["id"];
      const prodNum = this.data["prodNum"];
      this.updateProduct({ id, price, prodNum });
    },
    updateNum(prodNum) {
      const id = this.data["id"];
      const price = this.data["price"];
      this.updateProduct({ id, price, prodNum });
    },
    updateRemark(itemRemark) {
      const id = this.data["id"];
      this.updateProdRemark({ id, itemRemark });
    },
    deleteItem() {
      this.deleteProduct(this.data);
    }
  }
};
</script>
